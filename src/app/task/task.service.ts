import { Injectable, NotFoundException } from '@nestjs/common';
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

    async create(input: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();

        task.name = input.name;
        task.status = TaskStatusEnum.Todo,
            task.isPriority = false;
        task.userId = user.id;

        return await this.taskRepository.save(task);
    }

    async update(taskId: number, input: UpdateTaskDto) {
        const task = await this.taskRepository.findOneBy({ id: taskId });

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
}
