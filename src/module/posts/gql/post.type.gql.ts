import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { userType } from "../../client/gql/client.type.gql";

export const postType = new GraphQLObjectType({
  name: "postType",
  fields: {
    likes: { type: new GraphQLList(userType) },
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    comments: { type: new GraphQLList(GraphQLString) },
    photo: { type: GraphQLString },
  },
});

export const getPost = new GraphQLObjectType({
  name: "getPostType",
  fields: {
    likes: { type: new GraphQLList(userType) },
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    comments: { type: new GraphQLList(GraphQLString) },
    photo: { type: GraphQLString },
  },
});
