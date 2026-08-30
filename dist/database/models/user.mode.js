"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_enums_1 = require("../../common/enums/user.enums");
const gender_enume_1 = require("../../common/enums/gender.enume");
const provider_emuns_1 = require("../../common/enums/provider.emuns");
const userSchema = new mongoose_1.default.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        default: user_enums_1.userRole.user,
    },
    gender: {
        type: String,
        default: gender_enume_1.userGender.male,
    },
    age: {
        type: String,
    },
    provider: {
        type: String,
        default: provider_emuns_1.userProvider.system,
    },
    profilePic: {
        type: String,
    },
}, {
    timestamps: true,
});
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
exports.userModel = mongoose_1.default.model("user", userSchema);
