import mongoose, { Types } from "mongoose";

import { ChatType } from "../../common/enums/chat.enum";
import { IChat, Imessage } from "../../common/interfaces/chat.interface";

export const messageSchema = new mongoose.Schema<Imessage>(
  {
    content: {
      type: String,
      required: function (this) {
        return !this.attachments?.length;
      },
    },

    attachments: [{ type: String }],

    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],

    tags: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const chatSchema = new mongoose.Schema<IChat>(
  {
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ChatType,
      default: ChatType.ovo,
    },

    message: [
      {
        type: Types.ObjectId,
        ref: "Message",
      },
    ],

    group: {
      type: String,
      required: function (this) {
        return this.type === ChatType.ovm;
      },
    },

    groupImage: {
      type: String,
      required: function (this) {
        return this.type === ChatType.ovm;
      },
    },

    roomId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const chatModel = mongoose.model<IChat>("Chat", chatSchema);
export const messageModel = mongoose.model<Imessage>("Message", messageSchema);
