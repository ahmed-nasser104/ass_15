import { Types } from "mongoose";
import { User } from "../../common/interfaces/user.interface";
import { DatabaseRepostaory } from "../../common/reposatory/database.reposatory";
import { userModel } from "../../database/models/user.mode";
import { notFound } from "../../common/middleware/response/error.response";

class ClientService {
  private client: DatabaseRepostaory<User>;
  constructor() {
    this.client = new DatabaseRepostaory<User>(userModel);
  }

  async updateProfile(data: User, userId: Types.ObjectId) {
    const { username, email, phone, age } = data;
    const isEmailExist = await this.client.findOne({ item: { email } });
    if (!isEmailExist) {
      throw new notFound("Email not found");
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

  async deleteUserProfile(userId: Types.ObjectId) {
    const isUserExist = await this.client.findById({ id: userId.toString() });
    if (!isUserExist) {
      throw new notFound("User not found");
    }
    const deletedUser = await this.client.deleteOne({ _id: userId });
    if (deletedUser.deletedCount > 0) {
      return { message: "User deleted" };
    }
    return { message: "user not deleted" };
  }
}

export default new ClientService();
