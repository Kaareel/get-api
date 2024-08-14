
const express = require('express')
const fs = require('node:fs/promises')
const path = require('node:path')
const app = express()
const port = 4000

const agentsFilePath = path.join(__dirname, 'agents.json')
const booksFilePath = path.join(__dirname, 'books.json')
const userFilePath = path.join(__dirname, 'users.json')

app.get('/agents', async(req, res) => {
try {
    const data = await fs.readFile(agentsFilePath, { encoding: 'utf8' });
    const agents = JSON.parse(data);
    res.json(agents);
}   catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading agents file' });
    }

})
app.get('/agents/:id', async (req, res) => {
    const agentId = Number.parseInt(req.params.id);
    try {
        if (!Number(agentId)) {
            return res.status(400).json({ error: 'Invalid agent ID' })
        }
        const data = await fs.readFile(agentsFilePath, 'utf8')
        const agents = JSON.parse(data)
        const agent = agents.results.find(a => a.id === agentId)

        if (!agent) {
            return res.status(404).json({ error: 'Agent not found' })
        }
        res.json(agent)
    }   catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading agents file' });
    }
})

app.get('/books', async (req, res) => {
    try {
        const data = await fs.readFile(booksFilePath, { encoding: 'utf8' });
        const books = JSON.parse(data);
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading books file' });
    }
})
app.get('/users', async (req, res) => {
    try { 
        const data = await fs.readFile(userFilePath, { encoding: 'utf8' });
        const user = JSON.parse(data);
        res.json(user);
} catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading user file' });
    }});
app.get('/users/:id', async(req, res) => {
    const userId = Number.parseInt(req.params.id)
    try {
        if (!Number(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' })
        }
        const data = await fs.readFile(userFilePath, 'utf8')
        const user = JSON.parse(data)
        const foundUser = user.find(u => u.id === userId)
        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(foundUser)
    }   catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading user file' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
