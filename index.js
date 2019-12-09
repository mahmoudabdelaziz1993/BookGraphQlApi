require('dotenv').config()
const express =  require('express');
const graphqlHTTP =  require('express-graphql'); 
const app  = express()
const schema = require('./Schema/schema');
const mongoose  = require("mongoose")

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }));

  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true , useUnifiedTopology: true })
  mongoose.connection.once('open' , ()=>console.log("connected to mongo db successfully"))


app.listen(process.env.PORT,()=>console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT}/graphql `))