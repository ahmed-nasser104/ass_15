"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_reposatory_1 = require("../../common/reposatory/database.reposatory");
const user_mode_1 = require("../../database/models/user.mode");
const error_response_1 = require("../../common/middleware/response/error.response");
class ClientService {
    client;
    constructor() {
        this.client = new database_reposatory_1.DatabaseRepostaory(user_mode_1.userModel);
    }
    async updateProfile(data, userId) {
        const { username, email, phone, age } = data;
        const isEmailExist = await this.client.findOne({ item: { email } });
        if (!isEmailExist) {
            throw new error_response_1.notFound("Email not found");
        }
        const updatedUsser = await this.client.updateOne({
            filter: { _id: userId },
            data: { username, email, phone, age },
        });
        if (updatedUsser.modifiedCount > 0) {
            return { message: "User updated" };
        }
        return { message: "user not updated" };
    }
    async deleteUserProfile(userId) {
        const isUserExist = await this.client.findById({ id: userId.toString() });
        if (!isUserExist) {
            throw new error_response_1.notFound("User not found");
        }
        const deletedUser = await this.client.deleteOne({ _id: userId });
        if (deletedUser.deletedCount > 0) {
            return { message: "User deleted" };
        }
        return { message: "user not deleted" };
    }
}
exports.default = new ClientService();
