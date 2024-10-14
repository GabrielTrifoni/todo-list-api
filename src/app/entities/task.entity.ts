import { Expose } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum TaskStatusEnum {
    Todo = 1,
    InProgress,
    Complete
}

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
    status: TaskStatusEnum;

    @Column()
    @Expose()
    isPriority: boolean;

    @ManyToOne(() => User, (user) => user.tasks)
    @Expose()
    user: User;
}