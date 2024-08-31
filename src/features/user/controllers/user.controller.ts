import { Request, Response } from "express";

import { AppError } from "../../../core/middlewares/app-error";
import { HttpStatus } from "../../../core/http-status";

import { BookService } from "../../book/services/book.service";

import { UserService } from "../services/user.service";

export class UserController {
    private userService: UserService;
    private bookService: BookService; 

    constructor() {
        this.userService = new UserService();
        this.bookService = new BookService(); 
        this.getUsers = this.getUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.borrowBook = this.borrowBook.bind(this);
        this.returnBook = this.returnBook.bind(this);
    };

    async getUsers(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        const response = users.map(user => ({ id: user.id, name: user.name }));
        res.status(HttpStatus.OK).json(response);
    };

    async getUserById(req: Request, res: Response) {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserById(userId);
        
        if (!user) {
            throw new AppError("User not found", HttpStatus.NOT_FOUND);
        }

        const pastBooks = user.borrowedHistory?.map(book => ({
            name: book.name,
            score: book.averageScore,
        })) || [];

        const presentBooks = user.borrowedBooks?.map(book => ({ name: book.name })) || [];

        res.status(HttpStatus.OK).json({
            id: user.id,
            name: user.name,
            books: { 
                past: pastBooks, 
                present: presentBooks 
            }
        });
    };

    async createUser(req: Request, res: Response) {
        const { name } = req.body;
        const newUser = await this.userService.createUser(name);
        res.status(HttpStatus.CREATED).json(newUser);
    };

    async borrowBook(req: Request, res: Response) {
        const userId = parseInt(req.params.userId, 10);
        const bookId = parseInt(req.params.bookId, 10);
        const message = await this.bookService.borrowBook(userId, bookId);
        res.status(HttpStatus.OK).json({ message })
    };

    async returnBook(req: Request, res: Response) {
        const userId = parseInt(req.params.userId, 10);
        const bookId = parseInt(req.params.bookId, 10);
        const { score } = req.body;
        const message = await this.bookService.returnBook(userId, bookId, score);
        res.status(HttpStatus.OK).json({ message });
    };
};