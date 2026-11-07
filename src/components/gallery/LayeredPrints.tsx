import { useState } from "react";
import type { Artwork } from "@/data/artworks";
import { Layers, RotateCcw, Shuffle, Eye, ExternalLink } from "lucide-react";
import { ambientSound } from "@/lib/sound";

interface LayeredPrintsProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export function LayeredPrints({
  artworks,
  onSelectArtwork,
}: LayeredPrintsProps) {
  const [deck, setDeck] = useState<Artwork[]>(artworks);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const shuffleDeck = () => {
    ambientSound.playHoverTone();
    setDeck((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const resetDeck = () => {
    ambientSound.playHoverTone();
    setDeck(artworks);
  };

  const cycleTopCard = () => {
    ambientSound.playHoverTone();
    setDeck((prev) => {
      const next = [...prev];
      const top = next.shift();
      if (top) next.push(top);
      return next;
    });
  };

  // Up to 8 visible cards in the tactile layered stack
  const visibleStack = deck.slice(0, 8);

  return (
    <div className="w-full flex flex-col items-center select-none pb-20">
      {/* Header controls */}
      <div className="w-full max-w-4xl px-4 my-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400 bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-violet-400" />
          <span className="text-white font-semibold uppercase tracking-wider">
            System 04 // Physical Print Stack & Poster Deck
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={cycleTopCard}
            className="px-3 py-1.5 rounded-lg border border-violet-500/50 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors"
          >
            PEEL NEXT PRINT (CYCLE)
          </button>
          <button
            onClick={shuffleDeck}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-neutral-300 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>SHUFFLE</span>
          </button>
          <button
            onClick={resetDeck}
            className="p-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-neutral-400 transition-colors"
            title="Reset Order"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-xs font-mono text-neutral-500 mb-8">
        HOVER TO PEEL AND LIFT REALISTIC POSTER SHADOWS // CLICK TOP PRINT TO INSPECT
      </p>

      {/* Tactile Poster Deck Stage */}
      <div className="relative w-full max-w-lg h-160 flex items-center justify-center my-6">
        {visibleStack.map((art, index) => {
          // Offsets for stacked paper cards
          const isTop = index === 0;
          const rotZ = index === 0 ? 0 : (index % 2 === 0 ? 1 : -1) * (index * 2.8);
          const offsetY = index * 14;
          const scale = 1 - index * 0.04;
          const isLifted = draggedIndex === index;

          return (
            <div
              key={art.id}
              onClick={() => {
                if (isTop) {
                  onSelectArtwork(art);
                  ambientSound.playHoverTone();
                } else {
                  // Bring this card to top
                  setDeck((prev) => {
                    const next = [...prev];
                    const [item] = next.splice(index, 1);
                    return [item, ...next];
                  });
                  ambientSound.playHoverTone();
                }
              }}
              onMouseEnter={() => setDraggedIndex(index)}
              onMouseLeave={() => setDraggedIndex(null)}
              className="absolute w-80 sm:w-95 md:w-105 aspect-3/4 cursor-pointer transition-all duration-500 ease-out group"
              style={{
                top: `${offsetY}px`,
                transform: `rotate(${isLifted ? 0 : rotZ}deg) translateY(${isLifted ? -24 : 0}px) scale(${isLifted ? scale * 1.04 : scale})`,
                zIndex: visibleStack.length - index,
              }}
            >
              {/* Realistic Physical Print Border & Paper Texture */}
              <div
                className={`relative w-full h-full p-4 bg-neutral-900 border rounded-xl overflow-hidden transition-all duration-500 ${
                  isTop
                    ? "border-neutral-700 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_10px_20px_rgba(0,0,0,0.6)]"
                    : "border-neutral-800/90 shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Paper edge / matte border */}
                <div className="relative w-full h-[84%] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800/60">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    draggable={false}
                  />

                  {/* Physical sheen reflection */}
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                  {isTop && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-neutral-950/80 border border-neutral-700 backdrop-blur-md flex items-center gap-1 text-[10px] font-mono text-white">
                      <Eye className="w-3 h-3 text-violet-400" />
                      TOP ARTIFACT
                    </div>
                  )}
                </div>

                {/* Print Title Placard / Letterpress feel */}
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-sans tracking-wide truncate max-w-55">
                      {art.title}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      {art.category} // {art.date}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                    #{index + 1} <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid overview of all prints in the archive */}
      <div className="w-full max-w-6xl px-4 mt-24">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Archival Contact Sheet // All Physical Prints
          </span>
          <span className="font-mono text-[11px] text-neutral-500">
            {artworks.length} EDITIONS CATALOGUED
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {artworks.map((art) => (
            <div
              key={art.id}
              onClick={() => {
                onSelectArtwork(art);
                ambientSound.playHoverTone();
              }}
              className="group cursor-pointer rounded-lg border border-neutral-800 p-2.5 bg-neutral-900/50 hover:border-neutral-600 transition-all hover:shadow-lg"
            >
              <div className="aspect-3/4 rounded overflow-hidden mb-2 bg-neutral-950">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] font-bold text-white truncate font-sans uppercase">
                {art.title}
              </p>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">
                {art.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
