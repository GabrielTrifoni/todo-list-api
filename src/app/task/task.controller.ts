import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuardJwt } from '../auth/auth-guard.jwt';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../entities/task.entity';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) { }

    @Get()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@CurrentUser() user: User) {
        return await this.taskService.findAll(user);
    }

    @Get(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findOneTask(@Param('id', ParseIntPipe) taskId: number, @CurrentUser() user: User) {
        return await this.taskService.findOneTask(taskId, user);
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() input: CreateTaskDto, @CurrentUser() user: User): Promise<Task> {
        return await this.taskService.create(input, user);
    }

    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Param(':id') taskId: number, @Body() input: UpdateTaskDto, @CurrentUser() user: User): Promise<Task> {
        return await this.taskService.update(taskId, input, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    @HttpCode(204)
    async delete(@Param(':id') taskId: number, @CurrentUser() user: User) {
        await this.taskService.delete(taskId, user);
    }
}
