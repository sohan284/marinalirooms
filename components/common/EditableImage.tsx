"use client";

import { useState } from "react";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { ImageIcon, Loader2, Edit2, Check, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface EditableImageProps {
  lang: string;
  page: string;
  path: string;
  currentValue: string;
  className?: string;
  label?: string;
}

export default function EditableImage({
  lang,
  page,
  path,
  currentValue,
  className = "",
  label = "Change Image"
}: EditableImageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { startUpload } = useUploadThing("imageUploader");

  const mutation = useMutation({
    mutationFn: async (newUrl: string) => {
      const res = await fetch(`/api/content/${lang}/${page}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value: newUrl }),
      });
      if (!res.ok) throw new Error("Failed to update image");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Image updated successfully!");
      const LANGUAGES = ["en", "it", "de"];
      LANGUAGES.forEach(l => {
        queryClient.invalidateQueries({ queryKey: ["content", l, page] });
      });
      setIsUploading(false);
      setPendingFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    },
    onError: (err) => {
      toast.error("Failed to update image path in database.");
      console.error(err);
      setIsUploading(false);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke old preview URL if exists
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setPendingFile(file);
      const newUrl = URL.createObjectURL(file);
      setPreviewUrl(newUrl);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!pendingFile) return;
    setIsUploading(true);
    try {
      const res = await startUpload([pendingFile]);
      if (res && res[0]) {
        mutation.mutate(res[0].url);
      } else {
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
      toast.error("Upload failed");
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPendingFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className={cn("group relative pointer-events-none", className)}>
      {/* Visual Preview for pending upload - Elevated z-index */}
      {previewUrl && (
        <div className="absolute inset-0 z-[100] overflow-hidden border-4 border-blue-500 shadow-2xl animate-in fade-in zoom-in-95 duration-300 pointer-events-auto">
          <img
            src={previewUrl}
            alt="Preview"
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              isUploading ? "opacity-50 blur-[2px] grayscale" : ""
            )}
          />



          {/* Le Suite style loading overlay */}
          {isUploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] z-[120]">
              <Loader2 className="animate-spin text-blue-900 mb-2" size={32} />
              <span className="text-xs font-black text-blue-900 uppercase tracking-widest">Uploading</span>
            </div>
          )}
        </div>
      )}

      {/* Upload Trigger Container - Positioned at bottom of image when previewing */}
      <div className={cn(
        "z-[110] flex items-center gap-2 transition-all duration-300 pointer-events-auto",
        previewUrl
          ? "absolute bottom-6 left-1/2 -translate-x-1/2 scale-110 bg-white/95 p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-blue-200 backdrop-blur-xl"
          : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
      )}>
        {pendingFile ? (
          <div className="flex items-center gap-2 p-1">
            <button
              onClick={handleSave}
              disabled={isUploading || mutation.isPending}
              className="flex items-center gap-2 bg-green-600 text-background px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-green-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isUploading || mutation.isPending ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Check size={16} strokeWidth={3} />
              )}
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isUploading || mutation.isPending}
              className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-slate-200 transition-all active:scale-95"
            >
              <X size={16} strokeWidth={3} />
              Discard
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 bg-white/90 hover:bg-white text-blue-900 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md transition-all cursor-pointer border border-slate-200 active:scale-95">
            <ImageIcon size={16} className="text-blue-600" />
            <span>{label}</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}

// Add Check icon to the imports at top
