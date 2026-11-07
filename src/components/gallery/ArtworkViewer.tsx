import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { Artwork } from "@/data/artworks";
import type { CanvasArtworkNode } from "@/hooks/useCollisionFreeCanvas";

export interface ArtworkViewerProps {
  nodes?: CanvasArtworkNode[];
  artworks?: Artwork[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  getCanvasRect?: (index: number) => {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

export const ArtworkViewer: React.FC<ArtworkViewerProps> = ({
  nodes,
  artworks,
  initialIndex,
  isOpen,
  onClose,
}) => {
  const total = nodes?.length ?? artworks?.length ?? 0;

  const [indexOffset, setIndexOffset] = useState<number>(0);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [pullDownY, setPullDownY] = useState(0);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIndexOffset(0);
      setPullDownY(0);
    }
  }

  const currentIndex = total > 0 ? (initialIndex + indexOffset + total * 1000) % total : 0;

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchDeltaRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const shouldReduceMotion = useReducedMotion();

  // Focus close button whenever opening
  useEffect(() => {
    if (isOpen) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;

      // Focus close button for keyboard accessibility
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setPullDownY(0);
    setIndexOffset(0);
    onClose();
    // Return focus to previously focused element on canvas
    if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus();
    }
  }, [onClose]);

  const nextArtwork = useCallback(() => {
    if (total === 0) return;
    setIndexOffset((prev) => prev + 1);
  }, [total]);

  const prevArtwork = useCallback(() => {
    if (total === 0) return;
    setIndexOffset((prev) => prev - 1);
  }, [total]);

  // Preload adjacent images for instantaneous arrow-key transitions
  useEffect(() => {
    if (!isOpen || total === 0) return;
    const preloadIndices = [
      (currentIndex - 1 + total) % total,
      (currentIndex + 1) % total,
    ];
    preloadIndices.forEach((idx) => {
      const imgUrl = nodes ? nodes[idx]?.artwork?.image : artworks?.[idx]?.image;
      if (imgUrl) {
        const img = new Image();
        img.src = imgUrl;
      }
    });
  }, [currentIndex, isOpen, nodes, artworks, total]);

  // Keyboard navigation & accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextArtwork();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevArtwork();
      } else if (e.key === "Tab") {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextArtwork, prevArtwork, handleClose]);

  // Mobile touch gestures: swipe down to close, swipe horizontal to navigate
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: performance.now(),
    };
    touchDeltaRef.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;
    touchDeltaRef.current = { x: dx, y: dy };

    // If pulling down on mobile, give live elastic feedback
    if (dy > 0 && Math.abs(dy) > Math.abs(dx)) {
      setPullDownY(dy);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current) return;
    const { x: dx, y: dy } = touchDeltaRef.current;
    const duration = performance.now() - touchStartRef.current.time;
    const velocityY = duration > 0 ? dy / duration : 0;

    // Swipe down to close threshold
    if (dy > 70 || (dy > 30 && velocityY > 0.45)) {
      handleClose();
    } else if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe to navigate
      if (dx < 0) {
        nextArtwork();
      } else {
        prevArtwork();
      }
      setPullDownY(0);
    } else {
      setPullDownY(0);
    }

    touchStartRef.current = null;
    touchDeltaRef.current = { x: 0, y: 0 };
  };

  // Close when clicking outside the artwork on the black backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Retrieve current artwork
  const currentNode = nodes ? nodes[currentIndex] : null;
  const currentArtwork: Artwork | undefined =
    currentNode?.artwork || (artworks ? artworks[currentIndex] : undefined);

  return (
    <AnimatePresence>
      {isOpen && currentArtwork && (
        <motion.div
          key="fullscreen-artwork-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen artwork exhibition"
          initial={{ opacity: 0 }}
          animate={{
            opacity: pullDownY > 0 ? Math.max(0.35, 1 - pullDownY / 380) : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.15 : 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 sm:p-8 md:p-12 select-none cursor-default overflow-hidden"
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{
            backgroundColor: "#000000",
          }}
        >
          {/* ── Minimal Close Icon (Top-Right Corner) ── */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="fixed top-5 right-5 sm:top-7 sm:right-7 z-50 p-2.5 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 cursor-pointer"
            aria-label="Close fullscreen artwork (Escape)"
            title="Close (Esc)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          </button>

          {/* ── Distraction-Free Artwork with Smooth Zoom Transition ── */}
          <motion.div
            key={currentArtwork.id}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.82, opacity: 0 }
            }
            animate={{
              scale: pullDownY > 0 ? Math.max(0.78, 1 - pullDownY / 1000) : 1,
              y: pullDownY > 0 ? pullDownY * 0.75 : 0,
              opacity: 1,
            }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.82, opacity: 0 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative max-w-full max-h-full flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentArtwork.image}
              alt={`${currentArtwork.title} — ${currentArtwork.category} design by Shubham Kumawat (Shubhamgoatfr)`}
              className="max-h-[85vh] sm:max-h-[88vh] max-w-[92vw] sm:max-w-[88vw] w-auto h-auto object-contain block select-none pointer-events-auto rounded-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
