import { Types } from "mongoose";

import { ChatType } from "../enums/chat.enum";

export interface Imessage {
  content: string;
  attachments?: string[];
  likes?: Types.ObjectId[];
  tags?: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

export interface IChat {
  participants: Types.ObjectId[];
  createdBy: Types.ObjectId;
  type: ChatType;
  message: Types.ObjectId[];
  group?: string;
  groupImage?: string;
  roomId?: string;
}
