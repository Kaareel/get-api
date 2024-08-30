const fs = require('node:fs/promises');
const path = require('node:path');

const taskFilePath = path.join(__dirname, '../data/task.json');

const getAllTasks = async (req, res) => {
    try {
        
        const data = await fs.readFile(taskFilePath, 'utf8');
        const tasks = JSON.parse(data);

        const completed = req.query
        if(!completed){
            const isCompleted = completed === "true";
            const filterTask = tasks.filter(task => task.completed === isCompleted);
            return res.json(filterTask);
        }

        return res.json(tasks);    

    } catch (err) {
        console.error(err);
    }
};

const postTask = async (req, res) => {
    try {
        const { text, category, completed = false } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text required fields' });
        }
        if (!category) {
            return res.status(400).json({ error: 'Category required fields' });
        }
        const data = await fs.readFile(taskFilePath, 'utf8');
        const tasks = JSON.parse(data);

        const lastTask = tasks[tasks.length - 1];
        const newId = lastTask ? lastTask.id + 1 : 1;

        const newTask = { id: newId, text: text, category: category, completed: completed };

        tasks.push(newTask);

        await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));

        return res.status(201).json(newTask);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

const putTask = async (req, res) => {
    try {
        const { id } = req.params
        // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: 'Invalid task ID' })
        }
        const data = await fs.readFile(taskFilePath, 'utf8');
        const tasks = JSON.parse(data);

        // biome-ignore lint/style/useNumberNamespace: <explanation>
        const task = tasks.findIndex(t => t.id === parseInt(id, 10));

        if (task === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        tasks[task].completed = true;

        await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));

        return res.status(200).json(tasks[task]);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

const deleteTaskId = async (req, res) => {
    const taskId = Number.parseInt(req.params.id);
    try {
        if (!Number(taskId)) {
            return res.status(400).json({ error: 'Invalid agent ID' })
        }
        const data = await fs.readFile(taskFilePath, 'utf8')
        const tasks = JSON.parse(data)
        const updatedTasks = tasks.filter(t => t.id!== taskId)
        res.json(updatedTasks)
}
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading agents file' });
    }
}
module.exports = { getAllTasks, postTask, putTask, deleteTaskId}