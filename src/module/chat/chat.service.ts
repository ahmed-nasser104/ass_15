import { ChatType } from "../../common/enums/chat.enum";
import { IChat, Imessage } from "../../common/interfaces/chat.interface";
import { badRequest } from "../../common/middleware/response/error.response";
import { DatabaseRepostaory } from "../../common/reposatory/database.reposatory";
import { chatModel, messageModel } from "../../database/models/chat.model";
import { randomUUID } from "crypto";

export class ChatService {
  private chatReposatory: DatabaseRepostaory<IChat>;
  private messageReposatory: DatabaseRepostaory<Imessage>;

  constructor() {
    this.chatReposatory = new DatabaseRepostaory<IChat>(chatModel);
    this.messageReposatory = new DatabaseRepostaory<Imessage>(messageModel);
  }

  async getChat(userId: string, sendTo: string) {
    const chat = await this.chatReposatory.findOne({
      item: {
        participants: {
          $all: [userId, sendTo],
        },
      },
    });

    return chat;
  }

  async addChat(data: any, userId: string) {
    const { content, sendTo } = data;
    const message = await this.messageReposatory.create({
      content,
      createdBy: userId,
    });
    const chat = await this.getChat(userId, sendTo);
    if (!chat) {
      const newChat = await this.chatReposatory.create({
        participants: [sendTo, userId],
        createdBy: userId,
        type: ChatType.ovo,
        message: [message._id],
      });

      return newChat;
    }
    await this.chatReposatory.updateOne({
      filter: {
        participants: {
          $all: [userId, sendTo],
        },
      },
      data: {
        $push: {
          message: message._id,
        },
      },
    });

    return await this.getChat(userId, sendTo);
  }

  async createGroup(data: any, userId: string) {
    const { content, sendTo } = data;
    const message = await this.messageReposatory.create({
      content,
      createdBy: userId,
    });
    const users = [...sendTo, userId];
    const roomId = randomUUID();
    const newChat = await this.chatReposatory.create({
      participants: users,
      createdBy: userId,
      type: ChatType.ovm,
      message: [message._id],
      roomId,
    });

    return newChat;
  }

  async addGroupMessage(data: any, userId: string) {
    const { content, roomId } = data;
    const message = await this.messageReposatory.create({
      content,
      createdBy: userId,
    });

    const chat = await this.chatReposatory.findOne({
      item: {
        roomId,
        type: ChatType.ovm,
      },
    });

    if (!chat) {
      throw new badRequest("Group chat not found");
    }

    await this.chatReposatory.updateOne({
      filter: {
        roomId,
      },
      data: {
        $push: {
          message: message._id,
        },
      },
    });

    return await this.chatReposatory.findOne({
      item: {
        roomId,
      },
    });
  }
}

export const chatService = new ChatService();
