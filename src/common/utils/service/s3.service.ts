import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { env } from "../../../config/env.service";
import { MulterStorageEnum } from "../../enums/mutler.enume";
import { createReadStream } from "fs";
import { Upload } from "@aws-sdk/lib-storage";
export class S3service {
  private client: S3Client;
  constructor() {
    this.client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: env.access_key as string,
        secretAccessKey: env.secret_key as string,
      },
    });
  }

  async uploader({
    storageKey = MulterStorageEnum.memorySrotage,
    Bucket = "c46socialmediaapp",
    path = "general",
    content,
    file,
    ACL = ObjectCannedACL.private,
  }: {
    storageKey?: MulterStorageEnum;
    Bucket?: string;
    path?: string;
    file: Express.Multer.File;
    content?: string;
    ACL?: ObjectCannedACL;
  }) {
    const key = `socialMedia/${path}/${Math.round(
      Math.random() * 1e9,
    )}-${file.originalname}`;
    const result = await this.client.send(
      new PutObjectCommand({
        Bucket,
        Key: key,
        ACL,
        Body:
          storageKey == MulterStorageEnum.memorySrotage
            ? file.buffer
            : createReadStream(file.path),
        ContentType: content,
      }),
    );
    return key;
  }
  async uploaderBigFile({
    storageKey = MulterStorageEnum.memorySrotage,
    Bucket = "c46socialmediaapp",
    path = "general",
    content,
    file,
    ACL = ObjectCannedACL.private,
    partSize = 5,
  }: {
    storageKey?: MulterStorageEnum;
    Bucket?: string;
    path?: string;
    file: Express.Multer.File;
    content?: string;
    ACL?: ObjectCannedACL;
    partSize?: number;
  }) {
    const key = `socialMedia/${path}/${Math.round(
      Math.random() * 1e9,
    )}-${file.originalname}`;
    const result = new Upload({
      client: this.client,
      params: {
        Bucket,
        ACL,
        ContentType: content,
        Key: key,
        Body:
          storageKey == MulterStorageEnum.memorySrotage
            ? file.buffer
            : createReadStream(file.path),
      },
      partSize: partSize * 1024 * 1024,
    });
    result.on("httpUploadProgress", (progress) => {
      console.log(
        `${((progress.loaded as number) / (progress.total as number)) * 100} % `,
      );
    });
    return await result.done();
  }
}

export default new S3service();
