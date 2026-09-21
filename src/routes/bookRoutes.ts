import { Router } from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook,} from "../controllers/bookController.js";
import { validateBook } from "../middleware/validateBook.js";

const router = Router();

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", validateBook, createBook);

router.put("/:id", validateBook, updateBook);

router.delete("/:id", deleteBook);

export default router;