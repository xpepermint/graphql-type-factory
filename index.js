var GraphQLScalarType = require('graphql').GraphQLScalarType;
var GraphQLError = require('graphql/error').GraphQLError;
var Kind = require('graphql/language').Kind;

var GraphQLStringFactory = function(attrs) {
  return new GraphQLScalarType({
    name: attrs.name,
    description: attrs.description,
    serialize: function(value) {
      return value;
    },
    parseValue: function(value) {
      return value;
    },
    parseLiteral: function(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError('Expecting "' + attrs.name + '" to be string value.', [ast]);
      }
      if (ast.value.length <= attrs.min) {
        throw new GraphQLError('Minimum length for "' + attrs.name + '" is ' + attrs.min + '.', [ast]);
      }
      if (ast.value.length >= attrs.max){
        throw new GraphQLError('Maximum length for "' + attrs.name + '" is ' + attrs.max + '.', [ast]);
      }
      if(attrs.regex && !attrs.regex.test(ast.value)) {
        throw new GraphQLError('"' + attrs.name + '" is invalid.', [ast]);
      }
      if(attrs.fn && !attrs.fn(ast)) {
        throw new GraphQLError('"' + attrs.name + '" is invalid.', [ast]);
      }
      return ast.value;
    }
  });
};

var GraphQLEmailType = GraphQLStringFactory({
  name: 'Email',
  min: 4,
  max: 254,
  regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  fn: function(ast) {return true}
});

var GraphQLURLType = GraphQLStringFactory({
  name: 'URL',
  max: 2083,
  regex: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
});

module.exports = {
  GraphQLStringFactory: GraphQLStringFactory,
  GraphQLEmailType: GraphQLEmailType,
  GraphQLURLType: GraphQLURLType
};
