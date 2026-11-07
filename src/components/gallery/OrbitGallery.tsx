import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { Artwork } from "@/data/artworks";
import { Disc3, Play, Pause, ChevronLeft, ChevronRight, Layers, Maximize2, Compass } from "lucide-react";

interface OrbitGalleryProps {
  artworks: Artwork[];
  onSelectArtwork?: (art: Artwork) => void;
  onFocusedArtworkChange?: (art: Artwork | null) => void;
}

export function OrbitGallery({
  artworks,
  onSelectArtwork,
  onFocusedArtworkChange,
}: OrbitGalleryProps) {
  const [rotation, setRotation] = useState<number>(0);
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true);
  const [spinSpeed, setSpinSpeed] = useState<number>(1); // 1x or 2x
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [ringPage, setRingPage] = useState<number>(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);
  const reqIdRef = useRef<number | null>(null);

  const PAGE_SIZE = 16;
  const totalRings = Math.max(1, Math.ceil(artworks.length / PAGE_SIZE));

  const activeArtworks = useMemo(() => {
    if (artworks.length <= PAGE_SIZE) return artworks;
    const start = ringPage * PAGE_SIZE;
    return artworks.slice(start, start + PAGE_SIZE);
  }, [artworks, ringPage]);

  const count = Math.max(activeArtworks.length, 1);
  const radius = Math.max(560, Math.min(800, Math.round((count * 280) / (2 * Math.PI))));
  const angleStep = 360 / count;

  // Sync ref
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Determine which card is directly facing the camera
  const focusedIndex = useMemo(() => {
    if (count === 0) return 0;
    const norm = ((-rotation % 360) + 360) % 360;
    const idx = Math.round(norm / angleStep) % count;
    return idx >= 0 ? idx : 0;
  }, [rotation, angleStep, count]);

  const focusedArtwork = activeArtworks[focusedIndex] || null;

  useEffect(() => {
    onFocusedArtworkChange?.(focusedArtwork);
  }, [focusedArtwork, onFocusedArtworkChange]);

  // Smooth kinetic rotation loop with velocity friction damping
  useEffect(() => {
    let lastTime = performance.now();
    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isDragging) {
        // Apply inertia velocity
        if (Math.abs(velocityRef.current) > 0.05) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= 0.93; // friction damping
          setRotation(rotationRef.current);
        } else if (isAutoSpin) {
          // Auto spin mode
          rotationRef.current = (rotationRef.current + delta * 14 * spinSpeed) % 360;
          setRotation(rotationRef.current);
        }
      }

      reqIdRef.current = requestAnimationFrame(loop);
    };
    reqIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [isAutoSpin, isDragging, spinSpeed]);

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = -deltaX * 0.45;
    rotationRef.current -= deltaX * 0.35;
    setRotation(rotationRef.current);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.key === "ArrowLeft") {
        setRotation((r) => r + 25);
      } else if (e.key === "ArrowRight") {
        setRotation((r) => r - 25);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoSpin((prev) => !prev);
      } else if (e.key === "Enter" && focusedArtwork) {
        onSelectArtwork?.(focusedArtwork);
      }
    },
    [focusedArtwork, onSelectArtwork]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const normalizedDegree = Math.round(((rotation % 360) + 360) % 360);

  return (
    <div className="w-full flex flex-col items-center select-none overflow-hidden pb-12">
      {/* Master Control Deck Header */}
      <div className="w-full max-w-5xl px-4 my-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-3 backdrop-blur-xl shadow-lg">
        {/* Left: Mode & Rotary HUD */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Disc3 className={`w-4 h-4 text-violet-400 ${isAutoSpin ? "animate-spin" : ""}`} />
            <span className="text-white font-semibold uppercase tracking-wider hidden sm:inline">
              Circular Orbit 360°
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/80 border border-neutral-800/80 text-[11px] text-neutral-300">
            <Compass className="w-3 h-3 text-violet-400" />
            <span>{normalizedDegree}° ROTARY</span>
          </div>
        </div>

        {/* Center: Ring Pagination & Direct Jump Dots */}
        {totalRings > 1 && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/80 font-mono text-[11px]">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <button
              onClick={() => setRingPage((p) => Math.max(0, p - 1))}
              disabled={ringPage === 0}
              className="p-1 text-neutral-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              title="Previous Ring"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="text-neutral-200 px-1 whitespace-nowrap">
              RING {ringPage + 1} OF {totalRings}
            </span>

            {/* Quick jump dots for rings */}
            <div className="hidden md:flex items-center gap-1 px-1">
              {Array.from({ length: totalRings }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRingPage(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    ringPage === i
                      ? "w-4 bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]"
                      : "w-1.5 bg-neutral-700 hover:bg-neutral-500"
                  }`}
                  title={`Jump to Ring ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setRingPage((p) => Math.min(totalRings - 1, p + 1))}
              disabled={ringPage === totalRings - 1}
              className="p-1 text-neutral-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              title="Next Ring"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right: Spin, Speed, and Manual Step Buttons */}
        <div className="flex items-center gap-2">
          {/* Step buttons */}
          <button
            onClick={() => setRotation((r) => r + 30)}
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
            title="Rotate Left (ArrowLeft)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Auto spin toggle */}
          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] transition-all cursor-pointer ${
              isAutoSpin
                ? "bg-violet-500/20 border-violet-500 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                : "border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800 text-neutral-400"
            }`}
            title="Toggle Auto Spin (Space)"
          >
            {isAutoSpin ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoSpin ? "PAUSE" : "SPIN"}</span>
          </button>

          {/* Speed multiplier (1x / 2x) */}
          {isAutoSpin && (
            <button
              onClick={() => setSpinSpeed((s) => (s === 1 ? 2 : 1))}
              className="px-2 py-1 rounded-md border border-neutral-800 bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 text-[10px] font-mono tracking-wider transition-colors"
              title="Change spin speed"
            >
              {spinSpeed}X
            </button>
          )}

          <button
            onClick={() => setRotation((r) => r - 30)}
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
            title="Rotate Right (ArrowRight)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtle Hint Ticker */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-500 mb-4 tracking-widest uppercase">
        <span>DRAG TO ROTATE // MOMENTUM PHYSICS</span>
        <span className="hidden sm:inline text-neutral-700">•</span>
        <span className="hidden sm:inline">[← / →] NUDGE</span>
        <span className="hidden sm:inline text-neutral-700">•</span>
        <span className="hidden sm:inline">[SPACE] TOGGLE</span>
        <span className="hidden sm:inline text-neutral-700">•</span>
        <span className="hidden sm:inline">[ENTER] ZOOM</span>
      </div>

      {/* 3D Orbit Carousel Chamber */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full max-w-6xl h-155 sm:h-180 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        style={{ perspective: "1350px" }}
      >
        {/* Floor Glow Reflection Ring */}
        <div className="orbit-ground-glow" />

        {/* 3D Pivot Cylinder */}
        <div
          className="relative w-72 h-100 preserve-3d transition-transform duration-75 ease-out"
          style={{
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {activeArtworks.map((art, index) => {
            const cardAngle = index * angleStep;
            const netAngle = ((cardAngle + rotation) % 360 + 360) % 360;
            const isFacingFront = netAngle < 75 || netAngle > 285;
            const isCenterFocus = netAngle < 25 || netAngle > 335;
            const isHovered = hoveredCardId === art.id;

            // Opacity and blur based on angle depth
            const opacity = isFacingFront ? 1 : 0.28;

            return (
              <div
                key={art.id}
                onMouseEnter={() => setHoveredCardId(art.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => onSelectArtwork?.(art)}
                className="absolute inset-0 preserve-3d group cursor-pointer"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  opacity: opacity,
                  transition: "opacity 0.35s ease, filter 0.35s ease",
                }}
              >
                {/* 3D Orbiting Pure Artwork Card with Bevel & Lighting */}
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900 card-beveled transition-all duration-300 ${
                    isCenterFocus
                      ? "ring-2 ring-violet-500/70 shadow-[0_30px_70px_rgba(139,92,246,0.3)] scale-[1.02]"
                      : isHovered
                      ? "ring-2 ring-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.9)] scale-[1.03]"
                      : "hover:scale-[1.02]"
                  }`}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    draggable={false}
                    loading="lazy"
                  />

                  {/* High-end glass reflection layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-white/5 pointer-events-none" />

                  {/* Hover info badge */}
                  <div
                    className={`absolute inset-x-3 bottom-3 p-2.5 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-white/10 transition-all duration-300 flex flex-col gap-1 ${
                      isHovered || isCenterFocus ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-violet-300">
                        {art.category}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-400">
                        #{index + 1 + ringPage * PAGE_SIZE}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-white truncate">
                      {art.title}
                    </span>
                  </div>

                  {/* Edge Ring */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Focus HUD: Displays the piece directly facing the viewer */}
      {focusedArtwork && (
        <div className="w-full max-w-xl mx-auto px-4 mt-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3 overflow-hidden pr-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: focusedArtwork.palette[1] || "#8b5cf6",
                  boxShadow: `0 0 10px ${focusedArtwork.palette[1] || "#8b5cf6"}`,
                }}
              />
              <div className="flex flex-col truncate">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold truncate">
                    {focusedArtwork.title}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 shrink-0">
                    {focusedArtwork.category}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">
                  PRESS ENTER OR CLICK TO INSPECT
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectArtwork?.(focusedArtwork)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-mono text-xs font-semibold shrink-0 transition-transform active:scale-95 shadow-md cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>INSPECT</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
