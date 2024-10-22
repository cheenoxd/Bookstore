import { Schema, model } from 'mongoose';

// Define Book Schema
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
});

// Create and export the Book model
export const Book = model('Book', bookSchema);


