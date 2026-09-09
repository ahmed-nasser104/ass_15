import z from "zod";
export const postValidation = z.strictObject({
  likes: z.array(
    z.string().length(24, { error: () => ({ message: "Invalid userId" }) }),
  ),
  userId: z
    .string()
    .length(24, { error: () => ({ message: "Invalid userId" }) }),
  content: z
    .string()
    .min(1, { error: () => ({ message: "Content is required" }) })
    .max(500),
  comments: z.array(
    z.string().length(24, { error: () => ({ message: "Invalid userId" }) }),
  ),
  //   photo: z.string().optional(),
});
