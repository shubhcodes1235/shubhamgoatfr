import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { Artwork, GalleryCategory } from "@/data/artworks";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import FlexCarousel from "@/components/ui/FlexCarousel";
import ElasticMesh from "@/components/ui/ElasticMesh";
import { HeroCarousel } from "@/components/ui/hero-carousel";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { ambientSound } from "@/lib/sound";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  Sparkles,
  Maximize2,
  ArrowUpRight,
  Disc,
  Activity,
  Layers,
  CircleDot,
} from "lucide-react";

interface PresentationGalleryProps {
  artworks: Artwork[];
  categories: readonly GalleryCategory[];
  selectedCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
  categoryCounts: Record<string, number>;
}

export type PresentationView = "flex" | "hero" | "circular" | "wall" | "stream";

export function PresentationGallery({
  artworks,
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: PresentationGalleryProps) {
  const [view, setView] = useState<PresentationView>("flex");
  const [showSquishHero, setShowSquishHero] = useState<boolean>(false);
  const [isAutoSlide, setIsAutoSlide] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCinemaOpen, setIsCinemaOpen] = useState<boolean>(false);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState<boolean>(false);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  const slideshowTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = artworks.length;
  const currentArtwork = artworks[currentIndex] || artworks[0];

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsAudioActive(active);
  };

  const openCinemaAt = (index: number) => {
    setCurrentIndex(index);
    setIsCinemaOpen(true);
  };

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Slideshow auto-advance
  useEffect(() => {
    if (isPlayingSlideshow && isCinemaOpen) {
      slideshowTimerRef.current = setInterval(nextSlide, 3200);
    } else {
      if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current);
    }
    return () => {
      if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current);
    };
  }, [isPlayingSlideshow, isCinemaOpen, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCinemaOpen) {
        if (e.key === "Escape") {
          setIsCinemaOpen(false);
          setIsPlayingSlideshow(false);
        } else if (e.key === "ArrowRight") {
          nextSlide();
        } else if (e.key === "ArrowLeft") {
          prevSlide();
        } else if (e.key === " ") {
          e.preventDefault();
          setIsPlayingSlideshow((p) => !p);
        }
      } else {
        if (e.key === "m" || e.key === "M") {
          toggleSound();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCinemaOpen, nextSlide, prevSlide]);

  // Convert artworks to StreamImage format for 3D corridor
  const streamImages = useMemo(
    () =>
      artworks.map((art) => ({
        src: art.image,
        alt: art.title,
      })),
    [artworks]
  );

  // Convert artworks for FlexCarousel format
  const flexItems = useMemo(
    () =>
      artworks.map((art) => ({
        src: art.image,
        alt: art.title,
        title: art.title,
        subtitle: `${art.category} // 2026`,
      })),
    [artworks]
  );

  // Convert artworks for HeroCarousel format
  const heroItems = useMemo(
    () =>
      artworks.slice(0, 16).map((art, i) => {
        const accents = ["#8b5cf6", "#3b82f6", "#ec4899", "#10b981", "#f59e0b", "#6366f1"];
        return {
          id: art.id,
          title: art.title.toUpperCase(),
          image: art.image,
          credit: `BY SHUBHAMGOATFR // CURATION #${i + 1}`,
          meta: [art.category.toUpperCase(), "ARCHIVE 2026", "SHUBHAMGOATFR"],
          accent: accents[i % accents.length],
        };
      }),
    [artworks]
  );

  // Convert artworks for CircularGallery format
  const circularItems = useMemo(
    () =>
      artworks.slice(0, 16).map((art) => ({
        common: art.title,
        binomial: `${art.category} ARCHIVE // 2026`,
        photo: {
          url: art.image,
          text: art.title,
          by: "shubhamgoatfr",
        },
      })),
    [artworks]
  );

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-neutral-100 flex flex-col select-none">
      {/* ── Editorial Brand Header ── */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-neutral-950/80 border-b border-white/10 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2.5">
          {/* Top Line: Brand Monogram, Modes & External Outlink */}
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Monogram + Squish Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-2.5 h-2.5">
                <span className="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-white">
                    SHUBHAMGOATFR
                  </span>
                  <button
                    onClick={() => setShowSquishHero((prev) => !prev)}
                    className={`flex items-center gap-1 text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                      showSquishHero
                        ? "bg-violet-500/25 border-violet-500/60 text-violet-200 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                    }`}
                    title="Toggle 3D Elastic Mesh Interactive Logo"
                  >
                    <Activity className="w-2.5 h-2.5 text-violet-400" />
                    <span>{showSquishHero ? "HIDE SQUISH" : "3D SQUISH LOGO"}</span>
                  </button>
                </div>
                <span className="font-mono text-[10px] tracking-widest text-neutral-500">
                  CURATED PINTEREST PORTFOLIO // {total} WORKS
                </span>
              </div>
            </div>

            {/* Right: View Toggles, Presentation Trigger, Audio & Outlink */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono">
                <button
                  onClick={() => setView("flex")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    view === "flex"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title="Liquid WebGL Flex Carousel"
                >
                  <Disc className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px]">LIQUID</span>
                </button>

                <button
                  onClick={() => setView("hero")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    view === "hero"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title="Filmstrip Editorial Hero Carousel"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px]">HERO</span>
                </button>

                <button
                  onClick={() => setView("circular")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    view === "circular"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title="Circular 3D Orbit Carousel"
                >
                  <CircleDot className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px]">ORBIT 3D</span>
                </button>

                <button
                  onClick={() => setView("wall")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    view === "wall"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title="Wall View"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px]">WALL</span>
                </button>

                <button
                  onClick={() => setView("stream")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    view === "stream"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title="3D Perspective Stream"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px]">3D STREAM</span>
                </button>
              </div>

              {/* Enter Fullscreen Presentation Button */}
              <button
                onClick={() => openCinemaAt(0)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors border border-white/15 cursor-pointer"
                title="Open Fullscreen Slideshow"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">SLIDESHOW</span>
              </button>

              {/* Minimal Audio Toggle */}
              <button
                onClick={toggleSound}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  isAudioActive
                    ? "bg-violet-500/20 border-violet-500/50 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                    : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
                }`}
                title="Ambient Soundscape (M)"
              >
                {isAudioActive ? (
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Direct Pinterest Link */}
              <a
                href="https://pinterest.com/shubhamgoatfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
              >
                <span>PINTEREST</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Bottom Line: Category Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5 border-t border-neutral-800/40">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              const count = categoryCounts[cat] || (cat === "All" ? total : 0);
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                    active
                      ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-[1.02]"
                      : "text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/60"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? "bg-black/15 text-black" : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── Interactive 3D ElasticMesh Brand Stage (Toggleable) ── */}
      {showSquishHero && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <div className="relative w-full h-65 sm:h-80 rounded-3xl overflow-hidden border border-violet-500/30 bg-neutral-950/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(139,92,246,0.15)] flex flex-col items-center justify-center group">
            {/* Background radial glow */}
            <div className="absolute inset-0 bg-radial from-violet-600/20 via-transparent to-transparent pointer-events-none" />

            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <ElasticMesh
                text="SHUBHAM&#10;GOATFR"
                material="chrome"
                color="#8b5cf6"
                inflate={1}
                stiffness={0.5}
                wobble={0.65}
                theme="dark"
                className="w-full h-full"
              />
            </div>

            <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-400 tracking-widest uppercase backdrop-blur-md">
                POKE, DENT & DRAG TO SQUISH THE 3D CHROME MESH
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Presentation Canvas ── */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-6 px-3 sm:px-6 md:px-8">
        {view === "flex" ? (
          /* LIQUID WEBGL FLEX CAROUSEL (React Bits) */
          <div className="relative w-full h-[76vh] min-h-130 rounded-3xl overflow-hidden border border-white/10 bg-neutral-950/40 backdrop-blur-xl shadow-2xl">
            {/* Auto Slide Toggle Pill */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setIsAutoSlide((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-lg ${
                  isAutoSlide
                    ? "bg-violet-500/20 border-violet-500/60 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                    : "bg-black/60 border-white/10 text-neutral-400 hover:text-white"
                }`}
                title="Toggle Auto Slide"
              >
                {isAutoSlide ? (
                  <>
                    <Pause className="w-3 h-3 text-violet-400" />
                    <span>AUTO SLIDE ON</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-neutral-400" />
                    <span>AUTO SLIDE OFF</span>
                  </>
                )}
              </button>
            </div>

            <FlexCarousel
              items={flexItems}
              preset="liquid"
              intro="rise"
              cardHeight={0.62}
              gap={16}
              squeeze={0.2}
              focusOnClick={true}
              captions={true}
              autoplay={isAutoSlide}
              interval={3.2}
              className="w-full h-full"
            />
          </div>
        ) : view === "hero" ? (
          /* EDITORIAL FILMSTRIP HERO CAROUSEL */
          <div className="relative w-full h-[78vh] min-h-140 rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
            <HeroCarousel
              items={heroItems}
              autoplay={isAutoSlide}
              autoplayDelay={3600}
              brand={
                <span className="font-mono text-xs tracking-[0.25em] text-white/90 uppercase font-semibold">
                  SHUBHAMGOATFR // CURATION
                </span>
              }
              onBack={() => setView("flex")}
              className="w-full h-full"
            />
          </div>
        ) : view === "circular" ? (
          /* 3D CIRCULAR ORBIT GALLERY */
          <div className="relative w-full h-[78vh] min-h-140 rounded-3xl overflow-hidden border border-white/10 bg-[#070709] shadow-2xl flex flex-col justify-center items-center">
            <CircularGallery
              items={circularItems}
              radius={560}
              className="w-full h-full"
            />
          </div>
        ) : view === "wall" ? (
          /* PURE VISUAL WALL: Zero placards, Zero clutter, 100% Art */
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {artworks.map((art, index) => (
              <div
                key={art.id}
                onClick={() => openCinemaAt(index)}
                className="group relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              >
                <img
                  src={art.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
                {/* Subtle vignette on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/90">
                    CLICK TO EXPAND
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 3D INFINITE STREAM: Cinematic rush towards viewer */
          <div className="w-full h-[80vh] rounded-3xl overflow-hidden relative border border-white/10 bg-black">
            <ImageStreamHero
              images={streamImages}
              speed={16}
              cards={10}
              className="w-full h-full"
            />
            <div className="absolute bottom-8 inset-x-0 flex justify-center pointer-events-none">
              <button
                onClick={() => openCinemaAt(0)}
                className="pointer-events-auto px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer"
              >
                ENTER PRESENTATION MODE
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── High-End Minimalist Footer for Branding ── */}
      <footer className="w-full border-t border-white/10 bg-neutral-950 py-10 px-6 mt-12 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Brand Identity */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-[0.2em] text-white">
                SHUBHAMGOATFR
              </span>
              <span className="text-neutral-600 font-mono text-xs">/</span>
              <span className="text-xs font-mono text-neutral-400">
                PINTEREST CURATION ARCHIVE
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Visual art, editorial designs, and spatial studies.
            </span>
          </div>

          {/* Right: Direct Social Links */}
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
              <span>CONTACT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-600 gap-2">
          <span>© 2026 SHUBHAMGOATFR // ALL RIGHTS RESERVED</span>
          <span className="text-neutral-500">CURATED VISUAL EXPERIENCE</span>
        </div>
      </footer>

      {/* ── CINEMA PRESENTATION MODE (Full-Screen Pure Visual Slide) ── */}
      {isCinemaOpen && currentArtwork && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-in fade-in duration-200 select-none">
          {/* Ambient Blurred Artwork Color in Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 blur-3xl scale-125"
            style={{
              backgroundImage: `url(${currentArtwork.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Top Bar inside Cinema: Simple index & close */}
          <div className="absolute top-6 inset-x-6 z-20 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="tracking-widest uppercase text-white/80">
              {currentIndex + 1} / {total}
            </span>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlayingSlideshow((p) => !p)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] transition-colors cursor-pointer ${
                  isPlayingSlideshow
                    ? "bg-white text-black border-white font-semibold"
                    : "border-white/20 text-neutral-300 hover:text-white"
                }`}
              >
                {isPlayingSlideshow ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>PLAY SLIDESHOW</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsCinemaOpen(false);
                  setIsPlayingSlideshow(false);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Previous / Next Full-Bleed Click Zones */}
          <div
            onClick={prevSlide}
            className="absolute inset-y-0 left-0 w-1/4 z-10 cursor-w-resize flex items-center pl-6 group opacity-0 hover:opacity-100 transition-opacity"
          >
            <div className="p-3 rounded-full bg-black/50 border border-white/20 text-white backdrop-blur-md">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </div>

          <div
            onClick={nextSlide}
            className="absolute inset-y-0 right-0 w-1/4 z-10 cursor-e-resize flex items-center justify-end pr-6 group opacity-0 hover:opacity-100 transition-opacity"
          >
            <div className="p-3 rounded-full bg-black/50 border border-white/20 text-white backdrop-blur-md">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>

          {/* Central Artwork: Pure Full-Bleed High-Res Display */}
          <div
            onClick={nextSlide}
            className="relative z-10 max-h-[88vh] max-w-[90vw] flex items-center justify-center cursor-pointer"
          >
            <img
              key={currentArtwork.id}
              src={currentArtwork.image}
              alt=""
              className="max-h-[88vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg shadow-[0_25px_80px_rgba(0,0,0,0.95)] transition-all select-none animate-in fade-in zoom-in-95 duration-200"
              draggable={false}
            />
          </div>

          {/* Bottom Minimal Navigation Hints */}
          <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center text-[11px] font-mono text-neutral-500 tracking-widest pointer-events-none">
            <span>CLICK OR [← / →] TO ADVANCE // [SPACE] AUTO // [ESC] EXIT</span>
          </div>
        </div>
      )}
    </div>
  );
}
