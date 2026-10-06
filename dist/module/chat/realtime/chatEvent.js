"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatEvent = void 0;
class CharEvent {
    constructor() { }
    sayHi(socket, io) {
        return socket.emit("send", "hello from sayHi");
    }
}
exports.chatEvent = new CharEvent();
