import mongoose from "mongoose";
import { User } from "../../common/interfaces/user.interface";
import { userRole } from "../../common/enums/user.enums";
import { userGender } from "../../common/enums/gender.enume";
import { userProvider } from "../../common/enums/provider.emuns";
const userSchema = new mongoose.Schema<User>(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phone: String,
    role: {
      type: String,
      default: userRole.user,
    },
    gender: {
      type: String,
      default: userGender.male,
    },
    age: {
      type: String,
    },
    provider: {
      type: String,
      default: userProvider.system,
    },
    profilePic: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema
  .virtual("username")
  .set(function (values) {
    const [firstName, lastName] = values.split(" ");
    this.firstname = firstName;
    this.lastname = lastName;
  })
  .get(function () {
    return `${this.firstname} ${this.lastname}`;
  });

export const userModel = mongoose.model<User>("user", userSchema);
