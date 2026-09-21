import type { Request, Response,} from "express";
import { authors, type Author } from "../models/Author.js";

// GET /authors
export const getAuthors = (
  req: Request,
  res: Response,
) => { res.status(200).json(authors)};

// POST /authors
export const createAuthor = (
  req: Request,
  res: Response,) => {const { name } = req.body;

  const newAuthor: Author = {
    id: authors.length + 1,
    name,
  };

  authors.push(newAuthor);

  res.status(201).json(newAuthor);
};

// GET /authors/:id
export const getAuthorById = (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  const author = authors.find(
    (author) => author.id === id,
  );

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  res.status(200).json(author);
};

// PUT /authors/:id
export const updateAuthor = (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const author = authors.find(
    (author) => author.id === id,
  );

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  author.name = name;

  res.status(200).json(author);
};