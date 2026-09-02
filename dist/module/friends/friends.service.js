"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_reposatory_1 = require("../../common/reposatory/database.reposatory");
const friends_model_1 = require("../../database/models/friends.model");
const error_response_1 = require("../../common/middleware/response/error.response");
const user_mode_1 = require("../../database/models/user.mode");
class FriendsService {
    Friendclient;
    userClient;
    constructor() {
        this.Friendclient = new database_reposatory_1.DatabaseRepostaory(friends_model_1.friendsModel);
        this.userClient = new database_reposatory_1.DatabaseRepostaory(user_mode_1.userModel);
    }
    async addFriend(userId, friendId) {
        const friend = await this.userClient.findOne({ item: { _id: friendId } });
        if (!friend) {
            throw new error_response_1.notFound("User not found");
        }
        const newFriend = await this.Friendclient.create({
            userId,
            friendId,
            accepted: !friend.is_private,
        });
        if (newFriend) {
            return newFriend;
        }
        throw new error_response_1.badRequest("Something went wrong");
    }
}
exports.default = new FriendsService();
