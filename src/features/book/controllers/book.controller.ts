import { Request, Response } from "express";

import { HttpStatus } from "../../../core/http-status";
import { AppError } from "../../../core/middlewares/app-error";

import { BookService } from "../services/book.service";

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
        this.getBooks = this.getBooks.bind(this);
        this.getBookById = this.getBookById.bind(this);
        this.createBook = this.createBook.bind(this);
    }

    async getBooks(req: Request, res: Response) {
        const books = await this.bookService.getAllBooks();
        const response = books.map(book => ({ id: book.id, name: book.name }));
        res.status(HttpStatus.OK).json(response);
    }

    async getBookById(req: Request, res: Response) {
        const bookId = parseInt(req.params.id, 10);
        const book = await this.bookService.getBookById(bookId);
        if (!book) {
            throw new AppError("Book not found", HttpStatus.NOT_FOUND);
        }
        res.status(HttpStatus.OK).json({
            id: book.id,
            name: book.name,
            score: book.averageScore >= 0 ? book.averageScore.toFixed(2) : -1
        });
    }

    async createBook(req: Request, res: Response) {
        const { name } = req.body;
        const book = await this.bookService.createBook(name);
        res.status(HttpStatus.CREATED).json(book);
    }
};
