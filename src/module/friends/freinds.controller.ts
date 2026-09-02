import Router, { Request, Response } from "express";
import { addingUser, auth } from "../../common/middleware/auth";
import friendsService from "./friends.service";
import { Types } from "mongoose";
import { badRequest } from "../../common/middleware/response/error.response";
import { successResponce } from "../../common/middleware/response/success.responce";
const router = Router();
router.post(
  "/add/friend/:friendId",
  auth,
  async (req: addingUser, res: Response) => {
    const { friendId } = req.params;

    if (!friendId || Array.isArray(friendId)) {
      throw new badRequest("Invalid friendId");
    }
    const addedFriend = await friendsService.addFriend(
      req.user.id,
      new Types.ObjectId(friendId),
    );
    successResponce({
      res,
      data: addedFriend,
      message: "friend added",
      status: 200,
    });
  },
);

export default router;
