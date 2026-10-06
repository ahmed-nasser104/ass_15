import { Server } from "socket.io";
import { tokenService } from "../../common/utils/service/token.service";
import { chatGateway } from "../chat/realtime/realtime";
import { redisService } from "../../common/utils/service/redis.service";

export class GateWay {
  constructor() {}

  async authantiacte(socket: any, next: any) {
    try {
      console.log(socket.handshake.auth.token);
      let { decoded } = tokenService.decoder(socket.handshake.auth.token);
      await redisService.addSocket(decoded.id, socket.id);
      console.log(decoded);
      socket.data = decoded;
      next();
    } catch (error) {
      next(error as Error);
    }
  }
  initial(httpsErver: any) {
    const io = new Server(httpsErver, {
      cors: {
        origin: "*",
      },
    });

    io.use(this.authantiacte);
    io.on("connection", (socket) => {
      let userId = socket.data.id;
      console.log(`socket id -> ${socket.id} , userId -> ${userId}`);
      socket.on("disconnect", () => {
        console.log(`socket id ${socket.id} has been disconnected `);
      });
      chatGateway.register(socket, io);
    });
  }
}

export const gatewat = new GateWay();
