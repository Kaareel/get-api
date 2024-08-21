const path = require('node:path')
const fs = require('node:fs/promises')

const agentsFilePath = path.join(__dirname, '../data/agents.json')

const getAllAgents = async(req, res) => {
    try {
        const data = await fs.readFile(agentsFilePath, { encoding: 'utf8' });
        const agents = JSON.parse(data);
        res.json(agents);
    }   catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error reading agents file' });
        }
    
    }
    
const getAgentById = async (req, res) => {
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
}

const deleteAgentID = async (req, res) => {
    const agentId = Number.parseInt(req.params.id);
    try {
        if (!Number(agentId)) {
            return res.status(400).json({ error: 'Invalid agent ID' })
        }
        const data = await fs.readFile(agentsFilePath, 'utf8')
        const agents = JSON.parse(data)
        const updatedAgents = agents.results.filter(a => a.id!== agentId)
        res.json(updatedAgents)
}
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading agents file' });
    }
}
module.exports = {getAllAgents, getAgentById, deleteAgentID}