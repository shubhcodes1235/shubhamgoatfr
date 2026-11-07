import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-8 py-10 mt-12 border-t border-white/4 bg-[#090909] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500 tracking-wider select-none">
      <div className="flex items-center gap-2">
        <span className="text-neutral-300 font-sans uppercase tracking-[0.14em]">
          shubhamgoatfr
        </span>
        <span>—</span>
        <span>VISUAL ARCHIVE</span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://pinterest.com/shubhamgoatfr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          PINTEREST
        </a>
        <a
          href="https://instagram.com/shubhamgoatfr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          INSTAGRAM
        </a>
        <a
          href="mailto:shubhamgoatfr@gmail.com"
          className="hover:text-white transition-colors"
        >
          CONTACT
        </a>
      </div>
    </footer>
  );
};

