import type { Request, Response, NextFunction } from "express";
import { books, type Book } from "../models/Book.js";
import { authors } from "../models/Author.js";
import { ApiError } from "../utils/ApiError.js";

// GET all books
export const getBooks = (req: Request, res: Response) => {
  res.status(200).json(books);
};

// POST (create) book
export const createBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, year, authorId } = req.body;

  // Check if the author exists
  const author = authors.find((author) => author.id === authorId);

  if (!author) {
    return next(new ApiError(400, "Invalid authorId"));
  }

  // Check if the book already exists
  const duplicateBook = books.find(
    (book) =>
      book.title.toLowerCase() === title.toLowerCase() &&
      book.authorId === authorId,
  );

  if (duplicateBook) {
    return next(new ApiError(409, "Book already exists"));
  }

  // Generate a new unique ID
  const newId =
    books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;

  const newBook: Book = {
    id: newId,
    title,
    year,
    authorId,
  };

  books.push(newBook);

  res.status(201).json(newBook);
};

// GET book by ID
export const getBookById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const book = books.find((book) => book.id === id);

  if (!book) {
    return next(new ApiError(404, "Book not found"));
  }

  res.status(200).json(book);
};

// PUT (update) book by ID
export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  const { title, year, authorId } = req.body;

  // Check if the book exists
  const book = books.find((book) => book.id === id);

  if (!book) {
    return next(new ApiError(404, "Book not found"));
  }

  // Check if the author exists
  const author = authors.find((author) => author.id === authorId);

  if (!author) {
    return next(new ApiError(400, "Invalid authorId"));
  }

  // Check if another book with the same
  // title and author already exists
  const duplicateBook = books.find(
    (existingBook) =>
      existingBook.id !== id &&
      existingBook.title.toLowerCase() === title.toLowerCase() &&
      existingBook.authorId === authorId,
  );

  if (duplicateBook) {
    return next(new ApiError(409, "Book already exists"));
  }

  // Update the book
  book.title = title;
  book.year = year;
  book.authorId = authorId;

  res.status(200).json(book);
};

// DELETE book by ID
export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return next(new ApiError(404, "Book not found"));
  }

  books.splice(bookIndex, 1);

  res.status(200).json({
    message: "Book deleted successfully",
  });
};
