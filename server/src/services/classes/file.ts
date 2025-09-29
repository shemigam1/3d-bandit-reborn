import {
  generateRandom7DigitAlphanumeric,
  ResultFunction,
} from "../../helpers/utils";
import {
  ICreateFileMetadataInput,
  IGetAllFileMetadataInput,
  IGetFileMetadataInput,
  IGetSignatureInput,
} from "../../types/file";
import { ReturnStatus } from "../../types/generic";
import FileMetadata from "../../models/file";
import { v2 } from "cloudinary";
import config from "../../helpers/config";

class Files {
  public async generateUploadSignature(
    fileName: string,
    fileType: string,
    fileSize: number
  ) {
    // Implementation for generating cloud storage upload signature
    // This would vary based on your cloud provider (AWS S3, Google Cloud, etc.)
    v2.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.api_secret,
    });

    const timestamp = Date.now() / 1000;
    const signature = await v2.utils.api_sign_request(
      {
        timestamp: timestamp,
        upload_preset: "3d_bandit",
        // file_name: fileName,
        // file_type: fileType,
        // file_size: fileSize,
      },
      config.api_secret
    );
    return {
      signature: signature,
      timestamp: timestamp,
      expiration: timestamp + 3600,
      policy: "upload-policy",
      apiKey: config.api_key,
    };
  }
  public async getSignature(input: IGetSignatureInput) {
    try {
      const { fileName, fileType, fileSize } = input;

      // Validation
      if (!fileName || !fileType || fileSize <= 0) {
        // console.log(input);

        return ResultFunction(
          false,
          "Invalid file data",
          400,
          ReturnStatus.BAD_REQUEST,
          null
        );
      }

      // Generate signature logic (e.g., for cloud upload)
      const signatureData = await this.generateUploadSignature(
        fileName,
        fileType,
        fileSize
      );

      if (!signatureData) {
        return ResultFunction(
          false,
          "Failed to generate signature",
          500,
          ReturnStatus.NOT_OK,
          null
        );
      }

      return ResultFunction(
        true,
        "Signature generated successfully",
        200,
        ReturnStatus.OK,
        { ...signatureData, apiSecret: config.api_secret }
      );
    } catch (error: any) {
      console.error(error);
      return ResultFunction(
        false,
        "Something went wrong while generating signature",
        422,
        ReturnStatus.NOT_OK,
        null
      );
    }
  }

  public async createFileMetadata(input: ICreateFileMetadataInput) {
    try {
      const { fileName, fileType, fileSize, fileUrl, uploadedBy } = input;

      // Validation
      if (!fileName || !fileType || !fileUrl || !uploadedBy) {
        return ResultFunction(
          false,
          "All fields are required",
          400,
          ReturnStatus.BAD_REQUEST,
          null
        );
      }

      // Check if file metadata already exists
      //   const existingFile = await FileMetadata.findOne({ fileUrl });
      //   if (existingFile) {
      //     return ResultFunction(
      //       false,
      //       "File metadata already exists",
      //       400,
      //       ReturnStatus.BAD_REQUEST,
      //       null
      //     );
      //   }

      const code = generateRandom7DigitAlphanumeric();

      // Create file metadata
      const newFileMetadata = {
        fileName,
        fileType,
        fileSize,
        fileUrl,
        // key,
        code,
        uploadedBy,
        uploadedAt: new Date(),
      };

      const savedMetadata = await FileMetadata.create(newFileMetadata);

      return ResultFunction(
        true,
        "File metadata created successfully",
        201,
        ReturnStatus.OK,
        savedMetadata
      );
    } catch (error: any) {
      console.error(error);
      return ResultFunction(
        false,
        "Something went wrong while creating file metadata",
        422,
        ReturnStatus.NOT_OK,
        null
      );
    }
  }

  public async getFileMetadata(input: IGetFileMetadataInput) {
    try {
      const { id } = input;

      // Validation
      if (!id) {
        return ResultFunction(
          false,
          "File ID is required",
          400,
          ReturnStatus.BAD_REQUEST,
          null
        );
      }

      // Find file metadata
      const fileMetadata = await FileMetadata.findById(id);
      if (!fileMetadata) {
        return ResultFunction(
          false,
          "File metadata not found",
          404,
          ReturnStatus.NOT_OK,
          null
        );
      }

      return ResultFunction(
        true,
        "File metadata retrieved successfully",
        200,
        ReturnStatus.OK,
        fileMetadata
      );
    } catch (error: any) {
      console.error(error);
      return ResultFunction(
        false,
        "Something went wrong while retrieving file metadata",
        422,
        ReturnStatus.NOT_OK,
        null
      );
    }
  }

  public async getAllFileMetadata(input: IGetAllFileMetadataInput) {
    try {
      const { page = 1, limit = 10, uploadedBy } = input;

      // Validation
      if (page < 1 || limit < 1) {
        return ResultFunction(
          false,
          "Invalid pagination parameters",
          400,
          ReturnStatus.BAD_REQUEST,
          null
        );
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Get all file metadata with pagination
      const files = await FileMetadata.find({ uploadedBy })
        .sort({ uploadedAt: -1 })
        .skip(skip)
        .limit(limit);

      // Get total count for pagination info
      const totalCount = await FileMetadata.countDocuments({ uploadedBy });
      const totalPages = Math.ceil(totalCount / limit);

      const paginationData = {
        files,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
      // console.log(files);

      return ResultFunction(
        true,
        "File metadata retrieved successfully",
        200,
        ReturnStatus.OK,
        files
      );
    } catch (error: any) {
      console.error(error);
      return ResultFunction(
        false,
        "Something went wrong while retrieving file metadata",
        422,
        ReturnStatus.NOT_OK,
        null
      );
    }
  }
}

export default Files;
