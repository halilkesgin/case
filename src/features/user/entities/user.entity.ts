import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Book } from "../../book/entities/book.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Book, (book) => book.borrower)
    borrowedBooks!: Book[];

    @OneToMany(() => Book, (book) => book.borrowedBy)
    borrowedHistory!: Book[];
}

export default User;