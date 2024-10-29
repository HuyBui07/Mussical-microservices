import { v2 as cloudinaryClient } from "cloudinary";
//Multer
import multer from "multer";
import { FileFilterCallback } from "multer";
import { Request } from "express";

cloudinaryClient.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

if (
  !process.env.CLOUDINARY_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Cloudinary environment variables not set");
}
//Check empty ""
if (
  process.env.CLOUDINARY_NAME === "" ||
  process.env.CLOUDINARY_API_KEY === "" ||
  process.env.CLOUDINARY_API_SECRET === ""
) {
  throw new Error("Cloudinary environment variables not set");
}

export async function cloudinaryUploader(
  fileBuffer: Buffer,
  folder: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryClient.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error: any, result: unknown) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Pass the buffer to the upload stream
    uploadStream.end(fileBuffer);
  });
}
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.fieldname === "posterFile") {
    // Accept image files only for posterFile
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type for posterFile. Only JPG, JPEG, and PNG are allowed."
        )
      );
    }
  } else if (file.fieldname === "sourceFile") {
    // Accept mp3 files only for sourceFile
    if (file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type for sourceFile. Only MP3 is allowed."));
    }
  } else {
    cb(new Error("Unexpected field"));
  }
};
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
//Multer uploader take two file in two field, posterFile and sourceFile. Img accepted are jpg, jpeg, png. Audio is mp3 only
export const multerSongUploader = upload.fields([
  { name: "posterFile", maxCount: 1 },
  { name: "sourceFile", maxCount: 1 },
]);

//Export cloudinary client
export default cloudinaryClient;
