import { useMemo } from "react";
import type { Artwork } from "@/data/artworks";

export interface SpatialArtwork {
  id: string;
  artwork: Artwork;
  x: number; // Center X in world coordinates
  y: number; // Center Y in world coordinates
  width: number;
  height: number;
  zIndex: number;
  parallaxFactor: number; // Subtle layer depth: 0.96 (distant), 1.0 (base), 1.05 (foreground)
  clusterIndex: number;
  isCenterpiece?: boolean;
}

export interface SpatialAnchor {
  index: number;
  title: string;
  x: number;
  y: number;
}

/**
 * 12 Interconnected Spatial Anchors arranged in a continuous, flowing territory.
 * Distances between adjacent anchors (~1600px - 1900px) are calibrated so that panning
 * in any cardinal or diagonal direction smoothly brings the next composed centerpiece into view
 * without dead gaps or isolated black islands.
 */
export const SPATIAL_ANCHORS: SpatialAnchor[] = [
  // Anchor 0: Origin — The Grand Entrance Centerpiece
  { index: 0, title: "EXHIBITION 01 // OVERSIZED CENTERPIECE", x: 0, y: 0 },
  // Anchor 1: East
  { index: 1, title: "EXHIBITION 02 // FLUID KINETICS", x: 1750, y: -80 },
  // Anchor 2: South-East
  { index: 2, title: "EXHIBITION 03 // ACID EXPERIMENTAL", x: 1800, y: 1550 },
  // Anchor 3: South
  { index: 3, title: "EXHIBITION 04 // EDITORIAL PRESS", x: 0, y: 1600 },
  // Anchor 4: South-West
  { index: 4, title: "EXHIBITION 05 // BRUTALIST FORMS", x: -1800, y: 1550 },
  // Anchor 5: West
  { index: 5, title: "EXHIBITION 06 // DARKROOM STUDY", x: -1750, y: -80 },
  // Anchor 6: North-West
  { index: 6, title: "EXHIBITION 07 // MINIMALIST ARCHIVE", x: -1800, y: -1600 },
  // Anchor 7: North
  { index: 7, title: "EXHIBITION 08 // SWISS TYPOGRAPHY", x: 0, y: -1650 },
  // Anchor 8: North-East
  { index: 8, title: "EXHIBITION 09 // HYPERMODERN", x: 1800, y: -1600 },
  // Outer expansion rooms (seamless transitions into outer galaxy)
  { index: 9, title: "EXHIBITION 10 // DIGITAL VISIONS", x: 3500, y: 0 },
  { index: 10, title: "EXHIBITION 11 // MONOCHROME", x: 0, y: 3200 },
  { index: 11, title: "EXHIBITION 12 // FUTURE VAULT", x: -3500, y: 0 },
];

/**
 * Spatial Slot Template:
 * 1 Oversized Centerpiece occupying 48-55% of viewport height (540w x 764h)
 * 2 Tall secondary anchors flanking it (380w x 537h)
 * 4 Editorial balanced companions (300w x 424h)
 * 3 Interstitial connecting pieces that physically bridge adjacent anchors (250w x 354h)
 * 2 Accent satellites (210w x 297h)
 * Total: 12 artworks per anchor = 144 artworks across 12 anchors.
 */
interface SlotDef {
  dx: number;
  dy: number;
  w: number;
  h: number;
  zIndex: number;
  parallax: number;
  isCenterpiece?: boolean;
}

