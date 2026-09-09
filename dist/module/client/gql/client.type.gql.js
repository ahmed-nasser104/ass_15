"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = exports.userSchemeType = void 0;
const graphql_1 = require("graphql");
exports.userSchemeType = new graphql_1.GraphQLObjectType({
    name: "helloQuery",
    fields: {
        message: {
            type: graphql_1.GraphQLString,
        },
        info: {
            type: graphql_1.GraphQLString,
        },
    },
});
exports.userType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: {
        _id: {
            type: graphql_1.GraphQLID,
        },
        username: {
            type: graphql_1.GraphQLString,
        },
        email: {
            type: graphql_1.GraphQLString,
        },
    },
});
