import { Schema } from "mongoose";

export interface IGetSignatureInput {
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface ICreateFileMetadataInput {
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  // key: string;
  uploadedBy: Schema.Types.ObjectId | string;
}

export interface IGetFileMetadataInput {
  id: string;
}

export interface IGetAllFileMetadataInput {
  page?: number;
  limit?: number;
  uploadedBy: Schema.Types.ObjectId | string;
}

export interface IFileMetadata {
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  key: string;
  code: string;
  uploadedBy: Schema.Types.ObjectId | string;
  uploadedAt: number;
}
