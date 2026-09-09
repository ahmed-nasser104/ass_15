"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.postType = void 0;
const graphql_1 = require("graphql");
const client_type_gql_1 = require("../../client/gql/client.type.gql");
exports.postType = new graphql_1.GraphQLObjectType({
    name: "postType",
    fields: {
        likes: { type: new graphql_1.GraphQLList(client_type_gql_1.userType) },
        userId: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        comments: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        photo: { type: graphql_1.GraphQLString },
    },
});
exports.getPost = new graphql_1.GraphQLObjectType({
    name: "getPostType",
    fields: {
        likes: { type: new graphql_1.GraphQLList(client_type_gql_1.userType) },
        userId: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        comments: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        photo: { type: graphql_1.GraphQLString },
    },
});
