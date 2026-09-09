"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const graphql_1 = require("graphql");
const post_args_gql_1 = require("./post.args.gql");
const post_type_gql_1 = require("./post.type.gql");
const posts_resolver_gql_1 = require("./posts.resolver.gql");
class PostSchema {
    constructor() { }
    getPosts() {
        return {
            posts: {
                type: new graphql_1.GraphQLList(post_type_gql_1.getPost),
                resolve: posts_resolver_gql_1.postReolver.getPost,
            },
        };
    }
    addPost() {
        return {
            postAdding: {
                type: post_type_gql_1.postType,
                args: post_args_gql_1.postsArguments,
                resolve: posts_resolver_gql_1.postReolver.addingPost,
            },
        };
    }
}
exports.postSchema = new PostSchema();
