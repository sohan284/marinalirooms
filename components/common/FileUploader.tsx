"use client";

import { toast } from "sonner";
import { Image as ImageIcon, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  label?: string;
  value: string;
  imageKey?: string | null;
  onChange: (url: string, key: string | null) => void;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "4/3";
}

const aspectRatios = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
};

import { useState } from "react";

export function FileUploader({
  label = "Upload Image",
  value,
  imageKey,
  onChange,
  className,
  aspectRatio = "4/3",
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("imageUploader");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // We notify the parent of the new URL immediately for preview, 
      // but we mark it as a blob so the parent knows it's not saved yet.
      // However, usually the parent handles the save.
      // To keep it simple and consistent with the user's request, 
      // we'll show a "Confirm Upload" button here if it's a new file.
    }
  };

  const handleUpload = async () => {
    if (!pendingFile) return;
    setIsUploading(true);
    try {
      const res = await startUpload([pendingFile]);
      if (res?.[0]) {
        onChange(res[0].url, res[0].key);
        setPendingFile(null);
        setPreviewUrl(null);
        toast.success("Image uploaded successfully");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPendingFile(null);
    setPreviewUrl(null);
  };

  const displayValue = previewUrl || value;

  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-base font-bold">{label}</Label>

      {displayValue ? (
        <div className={cn("relative group rounded-xl overflow-hidden border bg-gray-50 flex items-center justify-center", aspectRatios[aspectRatio])}>
          <img
            src={displayValue}
            alt="Upload preview"
            className={cn("w-full h-full object-cover", pendingFile && "opacity-80 blur-[1px]")}
          />

          {isUploading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <Loader2 className="animate-spin text-blue-900 mb-2" size={32} />
              <span className="text-xs font-bold text-blue-900 uppercase">Uploading...</span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
            {pendingFile ? (
              <div className="flex flex-col gap-2 w-full max-w-[200px] px-4">
                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full bg-green-600 hover:bg-green-700 text-background font-bold h-10"
                >
                  Confirm & Upload
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isUploading}
                  className="w-full font-bold h-10"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <label className="h-10 px-4 bg-white text-slate-900 rounded-md font-bold flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
                <ImageIcon size={18} />
                Change Image
                <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
              </label>
            )}

            {!pendingFile && value && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onChange("", null)}
                className="h-9 flex items-center gap-2"
              >
                <X size={16} />
                Remove
              </Button>
            )}
          </div>

          {pendingFile && (
            <div className="absolute top-2 left-2 bg-blue-600 text-background text-[10px] font-bold px-2 py-1 rounded-md shadow-lg z-10 animate-pulse">
              PENDING UPLOAD
            </div>
          )}
        </div>
      ) : (
        <div className={cn("border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-gray-50 transition-colors relative overflow-hidden", aspectRatios[aspectRatio])}>
          <div className="p-4 rounded-full bg-blue-50 text-blue-500">
            <ImageIcon size={40} />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-bold">Select a file or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WebP up to 10MB</p>
          </div>
          <label className="bg-[#123149] text-background text-sm h-10 px-6 rounded-md font-bold flex items-center justify-center cursor-pointer hover:opacity-90 transition-all">
            Choose File
            <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
          </label>
        </div>
      )}
    </div>
  );
}
