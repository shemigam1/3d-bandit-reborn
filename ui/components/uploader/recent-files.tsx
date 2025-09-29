"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { API_BASE_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ShareIcon from "../ui/share-icon";
import DeleteIcon from "../ui/delete-icon";
import CheckIcon from "../ui/check-icon";

export interface RecentFileItem {
  _id: string;
  fileName: string;
  uploadedAt: number;
  fileSize: number;
  code: string;
  fileUrl: string;
}

const getFiles = async () => {
  const token = localStorage.getItem("auth_token");
  const url = `${API_BASE_URL}/file/`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    // console.log(res);

    const data = await res.json();
    // console.log(data);

    return data.data;
  } catch (error) {
    return null;
  }
};

export function RecentFiles({
  // files,
  maxVisible = 6,
}: {
  // files: RecentFileItem[];
  maxVisible?: number;
}) {
  const [files, setFiles] = useState<RecentFileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      const data = await getFiles();
      // console.log(data);

      if (data) {
        setFiles(data);
      } else {
        setFiles([]);
      }
      setLoading(false);
    };
    fetchFiles();
  }, []);

  const handleCopyToClipboard = async (url: string, fileId: string) => {
    const textToCopy = url; // Replace with what you want to copy

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(fileId);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-64 overflow-auto pr-2">
          <ul className="space-y-2">
            {files.map((f) => (
              <li
                key={f._id}
                className="flex items-center justify-evenly rounded-md border p-2"
              >
                <div
                  // href={`/app/file/${encodeURIComponent(f.code)}`}
                  className="hover:underline"
                >
                  <Link href={f.fileUrl}>{f.fileName}</Link>
                  <Button
                    size="sm"
                    className="ml-2 hover:cursor-pointer"
                    onClick={() => handleCopyToClipboard(f.fileUrl, f._id)}
                  >
                    {copied == f._id ? <CheckIcon /> : <ShareIcon />}
                  </Button>

                  <Button size="sm" className="ml-2 hover:cursor-grab">
                    <DeleteIcon />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(f.fileSize / 1024)} KB
                </span>
              </li>
            ))}
            {files.length === 0 && (
              <li className="text-sm text-muted-foreground">No files yet.</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
