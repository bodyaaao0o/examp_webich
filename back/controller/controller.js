const books = require('../data'); 

const createBook = (req, res) => {
    const { title, author, pages, price } = req.body;
    if (title && author && pages && price) {
        const newBook = { id: books.length > 0 ? books[books.length - 1].id + 1 : 1, title, author, pages, price };
        books.push(newBook);
        res.status(201).json(newBook);
    } else {
        res.status(400).json({ error: 'Missing required fields' });
    }
};

const getBooks = (req, res) => {
    res.status(200).json(books);
};

const getBookById = (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

const updateBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const updatedBook = { ...books[bookIndex], ...req.body }; // Оновлення лише наданих полів
        books[bookIndex] = updatedBook;
        res.status(200).json(updatedBook);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

const deleteBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
};
