import { NextFunction, Request, Response } from "express";
import {
  IGetSignatureInput,
  ICreateFileMetadataInput,
  IGetFileMetadataInput,
  IGetAllFileMetadataInput,
} from "../types/file";
import { fileFactory } from "../services/factories";
import { generateRandom7DigitAlphanumeric } from "../helpers/utils";

export const getSignatureController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input: IGetSignatureInput = {
    fileName: req.body.fileName,
    fileType: req.body.fileType,
    fileSize: req.body.fileSize,
  };
  const response = await fileFactory().getSignature(input);
  return res.status(response.code).json(response);
};

export const createFileMetadataController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input: ICreateFileMetadataInput = {
    fileName: req.body.fileName,
    fileType: req.body.fileType,
    fileSize: req.body.fileSize,
    fileUrl: req.body.fileUrl,
    // key: generateRandom7DigitAlphanumeric(),
    uploadedBy: res.locals.user._id,
    // uploadedBy: "res.locals.user._id",
  };
  // console.log(input);

  const response = await fileFactory().createFileMetadata(input);
  return res.status(response.code).json(response);
};

export const getFileMetadataController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input: IGetFileMetadataInput = {
    id: req.params.id,
  };
  const response = await fileFactory().getFileMetadata(input);
  return res.status(response.code).json(response);
};

export const getAllFileMetadataController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input: IGetAllFileMetadataInput = {
    // You can add pagination, filters, etc. here if needed
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    uploadedBy: res.locals.user._id,
  };
  const response = await fileFactory().getAllFileMetadata(input);
  return res.status(response.code).json(response);
};
