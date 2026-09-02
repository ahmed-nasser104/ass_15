import Router, { Request, Response } from "express";
import { addingUser, auth } from "../../common/middleware/auth";
import clientService from "./client.service";
import { successResponce } from "../../common/middleware/response/success.responce";
const router = Router();
router.put("/update/user", auth, async (req: addingUser, res: Response) => {
  const editedUser = await clientService.updateProfile(req.body, req.user.id);
  successResponce({
    res,
    data: editedUser,
    message: "user updated",
    status: 200,
  });
});

router.delete(
  "/delete/profile",
  auth,
  async (req: addingUser, res: Response) => {
    const deletedUser = await clientService.deleteUserProfile(req.user.id);
    successResponce({
      res,
      data: deletedUser,
      message: "user deleted",
      status: 200,
    });
  },
);
export default router;
