import { Router } from "express";

import asyncHandler from "../../../core/async-handler";
import { validateSchema } from "../../../core/validate-schema";

import { UserController } from "../controllers/user.controller";
import { createUserSchema } from "../schemas/user.schema";

const userController = new UserController();

const router = Router();

router.get("/", asyncHandler(userController.getUsers));
router.get("/:id", asyncHandler(userController.getUserById));
router.post("/", validateSchema(createUserSchema), asyncHandler(userController.createUser));

export default router;