const fs = require('node:fs/promises');
const path = require('node:path');

const booksFilePath = path.join(__dirname, '../data/books.json')

const getAllBooks = async (req, res) => {
    try {
        const data = await fs.readFile(booksFilePath, { encoding: 'utf8' });
        const books = JSON.parse(data);
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading books file' });
    }
}

const getBookById = async (req, res) => {
    const bookId = Number.parseInt(req.params.id);
    try {
        if (!Number(bookId)){
            return res.status(400).json({ error: 'Invalid book ID' });
        }
        const data = await fs.readFile(booksFilePath, { encoding: 'utf8' });
        const books = JSON.parse(data);
        const book = books.find(book => book.id === bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    }   catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading books file' });
    }
}

    module.exports = {getAllBooks, getBookById}