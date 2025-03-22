import { Controller, Post, Get, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(
    @Body() body: { userId: string; username: string; message: string },
  ) {
    // return this.chatService.sendMessage(body.userId, body.username, body.message);
    const chat = await this.chatService.sendMessagetoSave2(body.userId, body.username, body.message);
    return chat
  }
}