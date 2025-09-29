import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  getPresignedUrl,
  saveFileMetadata,
  uploadToPresignedUrl,
} from "../../lib/api";
// import { v2 as cloudinary } from "cloudinary";

export interface UploadedFileMeta {
  id: string;
  name: string;
  size: number;
  uploadedAt: number;
}

export function FileUploader({
  disabled,
  onUploaded,
  onProgress,
}: {
  disabled?: boolean;
  onUploaded: (file: UploadedFileMeta) => void;
  onProgress?: (pct: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  function chooseFile() {
    inputRef.current?.click();
  }

  async function doUpload(file: File) {
    setStatus("loading");
    // setProgress(0);
    // Step 1: get presigned URL
    const presign = await getPresignedUrl({
      fileName: file.name,
      fileType: file.type || "application/octet-stream",
      fileSize: file.size,
    });
    // console.log(presign, "presign");

    if (!presign.success || !presign.data) {
      setStatus("error");
      return;
    }

    // cloudinary.config({
    //   cloud_name: presign.data.data.cloudinaryName,
    //   api_key: presign.data.data.apiKey,
    //   api_secret: presign.data.data.apiSecret,
    //   secure: true,
    // });

    // Step 2: PUT to cloud storage
    const put = await uploadToPresignedUrl(
      file,
      presign.data.data.signature,
      presign.data.data.apiKey,
      presign.data.data.apiSecret,
      presign.data.data.policy,
      presign.data.data.timestamp,
      presign.data.headers
    );
    console.log(put);
    let fileUrl;

    if (!put.success) {
      setStatus("error");
      // fileUrl = put.data.url;
      return;
    }
    if (put.data && put.data.url) fileUrl = put.data.url;
    // Step 3: notify backend with metadata
    const saved = await saveFileMetadata({
      id: presign.data.fileId,
      name: file.name,
      size: file.size,
      url: fileUrl,
      contentType: file.type || "application/octet-stream",
    });
    if (saved.success && saved.data) {
      setStatus("success");
      onUploaded({
        id: saved.data.id,
        name: saved.data.name,
        size: saved.data.size,
        uploadedAt: saved.data.uploadedAt,
      });
    } else {
      setStatus("error");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) doUpload(f);
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upload a File</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Button onClick={chooseFile} disabled={disabled}>
            Choose File
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
          />
          {/* <div className="flex-1 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-foreground"
              style={{ width: progress + "%" }}
            />
          </div>
          <span className="text-sm w-12 text-right">{progress}%</span> */}
        </div>
        {status === "success" && (
          <div className="mt-3 rounded-md border border-green-200 bg-green-50 p-2 text-sm text-green-700">
            Upload successful
          </div>
        )}
        {status === "error" && (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            Upload failed
          </div>
        )}
        {status === "loading" && (
          <div className="mt-3 rounded-md border border-blue-200 bg-blue-50 p-2 text-sm text-blue-700">
            Uploading...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
