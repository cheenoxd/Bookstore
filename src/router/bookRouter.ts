import express, { Router } from 'express';
import { createBook, readBook, updateBook, deleteBook } from '../controllers/bookController';

const bookRouter: Router = express.Router();

bookRouter.post('/books', createBook);
bookRouter.get('/books', readBook);
bookRouter.put('/books/:id', updateBook);
bookRouter.delete('/books/:id', deleteBook);

export { bookRouter };
