import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { STATUS } from './task.constants';
import { CreatetaskDto } from './dto/createtask.dto';
import { UserEntity } from '../auth/user.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  public createTask = async (
    createTaskDto: CreatetaskDto,
    user: UserEntity,
  ) => {
    const {
      title,
      category,
      timestamp = Date.now().toString(),
    } = createTaskDto;
    const task: TaskEntity = new TaskEntity();
    task.title = title;
    task.category = category;
    task.timestamp = timestamp;
    task.status = STATUS.OPEN;
    task.user = user;
    console.log('pallavi created task ', task);
    await task.save();
    delete task.user;
    return task;
  };

  public getTasks = async (user: UserEntity) => {
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    return query.getMany();
  };
}
