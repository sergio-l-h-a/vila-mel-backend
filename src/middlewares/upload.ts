import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => {
    return {
      folder: "vila-mel-profissionais",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "heic", "heif"]
    };
  }
});


export const upload = multer({ storage });
