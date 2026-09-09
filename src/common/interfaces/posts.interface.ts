import { Types } from "mongoose";

export interface Posts {
  likes: Types.ObjectId[];
  userId: Types.ObjectId;
  content: string;
  comments: string[];
  photo?: string;
}
