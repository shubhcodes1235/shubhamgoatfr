import React, { useRef, useState, useEffect, useCallback } from "react";
import type { Artwork } from "@/data/artworks";
import { useCollisionFreeCanvas } from "@/hooks/useCollisionFreeCanvas";
import LightRays from "@/components/ui/LightRays";
import { ArtworkFullscreenViewer } from "@/components/gallery/ArtworkFullscreenViewer";
import { ExhibitionMinimap } from "@/components/gallery/ExhibitionMinimap";
import {
  Plus,
  Minus,
  RotateCcw,
  Compass,
  ArrowUpRight,
  Play,
  Pause,
  Map as MapIcon,
} from "lucide-react";

interface InfiniteCanvasProps {
  artworks: Artwork[];
}

const MIN_ZOOM = 0.45; // Strictly bounded: artworks never become microscopic thumbnails
const MAX_ZOOM = 2.4; // High-detail inspection
const DEFAULT_ZOOM = 0.95; // Initial zoom: Centerpiece commands ~55% of screen height
const WORLD_CLAMP_X = 4200; // World boundary limits
const WORLD_CLAMP_Y = 3400;

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

  // Camera state for synchronized mini-map view
  const [cameraState, setCameraState] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 600,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 450,
    scale: typeof window !== "undefined" && window.innerWidth < 768 ? 0.65 : DEFAULT_ZOOM,
  }));

  // UI state for zoom level percentage display
  const [zoomPercent, setZoomPercent] = useState<number>(() =>
    Math.round(
      (typeof window !== "undefined" && window.innerWidth < 768 ? 0.65 : DEFAULT_ZOOM) * 100
    )
  );

  // Frustum culling box in world coordinates
  const [cullBounds, setCullBounds] = useState({
    minX: -2000,
    maxX: 2000,
    minY: -2000,
    maxY: 2000,
  });

  // Fullscreen artwork viewer index (null = closed)
  const [viewerActiveIndex, setViewerActiveIndex] = useState<number | null>(null);

  // Guided Exhibition Tour state
  const [isTourActive, setIsTourActive] = useState(false);

  // Mini-map visibility state (defaults open on desktop, collapsed on small screens)
  const [isMinimapOpen, setIsMinimapOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  // Smart Discover: tracks visit count & last visit time per sector
  const visitedSectorsRef = useRef<Map<number, { count: number; lastTime: number }>>(
    new Map([[0, { count: 1, lastTime: 0 }]])
  );

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

  // Update frustum bounds for off-screen culling and sync mini-map camera
  const updateCullingAndSync = useCallback(() => {
    const { x, y, scale } = transformRef.current;
    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const winH = typeof window !== "undefined" ? window.innerHeight : 900;
    const padding = 750; // Generous padding prevents visual popping during fast panning

    setCullBounds({
      minX: -x / scale - padding,
      maxX: (winW - x) / scale + padding,
      minY: -y / scale - padding,
      maxY: (winH - y) / scale + padding,
    });

    setCameraState({ x, y, scale });
  }, []);

  // Set initial position
  useEffect(() => {
    applyTransform();
    updateCullingAndSync();
  }, [applyTransform, updateCullingAndSync]);

  // Stop active tour on user interaction
  const stopTour = useCallback(() => {
    if (isTourActive) {
      setIsTourActive(false);
    }
  }, [isTourActive]);

  // Smooth camera travel to specific world coordinate
  const smoothTravelTo = useCallback(
    (
      targetWorldX: number,
      targetWorldY: number,
      targetScale = DEFAULT_ZOOM,
      customDuration = 750
    ) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const startX = transformRef.current.x;
      const startY = transformRef.current.y;
      const startScale = transformRef.current.scale;

      const targetX = winW / 2 - targetWorldX * targetScale;
      const targetY = winH / 2 - targetWorldY * targetScale;

      const startTime = performance.now();
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / customDuration, 1);
        const ease = easeInOutCubic(progress);

        transformRef.current.x = startX + (targetX - startX) * ease;
        transformRef.current.y = startY + (targetY - startY) * ease;
        transformRef.current.scale = startScale + (targetScale - startScale) * ease;

        applyTransform();

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          setZoomPercent(Math.round(transformRef.current.scale * 100));
          updateCullingAndSync();
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [applyTransform, updateCullingAndSync]
  );

  // Smooth relative panning for keyboard arrow navigation
  const panBy = useCallback(
    (dx: number, dy: number) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const startX = transformRef.current.x;
      const startY = transformRef.current.y;
      const targetX = startX + dx;
      const targetY = startY + dy;
      const duration = 240;
      const startTime = performance.now();
      const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeOutQuad(progress);

        transformRef.current.x = startX + (targetX - startX) * ease;
        transformRef.current.y = startY + (targetY - startY) * ease;

        applyTransform();

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          updateCullingAndSync();
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [applyTransform, updateCullingAndSync]
  );

  // Momentum coasting after pointer drag release with soft boundary resistance
  const startMomentum = useCallback(() => {
    const decay = 0.94;
    const step = () => {
      velocityRef.current.vx *= decay;
      velocityRef.current.vy *= decay;

      const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
      const winH = typeof window !== "undefined" ? window.innerHeight : 900;
      const cur = transformRef.current;
      const curWorldCenterX = (winW / 2 - cur.x) / cur.scale;
      const curWorldCenterY = (winH / 2 - cur.y) / cur.scale;

      // Soft boundary dampening
      if (Math.abs(curWorldCenterX) > WORLD_CLAMP_X) {
        velocityRef.current.vx *= 0.8;
      }
      if (Math.abs(curWorldCenterY) > WORLD_CLAMP_Y) {
        velocityRef.current.vy *= 0.8;
      }

      if (
        Math.abs(velocityRef.current.vx) > 0.15 ||
        Math.abs(velocityRef.current.vy) > 0.15
      ) {
        cur.x += velocityRef.current.vx;
        cur.y += velocityRef.current.vy;
        applyTransform();
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        velocityRef.current = { vx: 0, vy: 0 };
        updateCullingAndSync();
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(step);
  }, [applyTransform, updateCullingAndSync]);

  // Smart Discover: navigates intelligently to artwork clusters not explored recently
  const handleDiscover = useCallback(() => {
    stopTour();

    const cur = transformRef.current;
    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const winH = typeof window !== "undefined" ? window.innerHeight : 800;

    const curWorldX = (winW / 2 - cur.x) / cur.scale;
    const curWorldY = (winH / 2 - cur.y) / cur.scale;

    const visitedMap = visitedSectorsRef.current;
    const now = Date.now();

    // Find destinations outside current view area
    const candidates = destinations
      .map((dest, idx) => {
        const dist = Math.hypot(dest.x - curWorldX, dest.y - curWorldY);
        const stats = visitedMap.get(idx) || { count: 0, lastTime: 0 };
        return {
          idx,
          dest,
          dist,
          count: stats.count,
          lastTime: stats.lastTime,
        };
      })
      .filter((c) => c.dist > 750);

    const pool =
      candidates.length > 0
        ? candidates
        : destinations.map((dest, idx) => ({
            idx,
            dest,
            dist: Math.hypot(dest.x - curWorldX, dest.y - curWorldY),
            count: visitedMap.get(idx)?.count || 0,
            lastTime: visitedMap.get(idx)?.lastTime || 0,
          }));

    // Prioritize least-visited clusters, then oldest visited
    pool.sort((a, b) => {
      if (a.count !== b.count) return a.count - b.count;
      return a.lastTime - b.lastTime;
    });

    const chosen = pool[0];
    if (chosen) {
      visitedMap.set(chosen.idx, {
        count: chosen.count + 1,
        lastTime: now,
      });
      smoothTravelTo(
        chosen.dest.x,
        chosen.dest.y,
        window.innerWidth < 768 ? 0.65 : DEFAULT_ZOOM,
        950
      );
    }
  }, [destinations, smoothTravelTo, stopTour]);

  // Reset view to origin centerpiece
  const handleReset = useCallback(() => {
    stopTour();
    smoothTravelTo(0, 0, window.innerWidth < 768 ? 0.65 : DEFAULT_ZOOM, 800);
  }, [smoothTravelTo, stopTour]);

  // Guided Exhibition Tour toggle
  const toggleTour = useCallback(() => {
    setIsTourActive((prev) => !prev);
  }, []);

  // Tour automated smooth transition timer
  useEffect(() => {
    if (!isTourActive) return;

    // Sequence through prominent landmark clusters
    const tourWaypoints = [
      { x: 0, y: 0, scale: 0.95 },
      { x: 1450, y: -200, scale: 0.9 },
      { x: 1350, y: 1300, scale: 0.9 },
      { x: 0, y: 1450, scale: 0.9 },
      { x: -1400, y: 1300, scale: 0.9 },
      { x: -1450, y: -150, scale: 0.9 },
      { x: -1350, y: -1350, scale: 0.9 },
      { x: 0, y: -1500, scale: 0.9 },
      { x: 1350, y: -1350, scale: 0.9 },
    ];

    let currentWaypointIdx = 0;

    const interval = setInterval(() => {
      currentWaypointIdx = (currentWaypointIdx + 1) % tourWaypoints.length;
      const wp = tourWaypoints[currentWaypointIdx];
      smoothTravelTo(wp.x, wp.y, wp.scale, 1600);
    }, 6200);

    return () => clearInterval(interval);
  }, [isTourActive, smoothTravelTo]);

  // Manual zoom buttons (+ / -)
  const handleZoom = useCallback(
    (factor: number) => {
      stopTour();
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
      updateCullingAndSync();
    },
    [applyTransform, updateCullingAndSync, stopTour]
  );

  // Smooth mouse wheel zoom anchored to cursor coordinates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelDebounce: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (viewerActiveIndex !== null) return;
      e.preventDefault();
      stopTour();

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const zoomFactor = e.deltaY < 0 ? 1.09 : 0.91;
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
        updateCullingAndSync();
      }, 70);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (wheelDebounce) clearTimeout(wheelDebounce);
    };
  }, [applyTransform, updateCullingAndSync, viewerActiveIndex, stopTour]);

  // Keyboard navigation for movement, zooming, resetting, and features
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement)?.tagName === "INPUT" ||
        (e.target as HTMLElement)?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (viewerActiveIndex !== null) return; // Handled in modal

      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        stopTour();
        panBy(0, 240);
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        stopTour();
        panBy(0, -240);
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        stopTour();
        panBy(240, 0);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stopTour();
        panBy(-240, 0);
      } else if (e.key === "+" || e.key === "=" || e.key === "]") {
        e.preventDefault();
        handleZoom(1.18);
      } else if (e.key === "-" || e.key === "_" || e.key === "[") {
        e.preventDefault();
        handleZoom(0.85);
      } else if (e.key === "0" || e.key === "r" || e.key === "R") {
        e.preventDefault();
        handleReset();
      } else if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        handleDiscover();
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleTour();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setIsMinimapOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        stopTour();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    viewerActiveIndex,
    handleZoom,
    handleReset,
    handleDiscover,
    toggleTour,
    stopTour,
    panBy,
  ]);

  // Pointer drag events with boundary resistance
  const onPointerDown = (e: React.PointerEvent) => {
    if (viewerActiveIndex !== null) return;
    if ((e.target as HTMLElement).closest("button, a, header, nav, [role='dialog'], [role='region']")) {
      return;
    }

    stopTour();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    isDraggingRef.current = true;
    didMoveRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { vx: 0, vy: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (viewerActiveIndex !== null || !isDraggingRef.current) return;

    let dx = e.clientX - lastPosRef.current.x;
    let dy = e.clientY - lastPosRef.current.y;

    // Disambiguate drag vs tap (6px movement threshold)
    if (
      Math.abs(e.clientX - dragStartRef.current.x) > 6 ||
      Math.abs(e.clientY - dragStartRef.current.y) > 6
    ) {
      didMoveRef.current = true;
    }

    const cur = transformRef.current;
    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const winH = typeof window !== "undefined" ? window.innerHeight : 900;
    const curWorldCenterX = (winW / 2 - cur.x) / cur.scale;
    const curWorldCenterY = (winH / 2 - cur.y) / cur.scale;

    // Apply boundary resistance
    if (Math.abs(curWorldCenterX) > WORLD_CLAMP_X) dx *= 0.35;
    if (Math.abs(curWorldCenterY) > WORLD_CLAMP_Y) dy *= 0.35;

    velocityRef.current = {
      vx: dx * 0.86,
      vy: dy * 0.86,
    };

    lastPosRef.current = { x: e.clientX, y: e.clientY };
    cur.x += dx;
    cur.y += dy;

    applyTransform();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Released
    }

    startMomentum();
  };

  // Mobile pinch to zoom
  const onTouchStart = (e: React.TouchEvent) => {
    if (viewerActiveIndex !== null) return;
    stopTour();
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchStartDistRef.current = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchStartScaleRef.current = transformRef.current.scale;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (viewerActiveIndex !== null) return;
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
    if (viewerActiveIndex !== null) return;
    if (pinchStartDistRef.current !== null) {
      pinchStartDistRef.current = null;
      setZoomPercent(Math.round(transformRef.current.scale * 100));
      updateCullingAndSync();
    }
  };

  // Clicking an artwork opens the fullscreen image-only exhibition viewer
  const handleArtworkClick = (index: number) => {
    if (didMoveRef.current) return; // Prevent triggering if user was dragging
    stopTour();
    setViewerActiveIndex(index);
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
        aria-hidden={viewerActiveIndex !== null}
        className={`fixed top-0 inset-x-0 z-40 px-6 sm:px-8 py-5 flex items-center justify-between pointer-events-none select-none transition-opacity duration-300 ${
          viewerActiveIndex !== null ? "opacity-0" : "opacity-100"
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

      {/* ── Compact Navigation & Exhibition Dock (Bottom Right) ── */}
      <nav
        aria-label="Exhibition controls"
        aria-hidden={viewerActiveIndex !== null}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-[#111111]/90 backdrop-blur-md border border-white/8 shadow-2xl transition-opacity duration-300 ${
          viewerActiveIndex !== null
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        } select-none`}
      >
        <button
          onClick={handleDiscover}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-neutral-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Smart Discover: Explore unvisited cluster (D)"
        >
          <Compass className="w-3.5 h-3.5 text-neutral-400" />
          <span className="hidden sm:inline">DISCOVER</span>
        </button>

        <button
          onClick={toggleTour}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
            isTourActive
              ? "bg-white/15 text-white font-medium"
              : "text-neutral-300 hover:text-white hover:bg-white/10"
          }`}
          title={isTourActive ? "Pause guided tour (T)" : "Start guided tour (T)"}
        >
          {isTourActive ? (
            <>
              <Pause className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden sm:inline">PAUSE TOUR</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">TOUR</span>
            </>
          )}
        </button>

        <div className="w-px h-4 bg-white/10" />

        <button
          onClick={() => setIsMinimapOpen((prev) => !prev)}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isMinimapOpen
              ? "bg-white/15 text-white"
              : "text-neutral-400 hover:text-white hover:bg-white/10"
          }`}
          title={isMinimapOpen ? "Hide mini-map (M)" : "Show mini-map (M)"}
          aria-label="Toggle mini-map"
        >
          <MapIcon className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-white/10" />

        <button
          onClick={() => handleZoom(0.85)}
          className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          title="Zoom Out (-)"
          aria-label="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="font-mono text-[10px] text-neutral-500 w-10 text-center tracking-wider">
          {zoomPercent}%
        </span>

        <button
          onClick={() => handleZoom(1.18)}
          className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          title="Zoom In (+)"
          aria-label="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-white/10" />

        <button
          onClick={handleReset}
          className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          title="Reset to Centerpiece (0 / R)"
          aria-label="Reset view"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* ── Interactive Exhibition Mini-Map (Bottom Left) ── */}
      <div
        aria-hidden={viewerActiveIndex !== null}
        className={`transition-opacity duration-300 ${
          viewerActiveIndex !== null ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        <ExhibitionMinimap
          nodes={artworkNodes}
          camera={cameraState}
          isOpen={isMinimapOpen}
          onToggle={() => setIsMinimapOpen((prev) => !prev)}
          onNavigate={(targetWX, targetWY) => {
            stopTour();
            smoothTravelTo(targetWX, targetWY, transformRef.current.scale, 650);
          }}
        />
      </div>

      {/* ── Atmospheric Exhibition Lighting (React Bits LightRays) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500"
        style={{ opacity: viewerActiveIndex !== null ? 0 : 0.45 }}
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
        aria-hidden={viewerActiveIndex !== null}
        className={`absolute inset-0 origin-top-left will-change-transform ${
          viewerActiveIndex !== null ? "pointer-events-none" : ""
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[12px] tracking-[0.35em] uppercase text-neutral-800/40 whitespace-nowrap">
              {d.title}
            </div>
          </div>
        ))}

        {/* 
          144 Artworks Displayed Directly on Canvas:
          - Natural pixel proportions matching native aspect ratio
          - Zero overlap with balanced clearances
          - High-performance frustum culling
          - Smooth enter/exit transition
          - Responsive hover depth with elevation
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
              alt=""
              width={Math.round(node.width)}
              height={Math.round(node.height)}
              tabIndex={viewerActiveIndex !== null ? -1 : 0}
              role="button"
              aria-label={`View artwork ${node.id}`}
              onClick={() => handleArtworkClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleArtworkClick(index);
                }
              }}
              loading={node.isCenterpiece || index < 12 ? "eager" : "lazy"}
              fetchPriority={node.isCenterpiece ? "high" : "auto"}
              decoding="async"
              className="absolute block object-contain cursor-pointer transition-[transform,box-shadow,opacity] duration-300 ease-out hover:scale-[1.03] hover:z-30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909] animate-fadeIn"
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

      {/* ── Distraction-Free Fullscreen Image-Only Viewer ── */}
      <ArtworkFullscreenViewer
        nodes={artworkNodes}
        activeIndex={viewerActiveIndex}
        onClose={() => setViewerActiveIndex(null)}
        onNavigate={(newIndex) => setViewerActiveIndex(newIndex)}
      />
    </main>
  );
};
