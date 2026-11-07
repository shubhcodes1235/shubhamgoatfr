import React from "react";

interface HeaderProps {
  count: number;
}

export const Header: React.FC<HeaderProps> = ({ count }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090909]/90 backdrop-blur-md px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/4 transition-colors select-none">
      {/* Brand Identity */}
      <div className="flex items-baseline gap-2">
        <h1 className="font-sans text-sm sm:text-base tracking-[0.16em] uppercase font-medium text-neutral-100">
          shubhamgoatfr
        </h1>
        <span className="font-mono text-[10px] tracking-widest text-neutral-500 hidden sm:inline">
          curated visual exhibition
        </span>
      </div>

      {/* Subtle Right-Aligned Meta / External link */}
      <div className="flex items-center gap-4 font-mono text-[11px] tracking-wider text-neutral-500">
        <span>{count} WORKS</span>
        <a
          href="https://pinterest.com/shubhamgoatfr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          PINTEREST ↗
        </a>
      </div>
    </header>
  );
};

