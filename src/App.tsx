import { useMemo } from "react";
import { ARTWORKS } from "@/data/artworks";
import { InfiniteCanvas } from "@/components/gallery/InfiniteCanvas";

export default function App() {
  const artworks = useMemo(() => ARTWORKS, []);

  return (
    <div className="relative w-screen h-screen bg-[#090909] text-neutral-100 overflow-hidden select-none selection:bg-neutral-100 selection:text-neutral-950">
      <InfiniteCanvas artworks={artworks} />
    </div>
  );
}
