import type { Request, Response, NextFunction } from "express";
import { books, type Book } from "../models/Book.js";
import { authors } from "../models/Author.js";
import { ApiError } from "../utils/ApiError.js";

// GET all books
// Search, filter, sort, and paginate books
export const getBooks = (req: Request, res: Response) => {
  const { title, year, author, sort, page, limit } = req.query;

  // Create a copy of the books array
  let filteredBooks = [...books];

  // Filter by title
  if (title) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(String(title).toLowerCase()),
    );
  }

  // Filter by year
  if (year) {
    filteredBooks = filteredBooks.filter((book) => book.year === Number(year));
  }

  // Filter by author name
  if (author) {
    const matchingAuthors = authors.filter((authorItem) =>
      authorItem.name.toLowerCase().includes(String(author).toLowerCase()),
    );

    const authorIds = matchingAuthors.map((authorItem) => authorItem.id);

    filteredBooks = filteredBooks.filter((book) =>
      authorIds.includes(book.authorId),
    );
  }

  // Sort by title A-Z
  if (sort === "title") {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Sort by year - oldest to newest
  if (sort === "year") {
    filteredBooks.sort((a, b) => a.year - b.year);
  }

  // Sort by year - newest to oldest
  if (sort === "year-desc") {
    filteredBooks.sort((a, b) => b.year - a.year);
  }

  // Pagination
  if (page && limit) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const startIndex = (pageNumber - 1) * limitNumber;

    const endIndex = startIndex + limitNumber;

    filteredBooks = filteredBooks.slice(startIndex, endIndex);
  }

  res.status(200).json(filteredBooks);
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
