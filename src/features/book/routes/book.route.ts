import { Router } from "express";

import asyncHandler from "../../../core/async-handler";
import { validateSchema } from "../../../core/validate-schema";

import { BookController } from "../controllers/book.controller";
import { createBookSchema } from "../schemas/book.schema";

const bookController = new BookController();

const router = Router();

router.get("/", asyncHandler(bookController.getBooks));
router.get("/:id", asyncHandler(bookController.getBookById));
router.post("/", validateSchema(createBookSchema), asyncHandler(bookController.createBook));

export default router;