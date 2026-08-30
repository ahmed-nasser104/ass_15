"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_reposatory_1 = require("../../common/reposatory/database.reposatory");
const user_mode_1 = require("../../database/models/user.mode");
const error_response_1 = require("../../common/middleware/response/error.response");
const encryptions_1 = require("../../common/utils/security/encryptions");
const generateToken_1 = require("../../common/utils/token/generateToken");
const cloudniry_1 = __importDefault(require("../../common/utils/cloudniry"));
const s3_service_1 = __importDefault(require("../../common/utils/service/s3.service"));
const mutler_enume_1 = require("../../common/enums/mutler.enume");
class AuthService {
    authReposatory;
    tokenService;
    constructor() {
        this.authReposatory = new database_reposatory_1.DatabaseRepostaory(user_mode_1.userModel);
        this.tokenService = new generateToken_1.Token();
    }
    async getAllUser() {
        const users = await this.authReposatory.findAll({});
        if (!users) {
            throw new error_response_1.notFound("No users found");
        }
        return users;
    }
    async signup(data, file) {
        const { email, password, username } = data;
        const isUserExist = await this.authReposatory.findOne({ item: { email } });
        if (isUserExist) {
            throw new error_response_1.conflict("Email already exist");
        }
        let pic = "";
        if (file) {
            pic = await s3_service_1.default.uploader({
                storageKey: mutler_enume_1.MulterStorageEnum.disckStorage,
                file,
            });
            console.log(pic);
        }
        const hashedPassword = await (0, encryptions_1.hashing)(password);
        const user = await this.authReposatory.create({
            email,
            password: hashedPassword,
            username,
            profilePic: pic,
        });
        if (user) {
            return user;
        }
        throw new error_response_1.badRequest("some thing went wrong");
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.authReposatory.findOne({ item: { email } });
        if (!user) {
            throw new error_response_1.notFound("Email not found");
        }
        const isValid = await (0, encryptions_1.compareHash)(password, user.password);
        if (!isValid) {
            throw new error_response_1.badRequest("password is incorrect");
        }
        const { accessToken, refreshToken } = this.tokenService.generateTokens(user);
        return { accessToken, refreshToken };
    }
    async uploadProiflePic(file, user) {
        const userProfile = await this.authReposatory.findOne({
            item: { _id: user.id },
        });
        if (!userProfile) {
            throw new error_response_1.notFound("User not found");
        }
        const photo = await cloudniry_1.default.uploader.upload(file, {
            folder: `user/${user.id}/profile-pciture`,
        });
        if (!photo) {
            throw new error_response_1.notFound("No file found");
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
exports.default = new AuthService();
