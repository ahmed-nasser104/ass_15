"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatGateway = void 0;
const chatEvent_1 = require("./chatEvent");
class ChatGateway {
    constructor() { }
    register(socket, io) {
        chatEvent_1.chatEvent.sayHi(socket, io);
    }
}
exports.chatGateway = new ChatGateway();
