import React, { useRef, useCallback } from "react";
import type { CanvasArtworkNode } from "@/hooks/useCollisionFreeCanvas";

export interface ExhibitionMinimapProps {
  nodes: CanvasArtworkNode[];
  camera: { x: number; y: number; scale: number };
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (worldX: number, worldY: number) => void;
}

// Fixed world bounds containing all 144 artworks with comfortable margins
const WORLD_BOUNDS = {
  minX: -3800,
  maxX: 3800,
  minY: -3000,
  maxY: 2800,
};

const MAP_WIDTH = 190;
const MAP_HEIGHT = 145;

const worldW = WORLD_BOUNDS.maxX - WORLD_BOUNDS.minX;
const worldH = WORLD_BOUNDS.maxY - WORLD_BOUNDS.minY;

const toMapX = (wx: number) => ((wx - WORLD_BOUNDS.minX) / worldW) * MAP_WIDTH;
const toMapY = (wy: number) => ((wy - WORLD_BOUNDS.minY) / worldH) * MAP_HEIGHT;

const toWorldX = (mx: number) => (mx / MAP_WIDTH) * worldW + WORLD_BOUNDS.minX;
const toWorldY = (my: number) => (my / MAP_HEIGHT) * worldH + WORLD_BOUNDS.minY;

export const ExhibitionMinimap: React.FC<ExhibitionMinimapProps> = ({
  nodes,
  camera,
  isOpen,
  onNavigate,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Compute current visible viewport frustum in world coordinates
  const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
  const winH = typeof window !== "undefined" ? window.innerHeight : 800;

  const viewWorldLeft = -camera.x / camera.scale;
  const viewWorldTop = -camera.y / camera.scale;
  const viewWorldRight = (winW - camera.x) / camera.scale;
  const viewWorldBottom = (winH - camera.y) / camera.scale;

  const frustumX = Math.max(0, Math.min(MAP_WIDTH, toMapX(viewWorldLeft)));
  const frustumY = Math.max(0, Math.min(MAP_HEIGHT, toMapY(viewWorldTop)));
  const frustumW = Math.max(
    6,
    Math.min(MAP_WIDTH - frustumX, toMapX(viewWorldRight) - frustumX)
  );
  const frustumH = Math.max(
    6,
    Math.min(MAP_HEIGHT - frustumY, toMapY(viewWorldBottom) - frustumY)
  );

  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = mapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const targetWX = toWorldX(clickX);
      const targetWY = toWorldY(clickY);
      onNavigate(targetWX, targetWY);
    },
    [onNavigate]
  );

  if (!isOpen) return null;

  return (
    <div
      ref={mapRef}
      onClick={handleMapClick}
      title="Click anywhere to pan camera"
      aria-label="Exhibition mini-map"
      role="region"
      className="fixed bottom-6 left-6 z-40 p-2 rounded-xl bg-[#111111]/90 backdrop-blur-md border border-white/8 shadow-2xl cursor-crosshair select-none transition-all duration-200 hover:border-white/20 animate-fadeIn"
      style={{ width: MAP_WIDTH + 16, height: MAP_HEIGHT + 24 }}
    >
      <div className="flex items-center justify-between pb-1.5 px-0.5 text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
        <span>MINI-MAP</span>
        <span className="text-[8px] text-neutral-600 font-sans">CLICK TO JUMP</span>
      </div>

      <div
        className="relative overflow-hidden rounded bg-[#070707] border border-white/5"
        style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
      >
        {/* Origin Reticle */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: toMapX(0),
            top: toMapY(0),
          }}
        />

        {/* 144 Artwork Node Markers */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
        >
          {nodes.map((node) => {
            const mx = toMapX(node.x);
            const my = toMapY(node.y);
            const mw = Math.max(2, (node.width / worldW) * MAP_WIDTH);
            const mh = Math.max(2, (node.height / worldH) * MAP_HEIGHT);

            return (
              <rect
                key={node.id}
                x={mx - mw / 2}
                y={my - mh / 2}
                width={mw}
                height={mh}
                fill={node.isCenterpiece ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.22)"}
                rx={0.5}
              />
            );
          })}
        </svg>

        {/* Active Viewport Frustum Box */}
        <div
          className="absolute border border-white/80 bg-white/10 rounded-sm pointer-events-none transition-all duration-75"
          style={{
            left: frustumX,
            top: frustumY,
            width: frustumW,
            height: frustumH,
          }}
        />
      </div>
    </div>
  );
};
