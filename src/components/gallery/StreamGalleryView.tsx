import { useState } from "react";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import type { Artwork } from "@/data/artworks";
import { Gauge, Sliders, ExternalLink, Sparkles } from "lucide-react";

interface StreamGalleryViewProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export function StreamGalleryView({
  artworks,
  onSelectArtwork,
}: StreamGalleryViewProps) {
  const [speed, setSpeed] = useState<number>(18);
  const [perspective, setPerspective] = useState<number>(30);
  const [cardsCount, setCardsCount] = useState<number>(10);
  const [fan] = useState<number>(3.3);

  // Convert artworks to StreamImage format
  const streamImages = artworks.map((art) => ({
    src: art.image,
    alt: art.title,
  }));

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive Controls Pill Bar */}
      <div className="w-full max-w-5xl px-4 py-3 my-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 bg-neutral-900/40 border border-neutral-800/80 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-white uppercase tracking-wider font-semibold">
            Corridor Projection Engine
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Speed Preset Buttons */}
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-[11px] text-neutral-400">VELOCITY:</span>
            {[
              { label: "Slow (28s)", val: 28 },
              { label: "Normal (18s)", val: 18 },
              { label: "Rush (10s)", val: 10 },
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setSpeed(p.val)}
                className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${
                  speed === p.val
                    ? "bg-violet-500/20 border-violet-500 text-violet-300 font-bold"
                    : "border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Perspective Angle */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-neutral-400">PROJECTION:</span>
            <input
              type="range"
              min="18"
              max="45"
              value={perspective}
              onChange={(e) => setPerspective(Number(e.target.value))}
              className="w-20 accent-violet-500 cursor-pointer"
            />
            <span className="text-[10px] text-neutral-400 w-5">{perspective}</span>
          </div>

          {/* Card Density */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-neutral-400">CARDS:</span>
            <button
              onClick={() => setCardsCount((c) => Math.max(6, c - 2))}
              className="px-1.5 py-0.2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
            >
              -
            </button>
            <span className="text-[11px] text-white w-4 text-center">{cardsCount}</span>
            <button
              onClick={() => setCardsCount((c) => Math.min(14, c + 2))}
              className="px-1.5 py-0.2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Main ImageStreamHero Instance */}
      <div className="w-full relative px-2 sm:px-6">
        <ImageStreamHero
          images={streamImages}
          cards={cardsCount}
          speed={speed}
          axis={50}
          path={{
            perspective: perspective,
            fan: fan,
            cardWidth: 19,
            cardHeight: 27,
          }}
          className="h-162.5 sm:h-187.5 w-full rounded-2xl border border-neutral-800/80 bg-neutral-950/90 shadow-[0_0_80px_rgba(0,0,0,0.9)]"
        >
          {/* Subtle Ambient Vignette & Text Overlay */}
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-10 sm:py-16 text-center pointer-events-none px-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-700/60 bg-neutral-950/80 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-300">
                  3D Continuous Perspective Corridor
                </span>
              </div>
              <h1 className="text-balance text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white font-sans uppercase">
                THE LIVING
                <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-neutral-100 via-neutral-300 to-neutral-500">
                  PERSPECTIVE
                </span>
              </h1>
            </div>

            <div className="max-w-md space-y-2 pointer-events-auto">
              <p className="text-xs sm:text-sm font-mono text-neutral-400">
                Two mirrored rails rush outward from infinity into screen space. Click any piece below to isolate and inspect archival details.
              </p>
            </div>
          </div>
        </ImageStreamHero>
      </div>

      {/* Rapid Archival Access Strip */}
      <div className="w-full max-w-6xl px-4 mt-10">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Stream Artifacts // Quick Focus
          </span>
          <span className="font-mono text-[11px] text-neutral-500">
            CLICK TO EXPAND METADATA
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {artworks.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArtwork(art)}
              className="group cursor-pointer rounded-lg overflow-hidden border border-neutral-800/80 bg-neutral-900/60 transition-all hover:scale-105 hover:border-neutral-500 hover:shadow-xl"
            >
              <div className="relative aspect-3/4 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[10px] font-mono text-white truncate flex items-center gap-1">
                    {art.title} <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
