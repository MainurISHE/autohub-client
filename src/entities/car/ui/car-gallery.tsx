"use client";

import { useState } from "react";

interface CarGalleryProps {
  images: {
    url: string;
    publicId: string;
    order: number;
  }[];
}

export const CarGallery = ({ images }: CarGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.url);

  return (
    <div>
      <div className="h-[500px] overflow-hidden rounded-2xl">
        <img
          src={selectedImage}
          alt="Car"
          className="h-full w-full object-cover"
        />
      </div>


      <div className="mt-4 flex gap-3">
        {images.map((image) => (
          <button
            key={image.publicId}
            type="button"
            onClick={() => setSelectedImage(image.url)}
            className={`cursor-pointer h-20 w-24 overflow-hidden rounded-lg ${
                selectedImage === image.url
                ? "border-primary"
                : "border-transparent"
                }`}
          >
            <img
              src={image.url}
              alt="Car thumbnail"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
