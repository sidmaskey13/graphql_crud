require('dotenv').config()
const express = require('express')
const schema = require('./Schemas/index')

const { graphqlHTTP } = require('express-graphql')

var cors = require('cors')

const app = express()
const port = process.env.PORT || 4000

const connectDB = require('./db')
connectDB();
app.get('/', (req, res) => {
    res.send('Welcome to GraphQL Learning')
})



app.use('/graphql', graphqlHTTP({
    schema, graphiql: true
}))

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
