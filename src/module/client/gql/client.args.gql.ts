import { GraphQLString } from "graphql";

export const userArgs = {
  name: {
    type: GraphQLString,
  },
  age: {
    type: GraphQLString,
  },
  email: {
    type: GraphQLString,
  },
};
