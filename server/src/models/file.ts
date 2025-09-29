import mongoose, { Schema } from "mongoose";
import { ISignup } from "../types/auth";
import { comparePassword, hashPassword } from "../helpers/hash";
import { IFileMetadata } from "../types/file";

const FileMetaDataSchema: Schema = new Schema<IFileMetadata>({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileUrl: { type: String, required: true },
  code: { type: String },
  uploadedBy: { type: Schema.Types.ObjectId, required: true },
  uploadedAt: { type: Number, required: true },
});

const FileMetadata = mongoose.model<IFileMetadata>(
  "FileMetaData",
  FileMetaDataSchema
);
export default FileMetadata;
