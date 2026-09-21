import type { Request, Response, NextFunction } from "express";
import { authors, type Author } from "../models/Author.js";
import { ApiError } from "../utils/ApiError.js";
import { books } from "../models/Book.js";

// GET all authors
export const getAuthors = (req: Request, res: Response) => {
  res.status(200).json(authors);
};

// POST (create) author
export const createAuthor = (req: Request, res: Response) => {
  const { name } = req.body;

  const newAuthor: Author = {
    id: authors.length + 1,
    name,
  };

  authors.push(newAuthor);

  res.status(201).json(newAuthor);
};

// GET author by ID
export const getAuthorById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const author = authors.find((author) => author.id === id);

  if (!author) {
    return next(new ApiError(404, "Author not found"));
  }

  res.status(200).json(author);
};

// PUT (update) author by ID
export const updateAuthor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const { name } = req.body;

  const author = authors.find((author) => author.id === id);

  if (!author) {
    return next(new ApiError(404, "Author not found"));
  }

  author.name = name;

  res.status(200).json(author);
};

// DELETE author by ID
export const deleteAuthor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const authorIndex = authors.findIndex((author) => author.id === id);

  if (authorIndex === -1) {
    return next(new ApiError(404, "Author not found"));
  }

  authors.splice(authorIndex, 1);

  res.status(200).json({
    message: "Author deleted successfully",
  });
};

// GET books by author (GET /authors/:id/books)
export const getBooksByAuthor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  // Check if author exists
  const author = authors.find(
    (author) => author.id === id,
  );

  if (!author) {
    return next(
      new ApiError(404, "Author not found"),
    );
  }

  // Find all books belonging to the author
  const authorBooks = books.filter(
    (book) => book.authorId === id,
  );

  res.status(200).json(authorBooks);
};
