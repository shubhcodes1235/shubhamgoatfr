import { useMemo } from "react";
import type { Artwork } from "@/data/artworks";

export interface CanvasItem {
  id: string;
  artwork: Artwork;
  x: number; // Center X in world coordinates
  y: number; // Center Y in world coordinates
  width: number; // Display width
  height: number; // Display height
  zIndex: number;
  clusterIndex: number;
  isFocal?: boolean;
}

export interface ClusterMeta {
  index: number;
  name: string;
  x: number;
  y: number;
  count: number;
}

/**
 * Editorial Cluster Templates
 * Each cluster is an art-directed layout of 12-16 artworks with a clear hero focal point,
 * secondary companions, balanced margins, and intentional negative space.
 */
interface Slot {
  dx: number;
  dy: number;
  w: number;
  h: number;
  zIndex?: number;
  isFocal?: boolean;
}

// Aspect ratio 1:1.414 (standard ISO/portrait poster)
// Standard slot templates for 12 items:
// - 1 Primary Hero (w: 520, h: 735)
// - 2 Medium Secondary (w: 380, h: 537)
// - 6 Regular Editorial (w: 290, h: 410)
// - 3 Accent Satellites (w: 220, h: 311)
const CLUSTER_TEMPLATE_A: Slot[] = [
  // Focal Hero (Left Center)
  { dx: -380, dy: -40, w: 520, h: 735, zIndex: 10, isFocal: true },
  // Companion stack (Right of Hero)
  { dx: 220, dy: -280, w: 380, h: 537, zIndex: 5 },
  { dx: 260, dy: 300, w: 380, h: 537, zIndex: 6 },
  // Upper orbit
  { dx: -280, dy: -520, w: 290, h: 410, zIndex: 2 },
  { dx: 140, dy: -600, w: 260, h: 368, zIndex: 3 },
  // Far right satellite
  { dx: 720, dy: -120, w: 290, h: 410, zIndex: 4 },
  { dx: 760, dy: 320, w: 240, h: 340, zIndex: 3 },
  // Lower orbit
  { dx: -420, dy: 500, w: 280, h: 396, zIndex: 4 },
  { dx: -80, dy: 620, w: 260, h: 368, zIndex: 2 },
  // Far left accents
  { dx: -840, dy: -160, w: 290, h: 410, zIndex: 3 },
  { dx: -860, dy: 280, w: 250, h: 354, zIndex: 2 },
  // Top accent
  { dx: -680, dy: -460, w: 230, h: 325, zIndex: 1 },
];

// Alternate balanced layout (Hero in Center)
const CLUSTER_TEMPLATE_B: Slot[] = [
  // Focal Hero (Center)
  { dx: 0, dy: 0, w: 540, h: 764, zIndex: 10, isFocal: true },
  // Left flank
  { dx: -490, dy: -140, w: 370, h: 523, zIndex: 5 },
  { dx: -460, dy: 380, w: 310, h: 438, zIndex: 4 },
  // Right flank
  { dx: 510, dy: 110, w: 370, h: 523, zIndex: 6 },
  { dx: 470, dy: -390, w: 310, h: 438, zIndex: 4 },
  // Top companions
  { dx: -140, dy: -560, w: 280, h: 396, zIndex: 3 },
  { dx: 240, dy: -580, w: 270, h: 382, zIndex: 2 },
  // Bottom companions
  { dx: 120, dy: 580, w: 290, h: 410, zIndex: 3 },
  { dx: -240, dy: 560, w: 260, h: 368, zIndex: 2 },
  // Outer wing satellites
  { dx: -880, dy: 80, w: 260, h: 368, zIndex: 1 },
  { dx: 890, dy: -140, w: 260, h: 368, zIndex: 1 },
  { dx: 860, dy: 380, w: 240, h: 340, zIndex: 1 },
];

/**
 * 12 Curated Clusters spaced on a 4x3 vast spatial grid
 * Generous separation (~2800px) between cluster centers ensures when you view one cluster,
 * adjacent clusters sit on the perimeter inviting natural panning.
 */
const CLUSTER_COORDINATES: Array<{ name: string; x: number; y: number }> = [
  // Cluster 0: Origin (The Launch View)
  { name: "ROOM 01 // ARCHETYPES", x: 0, y: 0 },
  // Cluster 1: Right
  { name: "ROOM 02 // CHROME & FLUID", x: 2600, y: 0 },
  // Cluster 2: Far Right
  { name: "ROOM 03 // ACID GRAPHICS", x: 5200, y: -200 },
  // Cluster 3: Down
  { name: "ROOM 04 // EDITORIAL PRINTS", x: 0, y: 2400 },
  // Cluster 4: Diagonal Down-Right
  { name: "ROOM 05 // CINEMATICS", x: 2600, y: 2400 },
  // Cluster 5: Far Down-Right
  { name: "ROOM 06 // DARKROOM", x: 5200, y: 2400 },
  // Cluster 6: Left
  { name: "ROOM 07 // BRUTALIST GRID", x: -2600, y: 0 },
  // Cluster 7: Far Left
  { name: "ROOM 08 // MINIMALIST FORMS", x: -5200, y: -200 },
  // Cluster 8: Up
  { name: "ROOM 09 // VISUAL IDENTITY", x: 0, y: -2400 },
  // Cluster 9: Diagonal Up-Right
  { name: "ROOM 10 // DIGITAL SPACES", x: 2600, y: -2400 },
  // Cluster 10: Diagonal Down-Left
  { name: "ROOM 11 // SWISS MODERN", x: -2600, y: 2400 },
  // Cluster 11: Diagonal Up-Left
  { name: "ROOM 12 // FUTURE ARCHIVE", x: -2600, y: -2400 },
];

export function useCuratedLayout(artworks: Artwork[]): {
  items: CanvasItem[];
  clusters: ClusterMeta[];
} {
  return useMemo(() => {
    const totalArtworks = artworks.length;
    const itemsPerCluster = Math.ceil(totalArtworks / CLUSTER_COORDINATES.length); // 144 / 12 = 12

    const items: CanvasItem[] = [];
    const clusters: ClusterMeta[] = [];

    CLUSTER_COORDINATES.forEach((coord, clusterIdx) => {
      const template = clusterIdx % 2 === 0 ? CLUSTER_TEMPLATE_A : CLUSTER_TEMPLATE_B;
      const startIndex = clusterIdx * itemsPerCluster;
      const clusterArtworks = artworks.slice(startIndex, startIndex + itemsPerCluster);

      clusters.push({
        index: clusterIdx,
        name: coord.name,
        x: coord.x,
        y: coord.y,
        count: clusterArtworks.length,
      });

      clusterArtworks.forEach((art, slotIdx) => {
        // Wrap slot if more than 12
        const slot = template[slotIdx % template.length];

        items.push({
          id: art.id,
          artwork: art,
          x: coord.x + slot.dx,
          y: coord.y + slot.dy,
          width: slot.w,
          height: slot.h,
          zIndex: slot.zIndex ?? 1,
          clusterIndex: clusterIdx,
          isFocal: slot.isFocal,
        });
      });
    });

    return { items, clusters };
  }, [artworks]);
}

