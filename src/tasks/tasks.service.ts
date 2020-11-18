import {Injectable, NotFoundException} from "@nestjs/common";
import {CATEGORY, STATUS} from "./task.constants";
import {CreatetaskDto} from "./dto/createtask.dto";
import {UpdatetaskDto} from "./dto/updatetask.dto";
import {TaskRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {TaskEntity} from "./task.entity";
import {FindConditions} from "typeorm";
import {UserEntity} from "../auth/user.entity";
import {GetUser} from "../auth/getuser.decorater";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }


    public async getTasks(user : UserEntity): Promise<TaskEntity[]> {
        //return await this.taskRepository.find(); //This also works
        return await this.taskRepository.getTasks(user);
    }


    public async getTaskById(id: number, user: UserEntity) : Promise<TaskEntity> {
        const result =  await this.taskRepository.findOne({where: {id, userId: user.id}});
        if(!result) {
            throw new NotFoundException(`Task ${id} not found`);
        }
        return result;
    }

    public async getTasksByCategory(category: CATEGORY, user : UserEntity):  Promise<TaskEntity[]> {
        if(!Object.values(CATEGORY).includes(category)){
            throw new NotFoundException(`Invalid category ${category}`);
        }

        return await this.taskRepository.find({ where: { category: category, userId: user.id } });
    }


    public createTask(createTaskDto : CreatetaskDto,user : UserEntity) : Promise<TaskEntity> {
        return this.taskRepository.createTask(createTaskDto,user);

    }


    public async updateTask(id: number, updateTaskDto : UpdatetaskDto, user: UserEntity) {
        const {title, category, status, timestamp } = updateTaskDto;
        let task;

        try{
          task = await this.getTaskById(id,user);
        }catch (e) {
            throw new NotFoundException(`Task ${id} not found`);
        }

        task.status = status;
        task.title = title;
        task.category = category;
        task.timestamp = timestamp;

        await this.taskRepository.save(task);
    }

    public async deleteTask(id : number, @GetUser() user) {
        const result = await this.taskRepository.delete({id: id, userId: user.id});
        if(!result.affected){
            throw new NotFoundException(`Task not found ${id}`);
        }
    }

}
