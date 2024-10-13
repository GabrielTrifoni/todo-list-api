import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatusEnum } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ){}

    async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();

        task.name = createTaskDto.name;
        task.status = TaskStatusEnum.Todo,
        task.isPriority = false;
        task.userId = user.id;

        return await this.taskRepository.save(task);
    }
}
