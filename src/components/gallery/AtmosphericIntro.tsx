import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface AtmosphericIntroProps {
  onComplete: () => void;
}

export function AtmosphericIntro({ onComplete }: AtmosphericIntroProps) {
  const [phase, setPhase] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Step 1: Initialize phase
    const t1 = setTimeout(() => setPhase(1), 300);
    // Step 2: Focus phase
    const t2 = setTimeout(() => setPhase(2), 1200);
    // Step 3: Complete & dissolve
    const t3 = setTimeout(() => {
      setPhase(3);
      setTimeout(onComplete, 600);
    }, 2200);

    // Progress counter
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      });
    }, 80);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 transition-opacity duration-700 select-none ${
        phase === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Dynamic atmospheric light leak */}
      <div
        className="absolute w-[60vw] h-[60vw] max-w-150 max-h-150 rounded-full pointer-events-none blur-[140px] transition-all duration-1000"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)",
          transform: phase >= 1 ? "scale(1.2)" : "scale(0.8)",
          opacity: phase >= 1 ? 0.8 : 0.2,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
            ESTABLISHING SPATIAL FIELD
          </span>
        </div>

        <div className="space-y-2">
          <h1
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-sans uppercase text-white transition-all duration-700 ${
              phase >= 1 ? "filter-none opacity-100 translate-y-0" : "blur-md opacity-20 translate-y-3"
            }`}
          >
            ENTERING THE ARCHIVE
          </h1>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400">
            A 3D LIVING EXHIBITION // SHUBHAMGOATFR
          </p>
        </div>

        {/* Progress indicator */}
        <div className="w-48 space-y-2 pt-4">
          <div className="w-full h-0.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-violet-500 to-indigo-400 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
            <span>INDEXING NODES</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
