"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = __importDefault(require("./auth.service"));
const success_responce_1 = require("../../common/middleware/response/success.responce");
const Multer_1 = require("../../common/middleware/files/Multer");
const auth_1 = require("../../common/middleware/auth");
const mutler_enume_1 = require("../../common/enums/mutler.enume");
const validation_1 = require("../../common/middleware/validation/validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.default)();
router.post("/signup", (0, Multer_1.uploader)({ storageKey: mutler_enume_1.MulterStorageEnum.disckStorage }).single("file"), (0, validation_1.validation)(auth_validation_1.signUpSchema), async (req, res) => {
    const user = await auth_service_1.default.signup(req.body, req.file);
    (0, success_responce_1.successResponce)({
        res,
        data: user,
        message: "user signed ip seccessfully",
        status: 201,
    });
});
router.post("/login", async (req, res) => {
    const user = await auth_service_1.default.login(req.body);
    (0, success_responce_1.successResponce)({
        res,
        data: user,
        message: "user logined seccessfully",
        status: 200,
    });
});
router.post("/profile-pic", (0, Multer_1.uploader)({ storageKey: mutler_enume_1.MulterStorageEnum.disckStorage }).single("file"), auth_1.auth, async (req, res) => {
    const userProfile = req.user;
    const user = await auth_service_1.default.uploadProiflePic(req.file?.path, userProfile);
    (0, success_responce_1.successResponce)({
        res,
        data: user,
        message: "user updated seccessfully",
        status: 200,
    });
});
exports.default = router;
