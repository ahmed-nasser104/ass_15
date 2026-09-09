class userResolver {
  constructor() {}
  sayHello(parent: any, args: any) {
    const { name, age, email } = args;
    return {
      message: "hello world",
      info: `name:${name} age:${age} email:${email}`,
    };
  }
}

export const userresolver = new userResolver();
