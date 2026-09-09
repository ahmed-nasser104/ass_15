import mongoose from "mongoose";
import { Posts } from "../../common/interfaces/posts.interface";
const postsSchema = new mongoose.Schema<Posts>(
  {
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: {
      type: [String],
      default: [],
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const postsModel = mongoose.model<Posts>("posts", postsSchema);
