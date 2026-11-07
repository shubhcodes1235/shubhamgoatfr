import { useMemo } from "react";
import type { Artwork } from "@/data/artworks";

export interface CanvasNode {
  id: string;
  artwork: Artwork;
  x: number; // Center X in world coordinates
  y: number; // Center Y in world coordinates
  width: number; // Base width in world coordinates
  height: number; // Base height in world coordinates
  depthLayer: number; // 0, 1, or 2 for subtle multiplane parallax
  clusterIndex: number;
}

export interface ClusterInfo {
  index: number;
  name: string;
  centerX: number;
  centerY: number;
  count: number;
}

// Generate organic, curated cluster layout for all 144 artworks
export function useCanvasLayout(artworks: Artwork[]): {
  nodes: CanvasNode[];
  clusters: ClusterInfo[];
  worldBounds: { minX: number; maxX: number; minY: number; maxY: number };
} {
  return useMemo(() => {
    // 8 distinct thematic constellations across the canvas
    const clusterCenters = [
      { name: "Posters / Archetypes", x: 0, y: 0 },
      { name: "Visual Identity / Social", x: 2800, y: -600 },
      { name: "Digital Architectures / Web", x: -2800, y: -500 },
      { name: "Interfaces / Applications", x: 1800, y: 2400 },
      { name: "Editorial / Magazines", x: -1900, y: 2200 },
      { name: "Cinematics / Movies", x: 4200, y: 1600 },
      { name: "Print & Newsprint", x: -3800, y: 1400 },
      { name: "Chronology / Calendars", x: 0, y: 3800 },
    ];

    // Different size rhythms (width, height based on standard portrait 3:4 / 1:1.41)
    const sizeProfiles = [
      { width: 280, height: 396 }, // Standard
      { width: 360, height: 508 }, // Medium focal
      { width: 440, height: 622 }, // Major hero focal point
      { width: 220, height: 310 }, // Minor satellite
    ];

    const nodes: CanvasNode[] = [];
    const clusters: ClusterInfo[] = clusterCenters.map((c, i) => ({
      index: i,
      name: c.name,
      centerX: c.x,
      centerY: c.y,
      count: 0,
    }));

    // Group artworks by category, distribute evenly across clusters
    const perCluster = Math.ceil(artworks.length / clusterCenters.length);

    artworks.forEach((art, index) => {
      const clusterIdx = Math.min(
        Math.floor(index / perCluster),
        clusterCenters.length - 1
      );
      const cluster = clusterCenters[clusterIdx];
      clusters[clusterIdx].count += 1;

      const itemInCluster = index % perCluster;

      // Golden ratio spiral / organic distribution within cluster
      const angle = itemInCluster * 2.399963; // Golden angle in radians
      const radius = 240 + Math.sqrt(itemInCluster) * 260 + (index % 3) * 60;

      // Deterministic jitter for organic negative space
      const jitterX = Math.sin(index * 9.7) * 75;
      const jitterY = Math.cos(index * 7.3) * 75;

      const posX = cluster.x + Math.cos(angle) * radius + jitterX;
      const posY = cluster.y + Math.sin(angle) * (radius * 0.85) + jitterY;

      // Size rhythm: every 5th is large focal, every 3rd is medium, rest standard
      let sizeIdx = 0;
      if (itemInCluster === 0 || itemInCluster === 6) {
        sizeIdx = 2; // Major focal
      } else if (itemInCluster % 3 === 0) {
        sizeIdx = 1; // Medium focal
      } else if (itemInCluster % 4 === 1) {
        sizeIdx = 3; // Satellite
      }
      const size = sizeProfiles[sizeIdx];

      // Subtle parallax layer assignment (0 = base, 1 = slight fore, 2 = slight back)
      const depthLayer = (index % 5 === 0) ? 1 : (index % 7 === 0 ? 2 : 0);

      nodes.push({
        id: art.id,
        artwork: art,
        x: posX,
        y: posY,
        width: size.width,
        height: size.height,
        depthLayer,
        clusterIndex: clusterIdx,
      });
    });

    // Compute bounding box of entire universe
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    nodes.forEach((n) => {
      minX = Math.min(minX, n.x - n.width / 2);
      maxX = Math.max(maxX, n.x + n.width / 2);
      minY = Math.min(minY, n.y - n.height / 2);
      maxY = Math.max(maxY, n.y + n.height / 2);
    });

    return {
      nodes,
      clusters,
      worldBounds: { minX, maxX, minY, maxY },
    };
  }, [artworks]);
}

