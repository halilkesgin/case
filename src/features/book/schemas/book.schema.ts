import Joi from "joi";

export const createBookSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
});

export const borrowBookSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    bookId: Joi.number().integer().positive().required(),
});

export const returnBookSchema = Joi.object({
    score: Joi.number().integer().min(1).max(10).required(),
});