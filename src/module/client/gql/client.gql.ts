import { userSchemeType } from "./client.type.gql";
import { userArgs } from "./client.args.gql";
import { userresolver } from "./user.resolver.gql";

class userGqlSchema {
  constructor() {}
  register() {
    return {
      sayHello: {
        type: userSchemeType,
        args: userArgs,
        resolve: userresolver.sayHello,
      },
    };
  }
}

export const userschema = new userGqlSchema();
