require('dotenv').config()
const express =  require('express');
const graphqlHTTP =  require('express-graphql'); 
const app  = express()
const schema = require('./Schema/schema');
// var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }));


app.listen(process.env.PORT,()=>console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT}/graphql `))