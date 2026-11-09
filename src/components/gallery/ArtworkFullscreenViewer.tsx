import React, { useEffect, useCallback, useRef, useState } from "react";
import type { CanvasArtworkNode } from "@/hooks/useCollisionFreeCanvas";
import { X } from "lucide-react";

export interface ArtworkFullscreenViewerProps {
  nodes: CanvasArtworkNode[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const ArtworkFullscreenViewer: React.FC<ArtworkFullscreenViewerProps> = ({
  nodes,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < nodes.length;
  const activeNode = isOpen ? nodes[activeIndex] : null;

  // Touch gesture state for swipe navigation & swipe-to-close
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [touchDeltaY, setTouchDeltaY] = useState(0);
  const [isSwipingY, setIsSwipingY] = useState(false);

  // Preload next and previous images for instant cycling
  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const preloadIndices = [
      (activeIndex - 1 + nodes.length) % nodes.length,
      (activeIndex + 1) % nodes.length,
    ];

    preloadIndices.forEach((idx) => {
      const node = nodes[idx];
      if (node?.artwork.image) {
        const img = new Image();
        img.src = node.artwork.image;
      }
    });
  }, [isOpen, activeIndex, nodes]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || activeIndex === null) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((activeIndex + 1) % nodes.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((activeIndex - 1 + nodes.length) % nodes.length);
      }
    },
    [isOpen, activeIndex, nodes.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Touch handlers for mobile swipe navigation and swipe-down-to-dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now(),
    };
    setIsSwipingY(false);
    setTouchDeltaY(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dy = touch.clientY - touchStartRef.current.y;
    const dx = touch.clientX - touchStartRef.current.x;

    // If vertical movement dominates and is pulling downward
    if (Math.abs(dy) > Math.abs(dx) && dy > 10) {
      setIsSwipingY(true);
      setTouchDeltaY(dy);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || activeIndex === null) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const elapsed = performance.now() - touchStartRef.current.time;

    // Swipe down to close
    if (dy > 120 || (dy > 60 && elapsed < 250)) {
      onClose();
      touchStartRef.current = null;
      setTouchDeltaY(0);
      setIsSwipingY(false);
      return;
    }

    // Horizontal swipe navigation (left: next, right: prev)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) {
        onNavigate((activeIndex + 1) % nodes.length);
      } else {
        onNavigate((activeIndex - 1 + nodes.length) % nodes.length);
      }
    }

    touchStartRef.current = null;
    setTouchDeltaY(0);
    setIsSwipingY(false);
  };

  if (!isOpen || !activeNode) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Artwork exhibition view"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black select-none touch-none animate-fadeIn"
      style={{
        backgroundColor: "#000000",
        animationDuration: "220ms",
      }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Minimal Top-Right Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close artwork view"
        className="fixed top-6 right-6 z-50 p-2.5 rounded-full text-neutral-400 hover:text-white bg-neutral-900/40 hover:bg-neutral-800/80 transition-colors cursor-pointer border border-white/5"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Pure Artwork Image Only — Zero Titles, Descriptions, Captions or Metadata */}
      <div
        className="relative flex items-center justify-center w-full h-full p-4 sm:p-8 md:p-12 pointer-events-none"
        style={{
          transform: isSwipingY
            ? `translateY(${touchDeltaY}px) scale(${Math.max(0.85, 1 - touchDeltaY / 800)})`
            : "none",
          transition: isSwipingY ? "none" : "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
          opacity: isSwipingY ? Math.max(0.3, 1 - touchDeltaY / 400) : 1,
        }}
      >
        <img
          key={activeNode.id}
          src={activeNode.artwork.image}
          alt=""
          className="max-w-[90vw] max-h-[88vh] w-auto h-auto object-contain pointer-events-auto transition-transform duration-200 select-none shadow-2xl"
          style={{
            aspectRatio: activeNode.aspectRatio ? `${activeNode.aspectRatio}` : undefined,
          }}
          onClick={(e) => {
            // Clicking directly on the image does not dismiss (allows user to inspect); clicking black backdrop closes
            e.stopPropagation();
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};
