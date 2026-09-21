import type { Request, Response,} from "express";
import { books, type Book,} from "../models/Book.js";
import { authors } from "../models/Author.js";

// GET books
export const getBooks = (
  req: Request,
  res: Response,
) => {
  res.status(200).json(books);
};

// POST books
export const createBook = (
  req: Request,
  res: Response,
) => {
  const { title, year, authorId } = req.body;

  // Check if the author exists
  const author = authors.find(
    (author) => author.id === authorId,
  );

  if (!author) {
    return res.status(400).json({
      message: "Invalid authorId",
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

// GET books by id
export const getBookById = (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  const book = books.find(
    (book) => book.id === id,
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.status(200).json(book);
};

// PUT(Update) books by id
export const updateBook = (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  const { title, year, authorId } = req.body;

  const book = books.find(
    (book) => book.id === id,
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  // Check if the new author exists
  const author = authors.find(
    (author) => author.id === authorId,
  );

  if (!author) {
    return res.status(400).json({
      message: "Invalid authorId",
    });
  }

  book.title = title;
  book.year = year;
  book.authorId = authorId;

  res.status(200).json(book);
};

// DELETE books by id
export const deleteBook = (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  const bookIndex = books.findIndex(
    (book) => book.id === id,
  );

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