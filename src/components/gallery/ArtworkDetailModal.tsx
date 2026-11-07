import React, { useEffect } from "react";
import type { Artwork } from "@/data/artworks";
import { X, ArrowLeft, ArrowRight, ExternalLink, Sparkles, Check } from "lucide-react";

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onSelectPrev: () => void;
  onSelectNext: () => void;
}

export function ArtworkDetailModal({
  artwork,
  onClose,
  onSelectPrev,
  onSelectNext,
}: ArtworkDetailModalProps) {
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onSelectPrev();
      if (e.key === "ArrowRight") onSelectNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onSelectPrev, onSelectNext]);

  if (!artwork) return null;

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 backdrop-blur-2xl bg-neutral-950/85 animate-in fade-in duration-300"
    >
      {/* Background ambient glow matching artwork primary palette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${artwork.palette[1] || "#8b5cf6"} 0%, transparent 65%)`,
        }}
      />

      {/* Main modal container */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-neutral-900/90 border border-neutral-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Top bar controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-neutral-950/70 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors backdrop-blur-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Showcase Panel */}
        <div className="relative lg:w-3/5 bg-neutral-950 flex items-center justify-center p-6 sm:p-10 min-h-90 lg:min-h-150 overflow-hidden group">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Quick nav arrows overlay */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <button
              onClick={onSelectPrev}
              className="p-3 rounded-full bg-neutral-950/60 border border-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800/90 transition-all backdrop-blur-md opacity-80 hover:opacity-100"
              title="Previous piece (Left arrow)"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              onClick={onSelectNext}
              className="p-3 rounded-full bg-neutral-950/60 border border-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800/90 transition-all backdrop-blur-md opacity-80 hover:opacity-100"
              title="Next piece (Right arrow)"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metadata & Curatorial Notes Panel */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-neutral-900/60 backdrop-blur-md">
          <div className="space-y-6">
            {/* Gallery Index & Category */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
                {artwork.id} // {artwork.category}
              </span>
              <span className="font-mono text-xs text-neutral-500">
                ARCHIVED: {artwork.date}
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
                {artwork.title}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <Sparkles className="w-3 h-3" />
                  Curated Pick
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Aspect: {artwork.aspect_ratio}
                </span>
              </div>
            </div>

            {/* Description / Curatorial Statement */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                Curator Statement
              </span>
              <p className="text-sm leading-relaxed text-neutral-300 font-sans">
                {artwork.description}
              </p>
            </div>

            {/* Extracted Chromatic Palette */}
            <div className="space-y-2.5">
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 flex items-center justify-between">
                <span>Extracted Palette</span>
                {copiedHex && (
                  <span className="text-emerald-400 flex items-center gap-1 normal-case text-[10px]">
                    <Check className="w-3 h-3" /> Copied {copiedHex}
                  </span>
                )}
              </span>
              <div className="flex items-center gap-2">
                {artwork.palette.map((color) => (
                  <button
                    key={color}
                    onClick={() => copyColor(color)}
                    className="group relative flex-1 h-9 rounded-md border border-neutral-700/60 transition-transform hover:scale-105"
                    style={{ backgroundColor: color }}
                    title={`Click to copy ${color}`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-white pointer-events-none whitespace-nowrap border border-neutral-800">
                      {color}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                Index Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded bg-neutral-950/60 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA & External Link */}
          <div className="pt-8 mt-6 border-t border-neutral-800/80 space-y-3">
            <a
              href={artwork.pinterest_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-neutral-100 text-neutral-950 font-medium text-xs tracking-wider uppercase font-mono hover:bg-white hover:shadow-lg transition-all"
            >
              <span>View Source on Pinterest</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 px-1">
              <span>USE ARROWS ← → TO BROWSE</span>
              <span>ESC TO EXIT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
