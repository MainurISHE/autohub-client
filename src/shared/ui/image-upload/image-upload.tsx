"use client";

import { useRef } from "react";
import { ImagePlus } from "lucide-react";

interface ImageUploadProps {
  onSelect: (file: File) => void;
  isLoading?: boolean;
}

export const ImageUpload = ({ onSelect, isLoading, }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          onSelect(file);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          flex
          h-64
          w-full
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-border
          bg-muted/30
          transition-colors
          hover:border-primary
          hover:bg-muted
        "
      >
        <ImagePlus className="mb-4 h-10 w-10 text-muted-foreground" />

        <span className="font-medium">{isLoading ? "Uploading..." : "Upload image"}</span>

        <span className="mt-1 text-sm text-muted-foreground">
          Click to select an image
        </span>
      </button>
    </>
  );
};
