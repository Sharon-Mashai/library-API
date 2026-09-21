import type { Request, Response, NextFunction } from "express";

export const validateBook = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, year, authorId } = req.body;

  const missingFields: string[] = [];
  const invalidFields: string[] = [];

  // Check missing fields
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

  // Check invalid fields
  if (typeof title !== "string" || title.trim() === "") {
    invalidFields.push("title must be a valid string");
  }

  if (typeof year !== "number") {
    invalidFields.push("year must be a number");
  }

  if (typeof authorId !== "number") {
    invalidFields.push("authorId must be a number");
  }

  // Return all invalid fields
  if (invalidFields.length > 0) {
    return res.status(400).json({
      message: invalidFields.join(", "),
    });
  }

  next();
};
