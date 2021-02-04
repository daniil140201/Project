const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
const mysql = require('mysql2');
const root = require('./gql/resolvers');
const schema = require('./gql/schema');
const express = require('express');
const app = express();
const sequelize = require('./sequelize/seq').seq



sequelize.sync().then().catch(e=>console.log(e))

app.listen(4000, function () {
    console.log("Сервер ожидает подключения");});

app.use(cors())
app.use('/graphql',
    graphqlHTTP(async (req,res)=> ({
        schema,
        rootValue: root,
        graphiql: true,
        context : {user : req.user}
    })));



