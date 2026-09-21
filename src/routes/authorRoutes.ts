import { Router } from "express";
import { createAuthor, deleteAuthor, getAuthorById, getAuthors, getBooksByAuthor, updateAuthor,} from "../controllers/authorController.js";

const router = Router();

router.get("/", getAuthors);

router.get("/:id/books", getBooksByAuthor);

router.get("/:id", getAuthorById);

router.post("/", createAuthor);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

export default router;
