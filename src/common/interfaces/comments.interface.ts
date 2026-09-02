import { Types } from "mongoose";

export interface Comments {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
}
