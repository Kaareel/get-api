
const express = require('express')
const { getAllAgents, getAgentById, deleteAgentID} = require('./controllers/agent')
const { getAllUsers , getUserById } = require('./controllers/user')
const { getAllBooks, getBookById } = require('./controllers/book')
const { getAllNote, getNoteById, postNote} = require('./controllers/note')
const { getProductsCategory, getAllProducts, postProducts } = require('./controllers/products')
const { getAllTasks, postTask, putTask, deleteTaskId} = require('./controllers/task')
const { getAllComments, postComment, putComment, deleteComment} = require('./controllers/comments')
const { getAllSurveys, postSurveys, putSurvey, deleteSurveys } = require('./controllers/surveys')
const app = express()
const port = 4000
app.use(express.json());



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

app.get('/task', getAllTasks)
app.post('/task', postTask)
app.put('/task/:id', putTask)
app.delete('/task/:id', deleteTaskId)

app.get('/comments/:postId?', getAllComments)
app.post('/comments', postComment)
app.put('/comments/:id', putComment)
app.delete('/comments/:id', deleteComment)

app.get('/surveys', getAllSurveys)
app.post('/surveys', postSurveys)
app.put('/surveys/:id', putSurvey)
app.delete('/surveys/:id', deleteSurveys)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
