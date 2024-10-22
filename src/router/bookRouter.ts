import express, { Router } from 'express';
import { createBook, readBook, updateBook, deleteBook } from '../controllers/bookController';

const router: Router = express.Router();

// Define routes
router.post('/books', createBook);
router.get('/books', readBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;
