"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const client_gql_1 = require("../client/gql/client.gql");
const post_gql_1 = require("../posts/gql/post.gql");
const query = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: { ...client_gql_1.userschema.register(), ...post_gql_1.postSchema.getPosts() },
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "RootMutationType",
    fields: { ...post_gql_1.postSchema.addPost() },
});
exports.schema = new graphql_1.GraphQLSchema({ query, mutation });
