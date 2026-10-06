import { chatService } from "../chat.service";

class ChatEvent {
  constructor() {}
  sayHi(socket: any, io?: any) {
    return socket.emit("send", "hello from sayHi");
  }

  getChat(socket: any, io: any) {
    socket.on("getChat", async (data: any) => {
      const chat = await chatService.getChat(socket.data.id, data.sendTo);
      socket.emit("chat", chat);
    });
  }

  addChat(socket: any, io: any) {
    socket.on("sendmessage", async (data: any) => {
      const chat = await chatService.addChat(data, socket.data.id);
      io.to(data.sendTo).emit("newmessage", chat);
    });
  }

  createGroup(socket: any, io: any) {
    socket.on("createGroup", async (data: any) => {
      const chat = await chatService.createGroup(data, socket.data.id);
      socket.join(chat.roomId);
      io.to(chat.roomId).emit("groupCreated", chat);
    });
  }

  addGroupMessage(socket: any, io: any) {
    socket.on("sendGroupMessage", async (data: any) => {
      const chat = await chatService.addGroupMessage(data, socket.data.id);
      io.to(data.roomId).emit("newGroupMessage", chat);
    });
  }
}

export const chatEvent = new ChatEvent();
