import { Request, Response } from 'express';
import { Book } from '../db/book';


export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, isbn, price, stock } = req.body;

        // Check if the book already exists
        let book = await Book.findOne({ isbn });

        if (book) {
            return res.status(200).json({
                message: 'Book already exists',
                book,
            });
        }

        // Create and save new book
        const newBook = new Book({ title, author, isbn, price, stock });
        const savedBook = await newBook.save();

        res.status(201).json({ message: 'Book created successfully', savedBook });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Failed to create book' });
    }
};



//reading a book
export const readBook = async (req: Request, res: Response) => {
    try {
        const { title, author, price, stock} = req.body;

        const query: any = {};
        if (title) query.title = title;
        if (author) query.author = author;
        if (price) query.price = price;
        if (stock) query.stock = stock;

        const books = await Book.find(query);
        res.status(200).json(books)
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
      }
};
//update book
export const updateBook = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Failed to update book' });
    }
  };

  //delete book
  export const deleteBook = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'Failed to delete book' });
    }
  };