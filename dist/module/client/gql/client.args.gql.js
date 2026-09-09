"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userArgs = void 0;
const graphql_1 = require("graphql");
exports.userArgs = {
    name: {
        type: graphql_1.GraphQLString,
    },
    age: {
        type: graphql_1.GraphQLString,
    },
    email: {
        type: graphql_1.GraphQLString,
    },
};
