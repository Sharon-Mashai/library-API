import type { Request, Response, NextFunction } from "express";

export const validateBook = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, year, authorId } = req.body;

  const missingFields: string[] = [];

  // Check for missing fields
  if (title === undefined || title === null || title === "") {
    missingFields.push("title");
  }

  if (year === undefined || year === null) {
    missingFields.push("year");
  }

  if (authorId === undefined || authorId === null) {
    missingFields.push("authorId");
  }

  // Return all missing fields
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} ${
        missingFields.length === 1 ? "is" : "are"
      } required`,
    });
  }

  // Validate title type
  if (typeof title !== "string") {
    return res.status(400).json({
      message: "Title must be a string",
    });
  }

  if (title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  // Validate year type
  if (typeof year !== "number") {
    return res.status(400).json({
      message: "Year must be a number",
    });
  }

  // Validate authorId type
  if (typeof authorId !== "number") {
    return res.status(400).json({
      message: "AuthorId must be a number",
    });
  }

  next();
};
