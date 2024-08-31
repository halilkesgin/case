import { HttpStatus } from "../http-status";

export class AppError extends Error {
    status: number;
    error: string;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.error = message;
    }
}

export class ErrorExt extends AppError {
    constructor(message: string, status?: HttpStatus) {
        super(message, status ?? HttpStatus.SERVER_ERROR);
    }
}
