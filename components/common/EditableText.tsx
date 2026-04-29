"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Pencil, Check, X, Edit } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditableTextProps {
  lang: string;
  page: string;
  path: string;
  initialValue: string;
  as?: any;
  className?: string;
  multiline?: boolean;
}

export default function EditableText({
  lang,
  page,
  path,
  initialValue,
  as,
  className = "",
  multiline = false
}: EditableTextProps) {
  const Component = as || (multiline ? "div" : "span");
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const queryClient = useQueryClient();
  const inputRef = useRef<any>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const mutation = useMutation({
    mutationFn: async (newValue: string) => {
      const res = await fetch(`/api/content/${lang}/${page}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value: newValue }),
      });
      if (!res.ok) throw new Error("Failed to update text");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Text updated successfully!", { className: "text-green-600 bg-green-50" });
      queryClient.invalidateQueries({ queryKey: ["content", lang, page] });
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Failed to update text.");
      setValue(initialValue);
    }
  });

  const handleSave = () => {
    if (value !== initialValue) {
      mutation.mutate(value);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className={cn("relative z-50 w-full min-w-[250px] bg-white rounded-lg shadow-2xl border-2 border-blue-500 overflow-hidden", className)}>
        {multiline ? (
          <textarea
            ref={inputRef}
            className="w-full font-sans text-base bg-transparent text-black p-3 outline-none min-h-[120px] resize-y block"
            style={{ lineHeight: '1.5' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <input
            ref={inputRef}
            className="w-full font-sans text-base bg-transparent text-black px-3 py-3 outline-none block"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
        <div className="flex items-center justify-end gap-1 px-2 py-1 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={mutation.isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-green-700 hover:bg-green-100 rounded-md transition-colors"
          >
            <Check size={14} strokeWidth={3} />
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleCancel}
            disabled={mutation.isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 rounded-md transition-colors"
          >
            <X size={14} strokeWidth={3} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <Component className={cn("relative group inline-flex items-center gap-2 max-w-full", className)}>
      <span className="inline-block break-words">{value}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className="inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white text-primary p-1.5 rounded-full shrink-0 cursor-pointer"
        aria-label="Edit text"
        title="Inline Edit"
      >
        <Edit size={14} />
      </button>
    </Component>
  );
}

// Simple helper for class merging if not using a library, but assuming 'cn' is available or just using template literal
function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
