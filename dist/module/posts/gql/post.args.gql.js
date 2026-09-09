"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsArguments = void 0;
const graphql_1 = require("graphql");
exports.postsArguments = {
    likes: {
        type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
    },
    userId: {
        type: graphql_1.GraphQLID,
    },
    content: { type: graphql_1.GraphQLString },
    comments: {
        type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
    },
    photo: { type: graphql_1.GraphQLString },
};
