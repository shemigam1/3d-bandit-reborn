import { Router } from "express";
import {
  createFileMetadataController,
  getAllFileMetadataController,
  getFileMetadataController,
  getSignatureController,
} from "../controllers/file";
import authMiddleWare from "../middlewares/authMiddleware";

const fileRouter = Router();

fileRouter.post("/signature", getSignatureController);
fileRouter.post("/metadata/", authMiddleWare, createFileMetadataController);
fileRouter.get("/metadata/:id", authMiddleWare, getFileMetadataController);
fileRouter.get("/", authMiddleWare, getAllFileMetadataController);

export default fileRouter;
