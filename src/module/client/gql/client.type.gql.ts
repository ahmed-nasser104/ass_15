import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const userSchemeType = new GraphQLObjectType({
  name: "helloQuery",
  fields: {
    message: {
      type: GraphQLString,
    },
    info: {
      type: GraphQLString,
    },
  },
});

export const userType = new GraphQLObjectType({
  name: "User",

  fields: {
    _id: {
      type: GraphQLID,
    },

    username: {
      type: GraphQLString,
    },

    email: {
      type: GraphQLString,
    },
  },
});
