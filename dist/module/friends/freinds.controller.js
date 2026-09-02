"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../common/middleware/auth");
const friends_service_1 = __importDefault(require("./friends.service"));
const mongoose_1 = require("mongoose");
const error_response_1 = require("../../common/middleware/response/error.response");
const success_responce_1 = require("../../common/middleware/response/success.responce");
const router = (0, express_1.default)();
router.post("/add/friend/:friendId", auth_1.auth, async (req, res) => {
    const { friendId } = req.params;
    if (!friendId || Array.isArray(friendId)) {
        throw new error_response_1.badRequest("Invalid friendId");
    }
    const addedFriend = await friends_service_1.default.addFriend(req.user.id, new mongoose_1.Types.ObjectId(friendId));
    (0, success_responce_1.successResponce)({
        res,
        data: addedFriend,
        message: "friend added",
        status: 200,
    });
});
exports.default = router;
