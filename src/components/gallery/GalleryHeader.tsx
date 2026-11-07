import React from "react";
import { GALLERY_CATEGORIES } from "@/data/artworks";
import type { GalleryCategory } from "@/data/artworks";
import { ambientSound } from "@/lib/sound";
import { VolumeX, Search, X, ArrowUpRight, Sparkles } from "lucide-react";

export type GalleryMode = "orbit";

interface GalleryHeaderProps {
  currentMode: GalleryMode;
  onSelectMode: (mode: GalleryMode) => void;
  selectedCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
  totalArtworks: number;
  categoryCounts: Record<string, number>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function GalleryHeader({
  selectedCategory,
  onSelectCategory,
  totalArtworks,
  categoryCounts,
  searchQuery,
  onSearchChange,
}: GalleryHeaderProps) {
  const [isAudioActive, setIsAudioActive] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsAudioActive(active);
  };

  // Quick keyboard focus on "/"
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "m" || e.key === "M") {
        if (document.activeElement?.tagName !== "INPUT") {
          toggleSound();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-neutral-950/80 border-b border-neutral-800/80 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col gap-3">
        {/* Top line: Identity & Audio Status & Quick Outlink */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <span className="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-white">
                  SHUBHAMGOATFR
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                  <Sparkles className="w-2.5 h-2.5 text-violet-400" /> 3D SPATIAL ARCHIVE
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-widest text-neutral-500">
                CURATED PINTEREST MONOLITH // LIVING 360°
              </span>
            </div>
          </div>

          {/* Right actions: Search bar, Audio Toggle, Pinterest Link */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimal Search Bar */}
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search archive... (/)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-32 sm:w-48 md:w-56 pl-8 pr-7 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 text-neutral-500 hover:text-white transition-colors"
                  title="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Ambient Soundscape Controller */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all select-none cursor-pointer ${
                isAudioActive
                  ? "bg-violet-500/15 border-violet-500/60 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                  : "bg-neutral-900/90 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
              }`}
              title="Toggle Generative Spatial Soundscape (Press M)"
            >
              {isAudioActive ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5">
                    <span className="w-0.5 bg-violet-400 animate-[bounce_0.8s_infinite_100ms] h-full rounded-full" />
                    <span className="w-0.5 bg-violet-400 animate-[bounce_0.8s_infinite_200ms] h-2/3 rounded-full" />
                    <span className="w-0.5 bg-violet-400 animate-[bounce_0.8s_infinite_300ms] h-full rounded-full" />
                  </div>
                  <span className="hidden sm:inline text-[11px] font-semibold">SOUND ON [M]</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="hidden sm:inline text-[11px]">SOUND [M]</span>
                </>
              )}
            </button>

            {/* External Profile Link */}
            <a
              href="https://pinterest.com/shubhamgoatfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
            >
              <span>PINTEREST</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          </div>
        </div>

        {/* Category Filter Navigation with Exact Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5 border-t border-neutral-800/40">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mr-1.5 shrink-0">
            FILTER:
          </span>
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || (cat === "All" ? totalArtworks : 0);
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wide transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-100 text-neutral-950 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-[1.02]"
                    : "text-neutral-400 hover:text-neutral-200 bg-neutral-900/70 hover:bg-neutral-800/90 border border-neutral-800/70"
                }`}
              >
                <span>{cat.toUpperCase()}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? "bg-neutral-900 text-neutral-100"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
