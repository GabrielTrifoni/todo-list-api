import { Expose } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column()
    @Expose()
    name: string;

    @Column()
    @Expose()
    status: string;

    @Column()
    @Expose()
    isPriority: string;

    @ManyToOne(() => User, (user) => user.tasks)
    @Expose()
    userId: User;
}