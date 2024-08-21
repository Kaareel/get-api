const fs = require('node:fs/promises');
const path = require('node:path');



const noteFilePath = path.join(__dirname, '../data/notes.json');

const getAllNote = async (req, res) => {
    
    try {
        const data = await fs.readFile(noteFilePath, 'utf8');
        const Notes = JSON.parse(data);
        return res.json(Notes);
        
}   catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }}

    const getNoteById = async (req, res) => {
        const noteId = Number(req.params.id);
        try {
            if (!Number(noteId)) {
                return res.status(400).json({ error: 'Invalid note ID' });
            }
        const notes = await fs.readFile(noteFilePath, 'utf8');
        const allNotes = JSON.parse(notes);
        const note = allNotes.find((note) => note.id === noteId);
        return res.json(note)
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }}

    const postNote = async (req, res) => {
        console.log("body: ", req.body)
        try {
            const {body} = req
    
            if (!body || !body.text) {
                return res.status(400).json({ error: 'Note text is required' });
            }
    
            const data = await fs.readFile(noteFilePath, 'utf8');
            const notes = JSON.parse(data);
    
            const lastNote = notes[notes.length - 1];
    
            const newId = lastNote.id + 1;
    
            const newNote = { id: newId, text: body.text };
    
            notes.push(newNote);
    
            await fs.writeFile(noteFilePath, JSON.stringify(notes, null, 2));
            return res.status(201).json(newNote);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    module.exports = { getAllNote, getNoteById, postNote}