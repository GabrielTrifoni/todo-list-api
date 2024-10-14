import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatusEnum } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async findAll(currentUser: User) {
        return await this.taskRepository.find({ where: { user: currentUser } });

    }

    async findOneTask(taskId: number, currentUser: User) {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['user'],
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (currentUser.id !== task.user.id) {
            throw new UnauthorizedException("Unauthorized Exception");
        }

        return task;
    }


    async create(input: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();

        task.name = input.name;
        task.status = TaskStatusEnum.Todo;
        task.isPriority = false;
        task.user = user;

        return await this.taskRepository.save(task);
    }

    async update(taskId: number, input: UpdateTaskDto, currentUser: User) {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['user'],
        });

        if (currentUser.id !== task.user.id) {
            throw new UnauthorizedException("Unauthorized Exception");
        }

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (input.name !== undefined) {
            task.name = input.name;
        }
        if (input.status !== undefined) {
            task.status = input.status;
        }
        if (input.isPriority !== undefined) {
            task.isPriority = input.isPriority;
        }

        return await this.taskRepository.save(task);
    }

    async delete(taskId: number, currentUser: User) {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['user'],
        });

        if (currentUser.id !== task.user.id) {
            throw new UnauthorizedException("Unauthorized Exception");
        }

        return await this.taskRepository.delete(task);
    }
}
