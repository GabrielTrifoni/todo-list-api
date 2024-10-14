import { TaskStatusEnum } from "src/app/entities/task.entity";

export class UpdateTaskDto {
    name?: string;
    status?: TaskStatusEnum;
    isPriority?: boolean;
}