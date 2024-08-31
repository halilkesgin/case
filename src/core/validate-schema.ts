import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { AppError } from "./middlewares/app-error";
import { HttpStatus } from "./http-status";

export const validateSchema = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const message = error.details.map((detail) => detail.message).join(", ");
            next(new AppError(message, HttpStatus.BAD_REQUEST));
        } else {
            next();
        }
    };
};