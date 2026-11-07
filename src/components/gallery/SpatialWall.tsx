import { useState } from "react";
import type { Artwork } from "@/data/artworks";
import { Compass, Eye, Sparkles } from "lucide-react";
import { ambientSound } from "@/lib/sound";

interface SpatialWallProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export function SpatialWall({
  artworks,
  onSelectArtwork,
}: SpatialWallProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Architectural asymmetric grid definitions with curated scale, rotation and depth
  const wallLayout = [
    { span: "col-span-12 md:col-span-7", aspect: "aspect-16/10", z: 40, rot: -1.2, scale: "1.0", offset: "mt-0" },
    { span: "col-span-12 md:col-span-5", aspect: "aspect-3/4", z: -20, rot: 1.8, scale: "0.95", offset: "mt-8 md:mt-24" },
    { span: "col-span-12 md:col-span-4", aspect: "aspect-4/5", z: 30, rot: 2.1, scale: "0.98", offset: "mt-4 md:-mt-12" },
    { span: "col-span-12 md:col-span-4", aspect: "aspect-square", z: -40, rot: -0.8, scale: "0.92", offset: "mt-6 md:mt-16" },
    { span: "col-span-12 md:col-span-4", aspect: "aspect-3/5", z: 50, rot: -2.4, scale: "1.02", offset: "mt-2 md:-mt-6" },
    { span: "col-span-12 md:col-span-8", aspect: "aspect-16/9", z: 10, rot: 0.6, scale: "1.0", offset: "mt-8" },
    { span: "col-span-12 md:col-span-4", aspect: "aspect-3/4", z: -30, rot: 1.5, scale: "0.94", offset: "mt-4 md:mt-14" },
    { span: "col-span-12 md:col-span-5", aspect: "aspect-4/5", z: 35, rot: -1.6, scale: "0.97", offset: "mt-6 md:-mt-8" },
    { span: "col-span-12 md:col-span-7", aspect: "aspect-16/10", z: 45, rot: 1.1, scale: "1.01", offset: "mt-2 md:mt-10" },
    { span: "col-span-12 md:col-span-6", aspect: "aspect-3/4", z: -10, rot: -0.9, scale: "0.96", offset: "mt-8" },
    { span: "col-span-12 md:col-span-6", aspect: "aspect-4/5", z: 25, rot: 1.7, scale: "0.99", offset: "mt-4 md:mt-16" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Intro strip */}
      <div className="max-w-4xl text-center my-6 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 mb-3">
          <Compass className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            System 03 // Curated Architectural Wall
          </span>
        </div>
        <p className="text-xs font-mono text-neutral-500">
          Asymmetric rhythm across a monumental invisible wall. Negative space, overlapping geometries, and focal anchors.
        </p>
      </div>

      {/* Monumental Wall Container */}
      <div className="w-full max-w-7xl px-4 sm:px-8 py-8">
        <div className="grid grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start">
          {artworks.map((art, index) => {
            const layout = wallLayout[index % wallLayout.length];
            const isHovered = hoveredId === art.id;

            return (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArtwork(art);
                  ambientSound.playHoverTone();
                }}
                onMouseEnter={() => setHoveredId(art.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`${layout.span} ${layout.offset} cursor-pointer group relative transition-all duration-500`}
                style={{
                  transform: `translateZ(${isHovered ? layout.z + 50 : layout.z}px) rotate(${isHovered ? 0 : layout.rot}deg)`,
                  zIndex: isHovered ? 40 : Math.round(layout.z + 50),
                }}
              >
                {/* Architectural frame card */}
                <div
                  className={`relative w-full ${layout.aspect} rounded-xl overflow-hidden border transition-all duration-500 ${
                    isHovered
                      ? "border-neutral-300 shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
                      : "border-neutral-800/80 bg-neutral-900/60 shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
                  }`}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Ambient Curatorial Watermark */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-neutral-950/70 border border-neutral-800 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] text-neutral-300">
                      SEC // {index + 1}
                    </span>
                  </div>

                  {/* Curated Hover Information Veil */}
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-950/90 via-neutral-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <div className="flex items-center gap-1.5 mb-1 text-violet-400">
                      <Sparkles className="w-3 h-3" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">
                        {art.category}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-sans uppercase">
                      {art.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800 text-[10px] font-mono text-neutral-400">
                      <span>EXPLORE ARCHIVE</span>
                      <Eye className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Minimalist Gallery Placard below artwork */}
                <div className="mt-2.5 px-1 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="truncate max-w-50 text-neutral-400 font-sans uppercase">
                    {art.title}
                  </span>
                  <span className="text-[10px]">[{art.date}]</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
