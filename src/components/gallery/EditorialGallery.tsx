import React from "react";
import type { Artwork } from "@/data/artworks";

interface EditorialGalleryProps {
  artworks: Artwork[];
  onSelectArtwork: (index: number) => void;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({
  artworks,
  onSelectArtwork,
}) => {
  return (
    <section className="w-full px-3 sm:px-5 md:px-8 py-4 sm:py-6">
      {/* 
        Responsive editorial masonry layout:
        - Mobile: 2 columns (clean visual rhythm)
        - Tablet (sm/md): 3 columns
        - Desktop (lg): 4 columns
        - Ultra-wide (2xl): 5 columns
        - Preserves 100% original aspect ratio without cropping, stretch, or distortion
      */}
      <div className="columns-2 sm:columns-3 lg:columns-4 2xl:columns-5 gap-3 sm:gap-4 md:gap-5 space-y-3 sm:space-y-4 md:space-y-5">
        {artworks.map((art, index) => (
          <div
            key={art.id}
            onClick={() => onSelectArtwork(index)}
            className="group relative break-inside-avoid overflow-hidden rounded-[2px] bg-[#111111] cursor-pointer transition-opacity duration-300 hover:opacity-90 active:scale-[0.99]"
          >
            <img
              src={art.image}
              alt=""
              loading={index < 8 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-auto block object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

