import { GraphQLList } from "graphql";
import { postsArguments } from "./post.args.gql";
import { getPost, postType } from "./post.type.gql";
import { postReolver } from "./posts.resolver.gql";

class PostSchema {
  constructor() {}
  getPosts() {
    return {
      posts: {
        type: new GraphQLList(getPost),
        resolve: postReolver.getPost,
      },
    };
  }
  addPost() {
    return {
      postAdding: {
        type: postType,
        args: postsArguments,
        resolve: postReolver.addingPost,
      },
    };
  }
}
export const postSchema = new PostSchema();
