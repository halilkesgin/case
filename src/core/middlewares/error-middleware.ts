import { Request, Response, NextFunction } from "express";

import { HttpStatus } from "../http-status";

import { AppError } from "./app-error";

export const ErrorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "Invalid JSON format. Please check your request body." });
    } else if (error instanceof AppError) {
        const status = error.status || HttpStatus.SERVER_ERROR;
        const message = error.message || "Server Error";
        res.status(status).json({ error: message });
    } else {
        console.error("Unexpected error:", error);
        res.status(HttpStatus.SERVER_ERROR).json({ error: "Server Error" });
    }
};
