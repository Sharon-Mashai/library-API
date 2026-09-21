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