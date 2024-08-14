const path = require('node:path')
const fs = require('node:fs/promises')

const userFilePath = path.join(__dirname, '../data/users.json')

const getAllUsers = async (req, res) => {
    try { 
        const data = await fs.readFile(userFilePath, { encoding: 'utf8' });
        const user = JSON.parse(data);
        res.json(user);
} catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading user file' });
    }}

const getUserById = async(req, res) => {
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
}

module.exports = { getAllUsers , getUserById }