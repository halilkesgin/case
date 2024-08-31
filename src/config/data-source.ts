import { DataSource } from "typeorm";

import { User } from "../features/user/entities/user.entity"; 
import { Book } from "../features/book/entities/book.entity"; 

import { DATABASE_URL } from "./env";

export const dataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Book], 
});