"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";

interface CarGalleryProps {
  images: {
    url: string;
    publicId: string;
    order: number;
  }[];
}

export const CarGallery = ({ images }: CarGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.url);

  if (!images.length) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        No images available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <Dialog>
        <DialogTrigger
          render={
            <button
              type="button"
              className="group relative block h-[500px] w-full overflow-hidden rounded-2xl bg-muted"
            />
          }
        >
          <img
            src={selectedImage}
            alt="Car"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          <div className="absolute right-4 bottom-4 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-5 w-5" />
          </div>
        </DialogTrigger>

        <DialogContent className="!h-auto !w-auto !max-w-[95vw] border-none bg-transparent p-0 shadow-none [&>button]:right-3 [&>button]:top-3 [&>button]:z-50 [&>button]:rounded-full [&>button]:bg-white [&>button]:p-2 [&>button]:opacity-100 [&>button]:text-black [&>button]:shadow-lg hover:[&>button]:bg-gray-100">
          <DialogTitle className="sr-only">Car image</DialogTitle>

          <div className="flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Car"
              className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((image) => {
          const isSelected = selectedImage === image.url;

          return (
            <button
              key={image.publicId}
              type="button"
              onClick={() => setSelectedImage(image.url)}
              className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image.url}
                alt="Car thumbnail"
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
