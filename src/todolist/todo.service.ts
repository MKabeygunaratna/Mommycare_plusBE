import { Injectable } from '@nestjs/common';
import { Firestore,Timestamp } from '@google-cloud/firestore';
//import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskDto } from './create-task.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class TodoService {
 private firestore = new Firestore();
  private collectionName = 'tasks';
 constructor(private readonly firebaseService: FirebaseService) {}

  // async addTask(createTaskDto: CreateTaskDto) {
  //   const { title, description, date, time, isRecurring } = createTaskDto;
  //   const task = {
  //     title,
  //     description,
  //     date,
  //     time,  
  //     isRecurring,
  //     isCompleted: false,
  //     createdAt: Timestamp.now(),
  //   };
  //   const docRef = await this.firestore.collection(this.collectionName).add(task);
  //   return { id: docRef.id, ...task };
  // }

  // async addTask(title: string,description: string,date :string, isRecurring: boolean ) {
  //   //const { title, description, date, time, isRecurring } = createTaskDto;
  //   const task = {
  //     title,
  //     description,
  //     date,
  //    // time,  
  //     isRecurring,
  //     isCompleted: false,
  //     createdAt: Timestamp.now(),
  //   };
  //   const docRef = await this.firestore.collection(this.collectionName).add(task);
  //   return { id: docRef.id, ...task };
  // }
    
    async savetodolist(title:string,description: string,date: string,isRecurring :boolean){
      
      try{
        return await this.firebaseService.savetodolist(title,description,date,isRecurring);
        
      }catch(error){
        console.error('Error saving quiz result:', error);
        return {success: false,message: 'Error saving todo-list result'};
      }
}

  // async getTasks() {
  //   const snapshot = await this.firestore.collection(this.collectionName).get();
  //   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // }
    
  // Retrieve quiz results for a user
  async getTasks(title: string) {
    try {
      return await this.firebaseService.gettodolist(title);
    } catch (error) {
      console.error('Error retrieving To do list:', error);
      return { success: false, message: 'Error retrieving to do lists.' };
    }
  }


  async markTaskAsDone(id: string) {
    const taskRef = this.firestore.collection(this.collectionName).doc(id);
    await taskRef.update({ isRecurring: true });
    return { message: 'Task marked as completed', id };
  }


  async deleteTask(id: string) {
    const taskRef = this.firestore.collection(this.collectionName).doc(id);
    await taskRef.delete();
    return { message: 'Task deleted successfully', id };
  }

}
