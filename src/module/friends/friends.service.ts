import { Types } from "mongoose";
import { Friends } from "../../common/interfaces/friend.itnterface";
import { DatabaseRepostaory } from "../../common/reposatory/database.reposatory";
import { friendsModel } from "../../database/models/friends.model";
import {
  badRequest,
  notFound,
} from "../../common/middleware/response/error.response";
import { userModel } from "../../database/models/user.mode";
import { User } from "../../common/interfaces/user.interface";

class FriendsService {
  private Friendclient: DatabaseRepostaory<Friends>;
  private userClient: DatabaseRepostaory<User>;
  constructor() {
    this.Friendclient = new DatabaseRepostaory<Friends>(friendsModel);
    this.userClient = new DatabaseRepostaory<User>(userModel);
  }

  async addFriend(userId: Types.ObjectId, friendId: Types.ObjectId) {
    const friend = await this.userClient.findOne({ item: { _id: friendId } });
    if (!friend) {
      throw new notFound("User not found");
    }
    const newFriend = await this.Friendclient.create({
      userId,
      friendId,
      accepted: !friend.is_private,
    });
    if (newFriend) {
      return newFriend;
    }
    throw new badRequest("Something went wrong");
  }
}
export default new FriendsService();
