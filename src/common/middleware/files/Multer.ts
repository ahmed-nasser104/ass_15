import multer from "multer";
import { MulterStorageEnum } from "../../enums/mutler.enume";
import { tmpdir } from "os";
export const uploader = ({
  storageKey = MulterStorageEnum.memorySrotage,
}: {
  storageKey?: MulterStorageEnum;
}) => {
  const storage =
    storageKey == MulterStorageEnum.memorySrotage
      ? multer.memoryStorage()
      : multer.diskStorage({
          destination(req, file, cb) {
            cb(null, tmpdir());
          },
          filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
          },
        });
  const uplaod = multer({ storage: storage });
  return uplaod;
};
