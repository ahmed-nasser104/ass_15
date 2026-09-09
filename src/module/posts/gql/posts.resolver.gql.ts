import { Posts } from "../../../common/interfaces/posts.interface";
import { postService } from "../posts.service";

class PostsResolver {
  constructor() {}
  async addingPost(parent: any, args: Posts, context: any) {
    console.log(context.req.headers.authorization);
    const addedPost = await postService.addPost(args);
    return addedPost;
  }
  async getPost() {
    const posts = await postService.getPost();
    return posts;
  }
}

export const postReolver = new PostsResolver();
