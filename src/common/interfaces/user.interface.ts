import { userGender } from "../enums/gender.enume";
import { userProvider } from "../enums/provider.emuns";
import { userRole } from "../enums/user.enums";

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  age?: string;
  password: string;
  profilePic: string;
  role: userRole;
  gender: userGender;
  provider: userProvider;
  phone?: string;
}
