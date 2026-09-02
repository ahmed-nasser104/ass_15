import mongoose from "mongoose";
import { Friends } from "../../common/interfaces/friend.itnterface";
const friendsSchema = new mongoose.Schema<Friends>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    rejected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const friendsModel = mongoose.model<Friends>("friends", friendsSchema);
