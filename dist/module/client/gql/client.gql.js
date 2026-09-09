"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userschema = void 0;
const client_type_gql_1 = require("./client.type.gql");
const client_args_gql_1 = require("./client.args.gql");
const user_resolver_gql_1 = require("./user.resolver.gql");
class userGqlSchema {
    constructor() { }
    register() {
        return {
            sayHello: {
                type: client_type_gql_1.userSchemeType,
                args: client_args_gql_1.userArgs,
                resolve: user_resolver_gql_1.userresolver.sayHello,
            },
        };
    }
}
exports.userschema = new userGqlSchema();
