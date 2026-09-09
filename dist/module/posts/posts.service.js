"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const error_response_1 = require("../../common/middleware/response/error.response");
const validation_1 = require("../../common/middleware/validation/validation");
const database_reposatory_1 = require("../../common/reposatory/database.reposatory");
const posts_model_1 = require("../../database/models/posts.model");
const post_validation_1 = require("./post.validation");
class PostService {
    postsService;
    constructor() {
        this.postsService = new database_reposatory_1.DatabaseRepostaory(posts_model_1.postsModel);
    }
    addPost(data) {
        const { likes, userId, content, comments, photo } = data;
        (0, validation_1.GrapgQLValidation)(post_validation_1.postValidation, data);
        const addedPost = this.postsService.create({
            likes,
            userId,
            content,
            comments,
            photo,
        });
        return addedPost;
    }
    async getPost() {
        const post = await this.postsService.findAll({});
        console.log(post);
        if (post) {
            return post;
        }
        throw (0, error_response_1.GraphqlErrorHandler)(new error_response_1.notFound("no post found"));
    }
}
exports.postService = new PostService();
