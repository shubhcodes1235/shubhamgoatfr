import { useState, useRef, useEffect } from "react";
import type { Artwork } from "@/data/artworks";
import { Sparkles } from "lucide-react";
import { ambientSound } from "@/lib/sound";

interface FloatingGalleryProps {
  artworks: Artwork[];
}

export function FloatingGallery({
  artworks,
}: FloatingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalized between -1 and 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (el) el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Spatial coordinates for floating nodes across 3D space
  const floatingConfigs = [
    { z: 120, xOffset: -38, yOffset: -32, rotZ: -3, scale: 1.05 },
    { z: -140, xOffset: 34, yOffset: -38, rotZ: 2, scale: 0.85 },
    { z: 60, xOffset: -8, yOffset: -18, rotZ: 1, scale: 1.0 },
    { z: -40, xOffset: -42, yOffset: 12, rotZ: -2, scale: 0.9 },
    { z: 180, xOffset: 16, yOffset: 8, rotZ: 3, scale: 1.1 },
    { z: -180, xOffset: 46, yOffset: 18, rotZ: -4, scale: 0.8 },
    { z: 40, xOffset: -22, yOffset: 42, rotZ: 2, scale: 0.95 },
    { z: -80, xOffset: 26, yOffset: 46, rotZ: -1, scale: 0.88 },
    { z: 100, xOffset: -45, yOffset: 68, rotZ: -3, scale: 1.02 },
    { z: -120, xOffset: 5, yOffset: 72, rotZ: 4, scale: 0.86 },
    { z: 150, xOffset: 42, yOffset: 78, rotZ: -2, scale: 1.08 },
    { z: -60, xOffset: -28, yOffset: 105, rotZ: 1, scale: 0.92 },
    { z: 80, xOffset: 18, yOffset: 110, rotZ: -3, scale: 1.0 },
    { z: -100, xOffset: -12, yOffset: 135, rotZ: 2, scale: 0.89 },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Sub-header instruction */}
      <div className="max-w-4xl text-center my-6 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            Floating 3D Spatial Field
          </span>
        </div>
        <p className="text-xs font-mono text-neutral-500">
          Move your cursor to warp spatial parallax. Works react in real-time with multi-layered depth separation.
        </p>
      </div>

      {/* 3D Floating Field Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl min-h-350 overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950/40 perspective-1000 p-8 select-none"
        style={{ perspective: "1200px" }}
      >
        {/* Dynamic Light flare responding to mouse */}
        <div
          className="absolute w-150 h-150 rounded-full pointer-events-none opacity-15 blur-[120px] transition-transform duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, #3b82f6 40%, transparent 70%)",
            left: `${(mousePos.x + 1) * 50}%`,
            top: `${(mousePos.y + 1) * 50}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {artworks.map((art, index) => {
          const cfg = floatingConfigs[index % floatingConfigs.length];
          const isHovered = hoveredId === art.id;

          // Parallax depth multiplier: objects closer to camera (higher z) move faster
          const depthFactor = (cfg.z + 250) / 300;
          const shiftX = mousePos.x * 35 * depthFactor;
          const shiftY = mousePos.y * 35 * depthFactor;
          const rotX = -mousePos.y * 12;
          const rotY = mousePos.x * 12;

          return (
            <div
              key={art.id}
              onMouseEnter={() => {
                setHoveredId(art.id);
                ambientSound.playHoverTone();
              }}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute transition-all duration-300 ease-out group"
              style={{
                left: `calc(50% + ${cfg.xOffset}%)`,
                top: `${(index / artworks.length) * 1100 + 80}px`,
                transform: `translate3d(${shiftX}px, ${shiftY}px, ${isHovered ? cfg.z + 80 : cfg.z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${cfg.rotZ}deg) scale(${isHovered ? cfg.scale * 1.08 : cfg.scale})`,
                zIndex: Math.round(cfg.z + 500),
                transformStyle: "preserve-3d",
              }}
            >
              {/* Pure Artwork Floating Surface - No title, No metadata */}
              <div
                className={`relative w-64 sm:w-72 md:w-80 aspect-3/4 rounded-2xl overflow-hidden border transition-all duration-500 ${
                  isHovered
                    ? "border-violet-500/80 shadow-[0_30px_70px_rgba(139,92,246,0.4)] ring-1 ring-violet-500/50"
                    : "border-neutral-800/80 bg-neutral-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                }`}
              >
                <img
                  src={art.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Physical glass sheen reflection */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
