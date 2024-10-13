import { Expose } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ unique: true })
    @Expose()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.userId)
    tasks: Task[];
}