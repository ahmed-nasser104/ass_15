"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const mutler_enume_1 = require("../../enums/mutler.enume");
const os_1 = require("os");
const uploader = ({ storageKey = mutler_enume_1.MulterStorageEnum.memorySrotage, }) => {
    const storage = storageKey == mutler_enume_1.MulterStorageEnum.memorySrotage
        ? multer_1.default.memoryStorage()
        : multer_1.default.diskStorage({
            destination(req, file, cb) {
                cb(null, (0, os_1.tmpdir)());
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + file.originalname);
            },
        });
    const uplaod = (0, multer_1.default)({ storage: storage });
    return uplaod;
};
exports.uploader = uploader;
