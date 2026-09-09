"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userresolver = void 0;
class userResolver {
    constructor() { }
    sayHello(parent, args) {
        const { name, age, email } = args;
        return {
            message: "hello world",
            info: `name:${name} age:${age} email:${email}`,
        };
    }
}
exports.userresolver = new userResolver();
