import { dataSource } from "../../../config/data-source";
import { AppError } from "../../../core/middlewares/app-error";
import { HttpStatus } from "../../../core/http-status";

import { User } from "../../user/entities/user.entity";

import { Book } from "../entities/book.entity";

export class BookService {
    private bookRepository = dataSource.getRepository(Book);
    private userRepository = dataSource.getRepository(User);

    async getAllBooks() {
        return this.bookRepository.find();
    }

    async getBookById(id: number) {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) {
            throw new AppError("Book not found", HttpStatus.NOT_FOUND);
        }
        return book;
    }

    async createBook(name: string) {
        const newBook = this.bookRepository.create({ name });
        return this.bookRepository.save(newBook);
    }

    async borrowBook(userId: number, bookId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const book = await this.bookRepository.findOneBy({ id: bookId });
    
        if (!user) {
            throw new AppError("User not found.", HttpStatus.NOT_FOUND);
        }
        
        if (!book) {
            throw new AppError("Book not found.", HttpStatus.NOT_FOUND);
        }
    
        if (book.borrower) {
            throw new AppError("Book is already borrowed.", HttpStatus.BAD_REQUEST);
        }
    
        book.borrower = user;
        book.borrowedBy = user; 
        await this.bookRepository.save(book);
        
        return `Book ${book.id} borrowed by User ${user.id}`;

    }

    async returnBook(userId: number, bookId: number, score: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const book = await this.bookRepository.findOne({
            where: { id: bookId },
            relations: ["borrower"], 
        });
    
        if (!user) {
            throw new AppError("User not found.", HttpStatus.NOT_FOUND);
        }
    
        if (!book) {
            throw new AppError("Book not found.", HttpStatus.NOT_FOUND);
        }
    
        if (!book.borrower || book.borrower.id !== userId) {
            throw new AppError("Cannot return the book.", HttpStatus.BAD_REQUEST);
        }
    
        book.borrower = null;
        book.averageScore = (book.averageScore + score) / 2;
        await this.bookRepository.save(book);
    
        return `Book ${book.id} returned by User ${user.id} with score ${score}`;
    }
}
