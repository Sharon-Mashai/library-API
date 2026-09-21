import type { Request, Response, NextFunction,} from "express";

export const validateBook = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, year, authorId } = req.body;

  if (!title || year === undefined || authorId === undefined) {
    return res.status(400).json({
      message: "Title, year, and authorId are required",
    });
  }

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title must be a valid string",
    });
  }

  if (typeof year !== "number") {
    return res.status(400).json({
      message: "Year must be a number",
    });
  }

  if (typeof authorId !== "number") {
    return res.status(400).json({
      message: "authorId must be a number",
    });
  }

  next();
};