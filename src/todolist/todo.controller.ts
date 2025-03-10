import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
//import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskDto } from './create-task.dto';


@Controller('todo')
export class TodoController {
  
  constructor(private readonly todoService: TodoService) {}

  // @Post('add')
  // async addTask(@Body() createTaskDto: CreateTaskDto) {
  //   return await this.todoService.addTask(createTaskDto);
  // }

  @Post('add')
  async addTask(@Body() body: { title: string,description: string,date :string, isRecurring: boolean} ) {
    const {title, description,date,isRecurring} = body;
   // const addtodo  = this.todoService.addTask(title, description,date,isRecurring)
    // return await this.todoService.addTask(createTaskDto);

    const savedfirebase = this.todoService.savetodolist(title,description,date,isRecurring);
      return savedfirebase;
  }


  @Get('saved')
  async getTasks(@Param('title') title: string) {
    return await this.todoService.getTasks(title);
  }

  // @Put(':id')
  // async markTaskAsDone(@Param('id') id: string,isRecurring) {
  //   // return await this.todoService.markTaskAsDone(id);
  //   return await this.todoService.markTaskAsDone(title,isRecurring);
  // }

  @Put('update/:title')
  async markTaskAsDone(@Param('title') title: string) {
   
    return await this.todoService.markTaskAsDone(title);
  }
  

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.todoService.deleteTask(id);
  }
}
