import { GraphQLID, GraphQLList, GraphQLString } from "graphql";

export const postsArguments = {
  likes: {
    type: new GraphQLList(GraphQLString),
  },
  userId: {
    type: GraphQLID,
  },
  content: { type: GraphQLString },
  comments: {
    type: new GraphQLList(GraphQLString),
  },
  photo: { type: GraphQLString },
};
