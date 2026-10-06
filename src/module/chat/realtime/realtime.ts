import { chatEvent } from "./chatEvent";

class ChatGateway {
  constructor() {}

  register(socket: any, io: any) {
    chatEvent.sayHi(socket, io);
    chatEvent.addChat(socket, io);
    chatEvent.createGroup(socket, io);
    chatEvent.addGroupMessage(socket, io);
    chatEvent.getChat(socket, io);
  }
}

export const chatGateway = new ChatGateway();