const TEMPLATE_CENTER_HERO: SlotDef[] = [
  // 1. Oversized Centerpiece (Right in the middle of the camera)
  { dx: 0, dy: 0, w: 540, h: 764, zIndex: 12, parallax: 1.0, isCenterpiece: true },

  // 2. Left Secondary (Slightly overlapped, positioned intentionally)
  { dx: -450, dy: -80, w: 370, h: 523, zIndex: 8, parallax: 0.98 },

  // 3. Right Secondary (Balanced counterweight)
  { dx: 460, dy: 60, w: 380, h: 537, zIndex: 9, parallax: 1.03 },

  // 4. Upper Left Companion
  { dx: -380, dy: -490, w: 290, h: 410, zIndex: 5, parallax: 0.97 },

  // 5. Upper Right Companion
  { dx: 360, dy: -500, w: 300, h: 424, zIndex: 6, parallax: 1.02 },

  // 6. Lower Left Companion
  { dx: -340, dy: 510, w: 290, h: 410, zIndex: 6, parallax: 1.01 },

  // 7. Lower Right Companion
  { dx: 380, dy: 520, w: 290, h: 410, zIndex: 5, parallax: 0.98 },

  // 8. Bridge East (Directly leads gaze toward the East Anchor)
  { dx: 860, dy: -30, w: 280, h: 396, zIndex: 4, parallax: 1.0 },

  // 9. Bridge South (Directly leads gaze toward the South Anchor)
  { dx: 20, dy: 870, w: 280, h: 396, zIndex: 4, parallax: 1.0 },

  // 10. Bridge West (Directly leads gaze toward the West Anchor)
  { dx: -860, dy: -40, w: 280, h: 396, zIndex: 4, parallax: 1.0 },

  // 11. Bridge North (Directly leads gaze toward the North Anchor)
  { dx: 0, dy: -880, w: 280, h: 396, zIndex: 4, parallax: 1.0 },

  // 12. Diagonal interstitial companion
  { dx: 680, dy: -400, w: 230, h: 325, zIndex: 3, parallax: 1.02 },
];

const TEMPLATE_ASYMMETRIC_HERO: SlotDef[] = [
  // 1. Oversized Centerpiece (Asymmetric focal weight)
  { dx: -240, dy: -30, w: 560, h: 792, zIndex: 12, parallax: 1.0, isCenterpiece: true },

  // 2. Right Secondary Stack
  { dx: 360, dy: -240, w: 400, h: 566, zIndex: 8, parallax: 1.03 },
  { dx: 390, dy: 340, w: 370, h: 523, zIndex: 7, parallax: 0.98 },

  // 3. Top Accent Companion
  { dx: -180, dy: -580, w: 290, h: 410, zIndex: 5, parallax: 0.97 },

  // 4. Far Left Guard
  { dx: -740, dy: -60, w: 310, h: 438, zIndex: 6, parallax: 1.01 },
  { dx: -710, dy: 440, w: 260, h: 368, zIndex: 4, parallax: 0.98 },

  // 5. Bottom Anchor
  { dx: -160, dy: 560, w: 300, h: 424, zIndex: 6, parallax: 1.02 },

  // 6. Right Wing Bridge
  { dx: 860, dy: 60, w: 280, h: 396, zIndex: 4, parallax: 1.0 },

  // 7. North-East Bridge
  { dx: 720, dy: -480, w: 250, h: 354, zIndex: 3, parallax: 0.99 },

  // 8. South Bridge
  { dx: 80, dy: 880, w: 280, h: 396, zIndex: 4, parallax: 1.0 },

  // 9. West Bridge
  { dx: -880, dy: -500, w: 240, h: 340, zIndex: 3, parallax: 1.01 },

  // 10. South-West Bridge
  { dx: -540, dy: 820, w: 250, h: 354, zIndex: 3, parallax: 0.98 },
];

export function useSpatialExhibition(artworks: Artwork[]): {
  artworksLayout: SpatialArtwork[];
  anchors: SpatialAnchor[];
} {
  return useMemo(() => {
    const total = artworks.length; // 144
    const countPerAnchor = Math.ceil(total / SPATIAL_ANCHORS.length); // 12

    const artworksLayout: SpatialArtwork[] = [];

    SPATIAL_ANCHORS.forEach((anchor, anchorIdx) => {
      const template =
        anchorIdx % 2 === 0 ? TEMPLATE_CENTER_HERO : TEMPLATE_ASYMMETRIC_HERO;

      const sliceStart = anchorIdx * countPerAnchor;
      const anchorArtworks = artworks.slice(sliceStart, sliceStart + countPerAnchor);

      anchorArtworks.forEach((art, slotIdx) => {
        const slot = template[slotIdx % template.length];

        artworksLayout.push({
          id: art.id,
          artwork: art,
          x: anchor.x + slot.dx,
          y: anchor.y + slot.dy,
          width: slot.w,
          height: slot.h,
          zIndex: slot.zIndex,
          parallaxFactor: slot.parallax,
          clusterIndex: anchorIdx,
          isCenterpiece: slot.isCenterpiece,
        });
      });
    });

    return {
      artworksLayout,
      anchors: SPATIAL_ANCHORS,
    };
  }, [artworks]);
}

