import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.resolve("uploads"));
  },

  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });
