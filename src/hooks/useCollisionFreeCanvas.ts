import { useMemo } from "react";
import type { Artwork } from "@/data/artworks";
import spatialLayoutRaw from "@/data/spatialLayout.json";

export interface CanvasArtworkNode {
  id: string;
  artwork: Artwork;
  x: number; // World center X
  y: number; // World center Y
  width: number; // Exact calculated pixel width
  height: number; // Exact calculated pixel height
  aspectRatio: number;
  isCenterpiece: boolean;
}

export interface SectorDestination {
  title: string;
  x: number;
  y: number;
}

export const SECTOR_DESTINATIONS: SectorDestination[] = [
  { title: "ORIGIN & ARCHETYPES", x: 0, y: 0 },
  { title: "EAST // CHROME GALLERY", x: 1450, y: -200 },
  { title: "SOUTH-EAST // ACID VISIONS", x: 1350, y: 1300 },
  { title: "SOUTH // EDITORIAL PRINT", x: 0, y: 1450 },
  { title: "SOUTH-WEST // BRUTALIST GRID", x: -1400, y: 1300 },
  { title: "WEST // DARKROOM ARCHIVE", x: -1450, y: -150 },
  { title: "NORTH-WEST // MINIMALIST FORMS", x: -1350, y: -1350 },
  { title: "NORTH // SWISS MODERN", x: 0, y: -1500 },
  { title: "NORTH-EAST // FUTURE VAULT", x: 1350, y: -1350 },
];

export function useCollisionFreeCanvas(artworks: Artwork[]): {
  artworkNodes: CanvasArtworkNode[];
  destinations: SectorDestination[];
} {
  return useMemo(() => {
    // Map artworks by ID for O(1) lookup
    const artworkMap = new Map<string, Artwork>();
    artworks.forEach((art) => artworkMap.set(art.id, art));

    const artworkNodes: CanvasArtworkNode[] = [];

    // Combine precomputed non-overlapping spatial layout with live artwork metadata
    spatialLayoutRaw.forEach((item) => {
      const art = artworkMap.get(item.id);
      if (art) {
        artworkNodes.push({
          id: item.id,
          artwork: art,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          aspectRatio: item.ratio,
          isCenterpiece: item.isCenterpiece,
        });
      }
    });

    return {
      artworkNodes,
      destinations: SECTOR_DESTINATIONS,
    };
  }, [artworks]);
}

