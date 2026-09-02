"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../common/middleware/auth");
const client_service_1 = __importDefault(require("./client.service"));
const success_responce_1 = require("../../common/middleware/response/success.responce");
const router = (0, express_1.default)();
router.put("/update/user", auth_1.auth, async (req, res) => {
    const editedUser = await client_service_1.default.updateProfile(req.body, req.user.id);
    (0, success_responce_1.successResponce)({
        res,
        data: editedUser,
        message: "user updated",
        status: 200,
    });
});
router.delete("/delete/profile", auth_1.auth, async (req, res) => {
    const deletedUser = await client_service_1.default.deleteUserProfile(req.user.id);
    (0, success_responce_1.successResponce)({
        res,
        data: deletedUser,
        message: "user deleted",
        status: 200,
    });
});
exports.default = router;
