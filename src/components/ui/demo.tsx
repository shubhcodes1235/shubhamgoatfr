// This is a file with a demo for your component
// That's what users will see in the preview
// Create new files in this directory to add more demos

import { ImageStreamHero } from "@/components/ui/image-stream-hero";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    alt: "Ethereal classical oil painting with contemporary surrealist aesthetic",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Fluid liquid acrylic abstract 3D wave in obsidian and chrome",
  },
  {
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    alt: "Prismatic geometric glass refraction with holographic light caustics",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimalist concrete brutalist architecture against twilight sky",
  },
  {
    src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
    alt: "Neon cybernetic nightscape with high-contrast reflection",
  },
  {
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    alt: "Deep indigo atmospheric void with floating sculptural fragments",
  },
  {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Dynamic kinetic typography poster composition with high editorial contrast",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Chromatic distortion and iridescent fluid surface",
  },
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    alt: "Baroque sculpture immersed in vibrant modern gradient shadows",
  },
  {
    src: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&q=80",
    alt: "3D iridescent cloth simulation hovering in zero gravity",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    alt: "Macro technological circuitry with warm neon copper glow",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    alt: "Cinematic moody portrait with sharp directional chiaroscuro lighting",
  },
];

// ONLY DEFAULT EXPORT WILL BE TREATED AS A DEMO
export default function DemoOne() {
  return (
    <ImageStreamHero
      images={IMAGES}
      className="h-140 w-full rounded-lg border border-neutral-800 bg-neutral-950"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center pointer-events-none">
        <div className="px-6">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-2">
            Archival Stream // Perspective Rush
          </span>
          <h1 className="text-balance text-4xl font-medium tracking-tight text-white sm:text-5xl font-sans">
            Your work,
            <br />
            front and centre.
          </h1>
        </div>
        <p className="max-w-md text-balance px-6 text-xs sm:text-sm text-neutral-400 font-mono tracking-wide">
          A hero that leads with the images instead of describing them. Swap in
          your own and the corridor rebuilds around them.
        </p>
      </div>
    </ImageStreamHero>
  );
}
