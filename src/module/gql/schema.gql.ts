import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userschema } from "../client/gql/client.gql";
import { postSchema } from "../posts/gql/post.gql";

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: { ...userschema.register(), ...postSchema.getPosts() },
});

const mutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: { ...postSchema.addPost() },
});
export const schema = new GraphQLSchema({ query, mutation });
