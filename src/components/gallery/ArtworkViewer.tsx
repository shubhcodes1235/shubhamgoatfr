import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Artwork } from "@/data/artworks";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";

interface ArtworkViewerProps {
  artworks: Artwork[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtworkViewer: React.FC<ArtworkViewerProps> = ({
  artworks,
  initialIndex,
  isOpen,
  onClose,
}) => {
  const [indexOffset, setIndexOffset] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = artworks.length;

  // Derive current index from initialIndex + cumulative user offset
  const currentIndex = total > 0 ? (initialIndex + indexOffset + total * 1000) % total : 0;

  const nextArtwork = useCallback(() => {
    if (total === 0) return;
    setIndexOffset((prev) => prev + 1);
  }, [total]);

  const prevArtwork = useCallback(() => {
    if (total === 0) return;
    setIndexOffset((prev) => prev - 1);
  }, [total]);

  const handleClose = useCallback(() => {
    setIsPlaying(false);
    setIndexOffset(0);
    onClose();
  }, [onClose]);

  // Slideshow interval
  useEffect(() => {
    if (isPlaying && isOpen) {
      timerRef.current = setInterval(nextArtwork, 3500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isOpen, nextArtwork]);

  // Preload adjacent images (prev and next 2)
  useEffect(() => {
    if (!isOpen || total === 0) return;
    const preloadIndices = [
      (currentIndex - 1 + total) % total,
      (currentIndex + 1) % total,
      (currentIndex + 2) % total,
    ];
    preloadIndices.forEach((idx) => {
      const art = artworks[idx];
      if (art?.image) {
        const img = new Image();
        img.src = art.image;
      }
    });
  }, [currentIndex, isOpen, artworks, total]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        nextArtwork();
      } else if (e.key === "ArrowLeft") {
        prevArtwork();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextArtwork, prevArtwork, handleClose]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    const threshold = 50;
    if (touchDeltaX < -threshold) {
      nextArtwork();
    } else if (touchDeltaX > threshold) {
      prevArtwork();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  if (!isOpen) return null;

  const current = artworks[currentIndex] || artworks[0];

  return (
    <AnimatePresence>
      <motion.div
        key="artwork-viewer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#090909] flex flex-col justify-between select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Top Bar: minimal count, slideshow toggle, and close */}
        <header className="w-full px-5 py-4 flex items-center justify-between z-30">
          <span className="font-mono text-[11px] tracking-widest text-neutral-500">
            {currentIndex + 1} / {total}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono tracking-wider transition-colors cursor-pointer ${
                isPlaying
                  ? "bg-white text-black font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Toggle slideshow (Space)"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span className="hidden sm:inline">{isPlaying ? "PAUSE" : "SLIDESHOW"}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Close (Esc)"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Central Artwork Showcase: Maximize screen occupancy, preserve exact aspect ratio */}
        <main className="relative flex-1 w-full flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Left Arrow Zone */}
          <button
            onClick={prevArtwork}
            className="absolute left-2 sm:left-4 z-20 p-2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous artwork"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Central Image with smooth fade & micro zoom transition */}
          <div
            onClick={nextArtwork}
            className="relative max-w-full max-h-full flex items-center justify-center cursor-pointer"
          >
            <motion.img
              key={current.id}
              src={current.image}
              alt=""
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[85vh] sm:max-h-[88vh] max-w-[94vw] sm:max-w-[90vw] w-auto h-auto object-contain rounded-xs"
              draggable={false}
            />
          </div>

          {/* Right Arrow Zone */}
          <button
            onClick={nextArtwork}
            className="absolute right-2 sm:right-4 z-20 p-2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Next artwork"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </main>

        {/* Bottom subtle hint bar */}
        <footer className="w-full px-5 py-3 flex justify-center items-center z-30">
          <span className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase">
            [← / →] Navigate &nbsp;·&nbsp; [SPACE] Slideshow &nbsp;·&nbsp; [ESC] Close
          </span>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};
