"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_service_1 = require("../../../config/env.service");
const mutler_enume_1 = require("../../enums/mutler.enume");
const fs_1 = require("fs");
const lib_storage_1 = require("@aws-sdk/lib-storage");
class S3service {
    client;
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: env_service_1.env.access_key,
                secretAccessKey: env_service_1.env.secret_key,
            },
        });
    }
    async uploader({ storageKey = mutler_enume_1.MulterStorageEnum.memorySrotage, Bucket = "c46socialmediaapp", path = "general", content, file, ACL = client_s3_1.ObjectCannedACL.private, }) {
        const key = `socialMedia/${path}/${Math.round(Math.random() * 1e9)}-${file.originalname}`;
        const result = await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket,
            Key: key,
            ACL,
            Body: storageKey == mutler_enume_1.MulterStorageEnum.memorySrotage
                ? file.buffer
                : (0, fs_1.createReadStream)(file.path),
            ContentType: content,
        }));
        return key;
    }
    async uploaderBigFile({ storageKey = mutler_enume_1.MulterStorageEnum.memorySrotage, Bucket = "c46socialmediaapp", path = "general", content, file, ACL = client_s3_1.ObjectCannedACL.private, partSize = 5, }) {
        const key = `socialMedia/${path}/${Math.round(Math.random() * 1e9)}-${file.originalname}`;
        const result = new lib_storage_1.Upload({
            client: this.client,
            params: {
                Bucket,
                ACL,
                ContentType: content,
                Key: key,
                Body: storageKey == mutler_enume_1.MulterStorageEnum.memorySrotage
                    ? file.buffer
                    : (0, fs_1.createReadStream)(file.path),
            },
            partSize: partSize * 1024 * 1024,
        });
        result.on("httpUploadProgress", (progress) => {
            console.log(`${(progress.loaded / progress.total) * 100} % `);
        });
        return await result.done();
    }
}
exports.S3service = S3service;
exports.default = new S3service();
