import React, { useRef, useState, useEffect, useCallback } from "react";
import type { Artwork } from "@/data/artworks";
import {
  useCollisionFreeCanvas,
  type CanvasArtworkNode,
} from "@/hooks/useCollisionFreeCanvas";
import { ArtworkViewer } from "@/components/gallery/ArtworkViewer";
import LightRays from "@/components/ui/LightRays";
import { Plus, Minus, RotateCcw, Compass, ArrowUpRight } from "lucide-react";

interface InfiniteCanvasProps {
  artworks: Artwork[];
}

const MIN_ZOOM = 0.5; // Strictly bounded: artworks never become microscopic thumbnails
const MAX_ZOOM = 2.4; // High-detail inspection
const DEFAULT_ZOOM = 0.95; // Initial zoom: Centerpiece commands ~55% of screen height

export const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({ artworks }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { artworkNodes, destinations } = useCollisionFreeCanvas(artworks);

  // High-performance Transform Ref (direct hardware GPU updates without React re-renders)
  const transformRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 600,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 450,
    scale: typeof window !== "undefined" && window.innerWidth < 768 ? 0.65 : DEFAULT_ZOOM,
  });

  // UI state for zoom level percentage display
  const [zoomPercent, setZoomPercent] = useState<number>(() =>
    Math.round(
      (typeof window !== "undefined" && window.innerWidth < 768 ? 0.65 : DEFAULT_ZOOM) * 100
    )
  );

  // Frustum culling box in world coordinates
  const [cullBounds, setCullBounds] = useState({
    minX: -1800,
    maxX: 1800,
    minY: -1800,
    maxY: 1800,
  });

  // Destination tracker for guided Discover mode
  const [currentDestinationIdx, setCurrentDestinationIdx] = useState(0);

  // Fullscreen exhibition modal state
  const [focusedArtworkIndex, setFocusedArtworkIndex] = useState<number | null>(null);
  const focusedArtworkIndexRef = useRef<number | null>(null);

  useEffect(() => {
    focusedArtworkIndexRef.current = focusedArtworkIndex;
  }, [focusedArtworkIndex]);

  // Pointer drag & momentum physics
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const didMoveRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Mobile pinch zoom
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartScaleRef = useRef<number>(DEFAULT_ZOOM);

  // Direct GPU transform update on the stage container
  const applyTransform = useCallback(() => {
    if (!stageRef.current) return;
    const { x, y, scale } = transformRef.current;
    stageRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
  }, []);

  // Update frustum bounds for off-screen culling (zero overhead for offscreen artworks)
  const updateCulling = useCallback(() => {
    const { x, y, scale } = transformRef.current;
    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const winH = typeof window !== "undefined" ? window.innerHeight : 900;
    const padding = 800; // Generous padding prevents visual popping during fast panning

    setCullBounds({
      minX: -x / scale - padding,
      maxX: (winW - x) / scale + padding,
      minY: -y / scale - padding,
      maxY: (winH - y) / scale + padding,
    });
  }, []);

  // Set initial position
  useEffect(() => {
    applyTransform();
    updateCulling();
  }, [applyTransform, updateCulling]);

  // Smooth camera travel to specific world coordinate
  const smoothTravelTo = useCallback(
    (targetWorldX: number, targetWorldY: number, targetScale = DEFAULT_ZOOM) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const startX = transformRef.current.x;
      const startY = transformRef.current.y;
      const startScale = transformRef.current.scale;

      const targetX = winW / 2 - targetWorldX * targetScale;
      const targetY = winH / 2 - targetWorldY * targetScale;

      const duration = 750; // ms
      const startTime = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeOutCubic(progress);

        transformRef.current.x = startX + (targetX - startX) * ease;
        transformRef.current.y = startY + (targetY - startY) * ease;
        transformRef.current.scale = startScale + (targetScale - startScale) * ease;

        applyTransform();

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          setZoomPercent(Math.round(transformRef.current.scale * 100));
          updateCulling();
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [applyTransform, updateCulling]
  );

  // Momentum coasting after pointer drag release
  const startMomentum = useCallback(() => {
    const decay = 0.94;
    const step = () => {
      velocityRef.current.vx *= decay;
      velocityRef.current.vy *= decay;

      if (
        Math.abs(velocityRef.current.vx) > 0.15 ||
        Math.abs(velocityRef.current.vy) > 0.15
      ) {
        transformRef.current.x += velocityRef.current.vx;
        transformRef.current.y += velocityRef.current.vy;
        applyTransform();
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        velocityRef.current = { vx: 0, vy: 0 };
        updateCulling();
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(step);
  }, [applyTransform, updateCulling]);

  // Guided "Discover" Travel
  const handleDiscover = () => {
    const nextIdx = (currentDestinationIdx + 1) % destinations.length;
    setCurrentDestinationIdx(nextIdx);
    const target = destinations[nextIdx];
    smoothTravelTo(target.x, target.y, window.innerWidth < 768 ? 0.65 : DEFAULT_ZOOM);
  };

  // Reset to the initial centerpiece at (0, 0)
  const handleReset = () => {
    setCurrentDestinationIdx(0);
    smoothTravelTo(0, 0, window.innerWidth < 768 ? 0.65 : DEFAULT_ZOOM);
  };

  // Manual zoom buttons (+ / -)
  const handleZoom = (factor: number) => {
    const cur = transformRef.current;
    const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, cur.scale * factor));
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    const worldCenterX = (winW / 2 - cur.x) / cur.scale;
    const worldCenterY = (winH / 2 - cur.y) / cur.scale;

    cur.x = winW / 2 - worldCenterX * newScale;
    cur.y = winH / 2 - worldCenterY * newScale;
    cur.scale = newScale;

    applyTransform();
    setZoomPercent(Math.round(newScale * 100));
    updateCulling();
  };

  // Compute current screen bounding box for any artwork on canvas
  const getCanvasRect = useCallback(
    (index: number) => {
      const node = artworkNodes[index];
      if (!node) {
        return {
          left: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
          top: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
          width: 0,
          height: 0,
        };
      }
      const { x, y, scale } = transformRef.current;
      return {
        left: x + (node.x - node.width / 2) * scale,
        top: y + (node.y - node.height / 2) * scale,
        width: node.width * scale,
        height: node.height * scale,
      };
    },
    [artworkNodes]
  );

  // Smooth mouse wheel zoom anchored to pointer position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelDebounce: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (focusedArtworkIndexRef.current !== null) return; // Prevent zooming while artwork is expanded
      e.preventDefault();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      const cur = transformRef.current;
      const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, cur.scale * zoomFactor));

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const worldX = (mouseX - cur.x) / cur.scale;
      const worldY = (mouseY - cur.y) / cur.scale;

      cur.x = mouseX - worldX * newScale;
      cur.y = mouseY - worldY * newScale;
      cur.scale = newScale;

      applyTransform();

      if (wheelDebounce) clearTimeout(wheelDebounce);
      wheelDebounce = setTimeout(() => {
        setZoomPercent(Math.round(newScale * 100));
        updateCulling();
      }, 90);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (wheelDebounce) clearTimeout(wheelDebounce);
    };
  }, [applyTransform, updateCulling]);

  // Pointer drag events
  const onPointerDown = (e: React.PointerEvent) => {
    if (focusedArtworkIndex !== null) return;
    if ((e.target as HTMLElement).closest("button, a, header, nav")) return;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    isDraggingRef.current = true;
    didMoveRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { vx: 0, vy: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (focusedArtworkIndex !== null) return;
    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;

    if (
      Math.abs(e.clientX - dragStartRef.current.x) > 8 ||
      Math.abs(e.clientY - dragStartRef.current.y) > 8
    ) {
      didMoveRef.current = true;
    }

    velocityRef.current = {
      vx: dx * 0.86,
      vy: dy * 0.86,
    };

    lastPosRef.current = { x: e.clientX, y: e.clientY };

    transformRef.current.x += dx;
    transformRef.current.y += dy;

    applyTransform();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (focusedArtworkIndex !== null) return;
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Released
    }

    // If pointer was released without dragging, check if an artwork was tapped/clicked
    if (!didMoveRef.current) {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const clickedImg = target?.closest("img");
      if (clickedImg) {
        const id = clickedImg.getAttribute("data-artwork-id");
        if (id) {
          const idx = artworkNodes.findIndex((n) => n.id === id);
          if (idx !== -1) {
            setFocusedArtworkIndex(idx);
            return;
          }
        }
      }
    }

    startMomentum();
  };

  // Mobile pinch to zoom
  const onTouchStart = (e: React.TouchEvent) => {
    if (focusedArtworkIndex !== null) return;
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchStartDistRef.current = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchStartScaleRef.current = transformRef.current.scale;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (focusedArtworkIndex !== null) return;
    if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const ratio = dist / pinchStartDistRef.current;
      const targetScale = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, pinchStartScaleRef.current * ratio)
      );

      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;
      const cur = transformRef.current;

      const worldX = (midX - cur.x) / cur.scale;
      const worldY = (midY - cur.y) / cur.scale;

      cur.x = midX - worldX * targetScale;
      cur.y = midY - worldY * targetScale;
      cur.scale = targetScale;

      applyTransform();
    }
  };

  const onTouchEnd = () => {
    if (focusedArtworkIndex !== null) return;
    if (pinchStartDistRef.current !== null) {
      pinchStartDistRef.current = null;
      setZoomPercent(Math.round(transformRef.current.scale * 100));
      updateCulling();
    }
  };

  // Clicking an artwork: expand directly into distraction-free fullscreen viewer (preserves canvas position & zoom)
  const handleArtworkClick = (_node: CanvasArtworkNode, originalIndex: number) => {
    if (didMoveRef.current) return; // Prevent triggering click upon drag release
    setFocusedArtworkIndex(originalIndex);
  };

  return (
    <main
      ref={containerRef}
      role="main"
      aria-label="Shubham Kumawat (Shubhamgoatfr) graphic design exhibition"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative w-screen h-screen overflow-hidden bg-[#090909] select-none cursor-grab active:cursor-grabbing touch-none"
    >
      {/* ── Accessible Portfolio Landmark for Screen Readers & Search Crawlers ── */}
      <section className="sr-only" aria-label="Portfolio overview">
        <h2>Graphic Design Portfolio &amp; Interactive Exhibition</h2>
        <p>
          Portfolio of Shubham Kumawat (Shubhamgoatfr), graphic designer based in Ahmedabad, Gujarat, India.
          Specializing in cover art, poster design, music artwork, and creative digital compositions.
          Explore this interactive infinite-canvas exhibition showcasing 144 curated visual designs.
        </p>
      </section>

      {/* ── Minimalist Editorial Header ── */}
      <header
        aria-hidden={focusedArtworkIndex !== null}
        className={`fixed top-0 inset-x-0 z-40 px-6 sm:px-8 py-5 flex items-center justify-between pointer-events-none select-none transition-opacity duration-300 ${
          focusedArtworkIndex !== null ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="pointer-events-auto flex items-baseline gap-2">
          <h1 className="font-sans text-sm sm:text-base tracking-[0.2em] uppercase font-semibold text-neutral-100">
            Shubham Kumawat
          </h1>
          <span className="font-mono text-[10px] tracking-widest text-neutral-500 hidden sm:inline">
            // SHUBHAMGOATFR
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-4 font-mono text-[11px] tracking-wider text-neutral-500">
          <span className="hidden sm:inline">{artworks.length} WORKS</span>
          <a
            href="https://pinterest.com/shubhamgoatfr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-0.5"
          >
            <span>PINTEREST</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-500" />
          </a>
        </div>
      </header>

      {/* ── Compact Navigation & Zoom Dock (Bottom Right) ── */}
      <nav
        aria-label="Exhibition controls"
        aria-hidden={focusedArtworkIndex !== null}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[#111111]/90 backdrop-blur-md border border-white/6 shadow-2xl transition-opacity duration-300 ${
          focusedArtworkIndex !== null
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        } select-none`}
      >
        <button
          onClick={handleDiscover}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-neutral-300 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
          title="Travel to next composition"
        >
          <Compass className="w-3.5 h-3.5 text-neutral-400" />
          <span className="hidden sm:inline">DISCOVER</span>
        </button>

        <div className="w-px h-4 bg-white/8" />

        <button
          onClick={() => handleZoom(0.85)}
          className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/8 transition-colors cursor-pointer"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="font-mono text-[10px] text-neutral-500 w-10 text-center tracking-wider">
          {zoomPercent}%
        </span>

        <button
          onClick={() => handleZoom(1.18)}
          className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/8 transition-colors cursor-pointer"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-white/8" />

        <button
          onClick={handleReset}
          className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/8 transition-colors cursor-pointer"
          title="Reset to Centerpiece"
          aria-label="Reset view"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* ── Atmospheric Exhibition Lighting (React Bits LightRays) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700"
        style={{
          opacity: focusedArtworkIndex !== null ? 0 : 0.45,
        }}
        aria-hidden="true"
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.35}
          lightSpread={0.85}
          intensity={0.5}
          glow={0.3}
          haze={0.2}
          followMouse={true}
          mouseInfluence={0.15}
          className="w-full h-full"
        />
      </div>

      {/* ── Atmospheric Exhibition Lighting (React Bits LightRays) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700"
        style={{
          opacity: focusedArtworkIndex !== null ? 0 : 0.45,
        }}
        aria-hidden="true"
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.35}
          lightSpread={0.85}
          intensity={0.5}
          glow={0.3}
          haze={0.2}
          followMouse={true}
          mouseInfluence={0.15}
          className="w-full h-full"
        />
      </div>

      {/* ── Single GPU-Accelerated Stage Transform ── */}
      <div
        ref={stageRef}
        aria-hidden={focusedArtworkIndex !== null}
        className={`absolute inset-0 origin-top-left will-change-transform ${
          focusedArtworkIndex !== null ? "pointer-events-none" : ""
        }`}
      >
        {/* Subtle Spatial Orientation Watermarks */}
        {destinations.map((d, idx) => (
          <div
            key={idx}
            className="absolute pointer-events-none select-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: d.x,
              top: d.y,
              width: 1400,
              height: 1400,
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[12px] tracking-[0.35em] uppercase text-neutral-800/60 whitespace-nowrap">
              {d.title}
            </div>
          </div>
        ))}

        {/* 
          144 Artworks Displayed Directly on Canvas:
          - NO black background containers
          - NO artificial padding or frames
          - Zero overlap (computed with strict clearance boundaries)
          - Natural pixel proportions matching each artwork's native aspect ratio
        */}
        {artworkNodes.map((node, index) => {
          // Viewport culling
          const isVisible =
            node.x + node.width / 2 >= cullBounds.minX &&
            node.x - node.width / 2 <= cullBounds.maxX &&
            node.y + node.height / 2 >= cullBounds.minY &&
            node.y - node.height / 2 <= cullBounds.maxY;

          if (!isVisible) return null;

          return (
            <img
              key={node.id}
              data-artwork-id={node.id}
              src={node.artwork.image}
              alt={`${node.artwork.title} — ${node.artwork.category} design by Shubham Kumawat (Shubhamgoatfr)`}
              width={Math.round(node.width)}
              height={Math.round(node.height)}
              tabIndex={focusedArtworkIndex !== null ? -1 : 0}
              role="button"
              aria-label={`View ${node.artwork.title} (${node.artwork.category})`}
              onClick={() => handleArtworkClick(node, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleArtworkClick(node, index);
                }
              }}
              loading={node.isCenterpiece || index < 10 ? "eager" : "lazy"}
              fetchPriority={node.isCenterpiece ? "high" : "auto"}
              decoding="async"
              className="absolute block object-contain cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.03] hover:z-30 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
              style={{
                left: node.x - node.width / 2,
                top: node.y - node.height / 2,
                width: node.width,
                height: node.height,
              }}
              draggable={false}
            />
          );
        })}
      </div>

      {/* ── Fullscreen Distraction-Free Artwork Viewer ── */}
      <ArtworkViewer
        nodes={artworkNodes}
        artworks={artworks}
        initialIndex={focusedArtworkIndex ?? 0}
        isOpen={focusedArtworkIndex !== null}
        onClose={() => setFocusedArtworkIndex(null)}
        getCanvasRect={getCanvasRect}
      />
    </main>
  );
};
