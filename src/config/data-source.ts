import { DataSource } from "typeorm";

import { User } from "../features/user/entities/user.entity";

import { DATABASE_URL } from "./env";

export const dataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    entities: [User],
    synchronize: true,
    logging: false,
});