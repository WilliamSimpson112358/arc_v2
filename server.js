const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');
const graphqlSchema = importSchema('./graphql_schemas/schema.graphql');

const app = express();

const authConfig = {
  domain: 'dev-5u20rzno.auth0.com',
  audience: 'https://api.arc.com'
};

// builds the schema from schema.graphql file

var builtSchema = buildSchema(graphqlSchema);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  info: () => {
    return 'Test the info';
  }
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256']
});

app.use(
  '/api/graphql',
  checkJwt,
  graphqlHTTP({
    schema: builtSchema,
    rootValue: root,
    graphiql: true
  }),
  (req, res) => {
    res.send({
      msg: 'Your Access Token was successfully validated!'
    });
  }
);

app.listen(4000, () => console.log('Server listening on 4000'));
