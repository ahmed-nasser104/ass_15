import mongoose from "mongoose";
import { Comments } from "../../common/interfaces/comments.interface";
const commentsSchema = new mongoose.Schema<Comments>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const commentsModel = mongoose.model<Comments>(
  "comments",
  commentsSchema,
);
