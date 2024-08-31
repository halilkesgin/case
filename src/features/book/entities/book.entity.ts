import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";

import { User } from "../../user/entities/user.entity";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "float", default: -1 })
    averageScore!: number;

    @ManyToOne(() => User, (user) => user.borrowedBooks)
    borrower!: User | null;

    @ManyToOne(() => User, (user) => user.borrowedHistory)
    borrowedBy!: User | null;
}
