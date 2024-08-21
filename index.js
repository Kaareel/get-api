
const express = require('express')
const { getAllAgents, getAgentById, deleteAgentID} = require('./controllers/agent')
const { getAllUsers , getUserById } = require('./controllers/user')
const { getAllBooks, getBookById } = require('./controllers/book')
const { getAllNote, getNoteById, postNote} = require('./controllers/note')
const { getProductsCategory, getAllProducts, postProducts } = require('./controllers/products')
const { getAllTasks, getTaskCompleted, postTask, putTask, deleteTaskId} = require('./controllers/task')
const fs = require('node:fs/promises');
const path = require('node:path');
const app = express()
const port = 4000
app.use(express.json());

const noteFilePath = path.join(__dirname, './data/notes.json');

app.get('/agents', getAllAgents)
app.get('/agents/:id', getAgentById)

app.get('/books', getAllBooks)
app.get('/books/:id', getBookById)

app.get('/users', getAllUsers);
app.get('/users/:id', getUserById)

app.get('/notes', getAllNote)
app.get('/notes/:id', getNoteById)
app.post('/notes', postNote)

app.get('/products', getAllProducts)
app.get('/products/:category', getProductsCategory)
app.post('/products', postProducts)

app.get('/task/', getAllTasks)
app.get('/tasks?status=completed', getTaskCompleted)
app.post('/task', postTask)
app.put('/task/:id/completed', putTask)
app.delete('/task/:id', deleteTaskId)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
