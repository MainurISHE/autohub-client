"use client";

import { useRef, useState } from "react";
import { Trash2, ImagePlus } from "lucide-react";

interface Image {
  url: string;
  publicId: string;
  order: number;
}

interface ImageUploadProps {
  images: Image[];
  onSelect: (files: File[]) => void;
  onRemove: (publicId: string) => void;
  isLoading?: boolean;
}

export const ImageUpload = ({
  images,
  onSelect,
  onRemove,
  isLoading,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.publicId}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={image.url}
                alt="Car"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <button
                type="button"
                onClick={() => onRemove(image.publicId)}
                className="
                  absolute
                  right-2
                  top-2
                  rounded-full
                  bg-red-600/80
                  p-2
                  text-white
                  opacity-0
                  backdrop-blur
                  transition
                  group-hover:opacity-100
                  hover:bg-red-600
                "
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);

          if (!files.length) return;

          if (images.length + files.length > 7) {
            setError("You can upload a maximum of 7 photos.");
            e.target.value = "";
            return;
          }

          setError("");
          onSelect(files);

          e.target.value = "";
        }}
      />

      <p className="text-sm text-muted-foreground">{images.length}/7 photos</p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        className="
          flex
          h-32
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
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <ImagePlus className="mb-3 h-8 w-8 text-muted-foreground" />

        <span className="font-medium">
          {isLoading ? "Uploading..." : "Add photos"}
        </span>

        <span className="mt-1 text-sm text-muted-foreground">
          You can select multiple images
        </span>
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
