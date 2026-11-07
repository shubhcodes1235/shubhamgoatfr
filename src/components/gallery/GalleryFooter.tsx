import { ExternalLink, ArrowUpRight } from "lucide-react";

export function GalleryFooter() {
  return (
    <footer className="w-full border-t border-neutral-800/80 bg-neutral-950 py-12 px-6 mt-20 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Col: Artist Monogram & Statement */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-white font-mono">
              SHUBHAMGOATFR
            </span>
            <span className="text-neutral-600 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-neutral-400">
              3D LIVING ARCHIVE
            </span>
          </div>
          <p className="text-xs font-mono text-neutral-500 max-w-md">
            A spatial digital gallery where curated Pinterest artworks manifest as an architectural visual world. Built with zero generic templates.
          </p>
        </div>

        {/* Right Col: Minimalist Gallery Outlinks */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider">
          <a
            href="https://pinterest.com/shubhamgoatfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors group"
          >
            <span>PINTEREST</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://instagram.com/shubhamgoatfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors group"
          >
            <span>INSTAGRAM</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://x.com/shubhamgoatfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors group"
          >
            <span>TWITTER / X</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="mailto:shubhamgoatfr@gmail.com"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors group"
          >
            <span>DISPATCH / EMAIL</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-600 gap-2">
        <span>© 2026 SHUBHAMGOATFR // ALL VISUAL RIGHTS RESERVED TO ORIGINAL CREATORS</span>
        <span className="text-neutral-500">EXPERIENCE DESIGNED AS A LIVING 3D EXHIBITION</span>
      </div>
    </footer>
  );
}
