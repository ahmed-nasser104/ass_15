import { DatabaseRepostaory } from "../../common/reposatory/database.reposatory";
import { userModel } from "../../database/models/user.mode";
import { User } from "../../common/interfaces/user.interface";
import {
  badRequest,
  conflict,
  notFound,
} from "../../common/middleware/response/error.response";
import { compareHash, hashing } from "../../common/utils/security/encryptions";
import { Token } from "../../common/utils/token/generateToken";
import cloudinary from "../../common/utils/cloudniry";
import S3service from "../../common/utils/service/s3.service";
import { MulterStorageEnum } from "../../common/enums/mutler.enume";
class AuthService {
  private authReposatory: DatabaseRepostaory<User>;
  private tokenService: Token;
  constructor() {
    this.authReposatory = new DatabaseRepostaory<User>(userModel);
    this.tokenService = new Token();
  }

  async getAllUser() {
    const users = await this.authReposatory.findAll({});
    if (!users) {
      throw new notFound("No users found");
    }
    return users;
  }
  async signup(data: User, file: Express.Multer.File) {
    const { email, password, username } = data;
    const isUserExist = await this.authReposatory.findOne({ item: { email } });
    if (isUserExist) {
      throw new conflict("Email already exist");
    }
    let pic: unknown = "";
    if (file) {
      pic = await S3service.uploader({
        storageKey: MulterStorageEnum.disckStorage,
        file,
      });
      console.log(pic);
    }
    const hashedPassword = await hashing(password);
    const user = await this.authReposatory.create({
      email,
      password: hashedPassword,
      username,
      profilePic: pic,
    });
    if (user) {
      return user;
    }
    throw new badRequest("some thing went wrong");
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await this.authReposatory.findOne({ item: { email } });
    if (!user) {
      throw new notFound("Email not found");
    }
    const isValid: boolean = await compareHash(password, user.password);
    if (!isValid) {
      throw new badRequest("password is incorrect");
    }
    const { accessToken, refreshToken } =
      this.tokenService.generateTokens(user);
    return { accessToken, refreshToken };
  }

  async uploadProiflePic(file: any, user: any) {
    const userProfile = await this.authReposatory.findOne({
      item: { _id: user.id },
    });
    if (!userProfile) {
      throw new notFound("User not found");
    }
    const photo = await cloudinary.uploader.upload(file, {
      folder: `user/${user.id}/profile-pciture`,
    });
    if (!photo) {
      throw new notFound("No file found");
    }
    const userPhoto = await this.authReposatory.updateOne({
      filter: { _id: user.id },
      data: {
        profilePic: {
          public_id: photo.public_id,
          secure_url: photo.secure_url,
        },
      },
    });
    return userPhoto;
  }
}

export default new AuthService();
