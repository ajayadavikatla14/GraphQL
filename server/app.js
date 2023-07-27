const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schema");
const cors = require("cors");

const mongoose = require("mongoose");

//declarations
const PORT = 4000;
const app = express();

//allowing origin access
app.use(cors());

//mongodb connection
mongoose.connect('mongodb+srv://ajay:ajay1234@cluster0.1ybd01j.mongodb.net/graphql');

mongoose.connection.once('open', () => {
    console.log("connected to database");
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});