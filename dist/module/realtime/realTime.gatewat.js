"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewat = exports.GateWay = void 0;
const socket_io_1 = require("socket.io");
const token_service_1 = require("../../common/utils/service/token.service");
const realtime_1 = require("../chat/realtime/realtime");
class GateWay {
    constructor() { }
    authantiacte(socket, next) {
        try {
            console.log(socket.handshake.auth.token);
            let { decoded } = token_service_1.tokenService.decoder(socket.handshake.auth.token);
            console.log(decoded);
            socket.data = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    }
    initial(httpsErver) {
        const io = new socket_io_1.Server(httpsErver, {
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
            socket.on("sayHi", (data, callback) => {
                callback("recieved it ok ");
                socket.broadcast.emit("send", "hello broooooooo");
            });
            realtime_1.chatGateway.register(socket, io);
        });
    }
}
exports.GateWay = GateWay;
exports.gatewat = new GateWay();
