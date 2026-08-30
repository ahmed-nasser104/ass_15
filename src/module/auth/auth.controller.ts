import Router, { Request, Response } from "express";
import authService from "./auth.service";
import { successResponce } from "../../common/middleware/response/success.responce";
import { uploader } from "../../common/middleware/files/Multer";
import { addingUser, auth } from "../../common/middleware/auth";
import { MulterStorageEnum } from "../../common/enums/mutler.enume";
import { validation } from "../../common/middleware/validation/validation";
import { signUpSchema } from "./auth.validation";
const router = Router();
router.post(
  "/signup",
  uploader({ storageKey: MulterStorageEnum.disckStorage }).single("file"),
  validation(signUpSchema),
  async (req: Request, res: Response) => {
    const user = await authService.signup(
      req.body,
      req.file as Express.Multer.File,
    );
    successResponce({
      res,
      data: user,
      message: "user signed ip seccessfully",
      status: 201,
    });
  },
);

router.post("/login", async (req: Request, res: Response) => {
  const user = await authService.login(req.body);
  successResponce({
    res,
    data: user,
    message: "user logined seccessfully",
    status: 200,
  });
});

router.post(
  "/profile-pic",
  uploader({ storageKey: MulterStorageEnum.disckStorage }).single("file"),
  auth,
  async (req: addingUser, res: Response) => {
    const userProfile = req.user;

    const user = await authService.uploadProiflePic(
      req.file?.path,
      userProfile,
    );
    successResponce({
      res,
      data: user,
      message: "user updated seccessfully",
      status: 200,
    });
  },
);

export default router;
