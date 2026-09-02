import { Types } from "mongoose";

export interface Posts {
  likes: number;
  userId: Types.ObjectId;
  content: string;
  comments: number;
  photo?: string;
}
