import { Posts } from "../../common/interfaces/posts.interface";
import {
  GraphqlErrorHandler,
  notFound,
} from "../../common/middleware/response/error.response";
import { GrapgQLValidation } from "../../common/middleware/validation/validation";
import { DatabaseRepostaory } from "../../common/reposatory/database.reposatory";
import { postsModel } from "../../database/models/posts.model";
import { postValidation } from "./post.validation";

class PostService {
  private postsService: DatabaseRepostaory<Posts>;
  constructor() {
    this.postsService = new DatabaseRepostaory<Posts>(postsModel);
  }

  addPost(data: Posts) {
    const { likes, userId, content, comments, photo } = data;
    GrapgQLValidation(postValidation, data);
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
    throw GraphqlErrorHandler(new notFound("no post found"));
  }
}

export const postService = new PostService();
