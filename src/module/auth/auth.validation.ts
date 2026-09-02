import z from "zod";
export const signUpSchema = {
  body: z
    .strictObject({
      email: z.string().email(),
      password: z
        .string()
        .min(5, { error: "Password must be more than 5" })
        .max(20, { error: "Password must be less than 20 " }),
      username: z.string(),
      confrimPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.password! == data.confrimPassword) {
        ctx.addIssue({
          code: "custom",
          message: "confirm password not matched with password ",
        });
      }
    }),
};
