import { Request, Response } from "express";

import { HttpStatus } from "../../../core/http-status";

import { UserService } from "../services/user.service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();

        this.getUsers = this.getUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createUser = this.createUser.bind(this);
    };

    async getUsers(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.status(HttpStatus.OK).json(users);
    };

    async getUserById(req: Request, res: Response) {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserById(userId);
        res.status(HttpStatus.OK).json(user);
    };

    async createUser(req: Request, res: Response) {
        const { name } = req.body;
        const newUser = await this.userService.createUser(name);
        res.status(HttpStatus.CREATED).json(newUser);
    };
};