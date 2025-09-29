"use client";

import { ProtectedRoute } from "@/components/protectedRoute";
import {
  FileUploader,
  UploadedFileMeta,
} from "@/components/uploader/file-uploader";
import { QuickUpload } from "@/components/uploader/quick-upload";
import { QuotaTracker } from "@/components/uploader/quota-tracker";
import { RecentFiles } from "@/components/uploader/recent-files";
import { useEffect, useState } from "react";

export default function Page() {
  // const userName = (() => {
  //   try {
  //     const u = JSON.parse(localStorage.getItem("user") || "{}") as {
  //       name?: string;
  //     };
  //     return u?.name || "User";
  //   } catch {
  //     return "User";
  //   }
  // })();

  const [files, setFiles] = useState<UploadedFileMeta[]>([]);
  const maxFiles = 10;
  const disabled = files.length >= maxFiles;
  useEffect(() => {
    // This only runs on the client
    const stored = JSON.parse(
      localStorage.getItem("recent_files") || "[]"
    ) as UploadedFileMeta[];
    setFiles(stored);
  }, []);

  function handleUploaded(meta: UploadedFileMeta) {
    const next = [meta, ...files].slice(0, 50);
    setFiles(next);
    localStorage.setItem("recent_files", JSON.stringify(next));
  }
  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="bg-muted/50 aspect-video rounded-xl">
            <FileUploader onUploaded={handleUploaded} disabled={disabled} />
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <QuotaTracker max={10} count={files.length} />
          </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <RecentFiles />
        </div>
      </div>
    </ProtectedRoute>
  );
}
