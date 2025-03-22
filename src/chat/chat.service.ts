import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async sendMessagetoSave( message: any){
    const community = 'Community';
    try{
      return await this.firebaseService.sendMessageWEb(message,community);
    }catch(error){
       console.error('Error sending the message to the database',error);
       return { success: false, message: 'Error saving chat.' };
    }
   }
  
   async sendMessagetoSave2(userId: string, username: string, message: string){
    try{
      return await this.firebaseService.sendMessage(userId,username, message);
    }catch(error){
       console.error('Error sending the message to the database',error);
       return { success: false, message: 'Error saving chat.' };
    }
   }
  
  }
  