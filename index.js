
const express = require('express')
const { getAllAgents, getAgentById} = require('./controllers/agent')
const { getAllUsers , getUserById } = require('./controllers/user')
const { getAllBooks, getBookById } = require('./controllers/book')
const app = express()
const port = 4000

app.get('/agents', getAllAgents)
app.get('/agents/:id', getAgentById)

app.get('/books', getAllBooks)
app.get('/books/:id', getBookById)

app.get('/users', getAllUsers);
app.get('/users/:id', getUserById)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
