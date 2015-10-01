var gt = require('graphql/type');
var gtf = require('..');

var users = []; // this will be our database

var GraphQLNameType = gtf.GraphQLStringFactory({name: 'Name', min: 1, max: 250}); // how can we create a custom string type

var UserType = new gt.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: gt.GraphQLInt},
    name: {type: GraphQLNameType},
    email: {type: gtf.GraphQLEmailType},
    website: {type: gtf.GraphQLURLType}
  }
});

var RootQueryType = new gt.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: {
      type: new gt.GraphQLList(UserType),
      resolve() {
        return users;
      }
    }
  }
});

var RootMutationType = new gt.GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        id: {type: gt.GraphQLString},
        name: {type: GraphQLNameType},
        email: {type: gtf.GraphQLEmailType},
        website: {type: gtf.GraphQLURLType}
      },
      resolve: (root, args) => {
        var user = {id: args.id, name: args.name, email: args.email, website: args.website};
        users.push(user);
        return user;
      }
    }
  }
})
var schema = new gt.GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = schema;
