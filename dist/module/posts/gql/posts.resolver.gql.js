"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReolver = void 0;
const posts_service_1 = require("../posts.service");
class PostsResolver {
    constructor() { }
    async addingPost(parent, args, context) {
        console.log(context.req.headers.authorization);
        const addedPost = await posts_service_1.postService.addPost(args);
        return addedPost;
    }
    async getPost() {
        const posts = await posts_service_1.postService.getPost();
        return posts;
    }
}
exports.postReolver = new PostsResolver();
