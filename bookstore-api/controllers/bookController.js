import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from '../utils/fileHelpers.js';

const BOOKS_PATH = './data/books.json';

export const getBooks = async (req, res) => {
    const books = await readFile(BOOKS_PATH);
    const { genre, page = 1, limit = 10 } = req.query;

    let filtered = genre ? books.filter(b => b.genre === genre) : books;

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + +limit);
    res.json(paginated);
};

export const getBookById = async (req, res) => {
    const books = await readFile(BOOKS_PATH);
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
};

export const addBook = async (req, res) => {
    const { title, author, genre, publishedYear } = req.body;
    const newBook = {
        id: uuidv4(),
        title,
        author,
        genre,
        publishedYear,
        userId: req.user.id
    };

    const books = await readFile(BOOKS_PATH);
    books.push(newBook);
    await writeFile(BOOKS_PATH, books);

    res.status(201).json(newBook);
};

export const updateBook = async (req, res) => {
    const books = await readFile(BOOKS_PATH);
    const index = books.findIndex(b => b.id === req.params.id);

    if (index === -1 || books[index].userId !== req.user.id)
        return res.status(403).json({ message: 'Not authorized to modify this book' });

    books[index] = { ...books[index], ...req.body };
    await writeFile(BOOKS_PATH, books);

    res.json(books[index]);
};

export const deleteBook = async (req, res) => {
    const books = await readFile(BOOKS_PATH);
    const index = books.findIndex(b => b.id === req.params.id);

    if (index === -1 || books[index].userId !== req.user.id)
        return res.status(403).json({ message: 'Not authorized to delete this book' });

    books.splice(index, 1);
    await writeFile(BOOKS_PATH, books);

    res.json({ message: 'Book deleted' });
};
