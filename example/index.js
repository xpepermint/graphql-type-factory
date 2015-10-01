var express = require('express');
var graphQLHTTP = require('express-graphql');
var schema = require('./schema');

var app = express();
app.use(graphQLHTTP({schema, pretty: true}));
app.listen(4444);
