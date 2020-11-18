import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreatetaskDto } from './dto/createtask.dto';
import { UpdatetaskDto } from './dto/updatetask.dto';
import { TaskEntity } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/getuser.decorater';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  public getAllTasks(@GetUser() user): Promise<TaskEntity[]> {
    return this.service.getTasks(user);
  }

  @Get(':id')
  public getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user,
  ): Promise<TaskEntity> {
    return this.service.getTaskById(id, user);
  }

  @UsePipes(ValidationPipe)
  @Post()
  public createTask(
    @Body() createTaskDto: CreatetaskDto,
    @GetUser() user,
  ): Promise<TaskEntity> {
    return this.service.createTask(createTaskDto, user);
  }

  /** /tasks/{category} **/
  @Get('/category/:category')
  public getTasksByCategory(
    @Param('category') category,
    @GetUser() user,
  ): Promise<TaskEntity[]> {
    return this.service.getTasksByCategory(category, user);
  }

  /** /tasks/{id} **/
  @Delete(':id')
  public deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user,
  ): Promise<void> {
    console.log('Tudu delete task ', id);
    return this.service.deleteTask(id, user);
  }
  /** /tasks/{id} **/
  @Post(':id')
  @UsePipes(ValidationPipe)
  public updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdatetaskDto,
    @GetUser() user,
  ) {
    return this.service.updateTask(id, updateTaskDto, user);
  }
}
