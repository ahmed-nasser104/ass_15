import { Response, Router } from "express";
import { addingUser, auth } from "../../common/middleware/auth";
import { chatService } from "./chat.service";
import { successResponce } from "../../common/middleware/response/success.responce";
const router = Router();

// router.get("/get-chat", auth, async (req: addingUser, res: Response) => {
//   const data = await chatService.;
//   successResponce({
//     res,
//     data,
//     message: "message sent successfully",
//     status: 200,
//   });
// });

export default router;
