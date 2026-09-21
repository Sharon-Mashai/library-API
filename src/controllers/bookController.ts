import type { Request, Response } from "express";
import { books, type Book } from "../models/Book.js";
import { authors } from "../models/Author.js";

// GET all books
export const getBooks = (req: Request, res: Response) => {
  res.status(200).json(books);
};

// POST(create) a new book
export const createBook = (req: Request, res: Response) => {
  const { title, year, authorId } = req.body;

  // Check if the author exists
  const author = authors.find((author) => author.id === authorId);

  if (!author) {
    return res.status(400).json({
      message: "Invalid authorId",
    });
  }

  // Check if the book already exists
  const duplicateBook = books.find(
    (book) =>
      book.title.toLowerCase() === title.toLowerCase() &&
      book.authorId === authorId,
  );

  if (duplicateBook) {
    return res.status(409).json({
      message: "Book already exists",
    });
  }

  const newBook: Book = {
    id: books.length + 1,
    title,
    year,
    authorId,
  };

  books.push(newBook);

  res.status(201).json(newBook);
};

// GET book by ID
export const getBookById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.status(200).json(book);
};

// PUT (update) book by ID
export const updateBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { title, year, authorId } = req.body;

  // Check if the book exists
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  // Check if the author exists
  const author = authors.find((author) => author.id === authorId);

  if (!author) {
    return res.status(400).json({
      message: "Invalid authorId",
    });
  }

  // Check for duplicate book
  const duplicateBook = books.find(
    (existingBook) =>
      existingBook.id !== id &&
      existingBook.title.toLowerCase() === title.toLowerCase() &&
      existingBook.authorId === authorId,
  );

  if (duplicateBook) {
    return res.status(409).json({
      message: "Book already exists",
    });
  }

  book.title = title;
  book.year = year;
  book.authorId = authorId;

  res.status(200).json(book);
};

// DELETE book by ID
export const deleteBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  books.splice(bookIndex, 1);

  res.status(200).json({
    message: "Book deleted successfully",
  });
};
