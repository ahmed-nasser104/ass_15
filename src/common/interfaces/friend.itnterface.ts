import { Types } from "mongoose";

export interface Friends {
  friendId: Types.ObjectId;
  userId: Types.ObjectId;
  accepted?: boolean;
  rejected?: boolean;
}
