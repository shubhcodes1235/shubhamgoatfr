import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const categories = ['poster', 'social', 'website', 'application', 'magazine', 'movie', 'newspaper', 'calendar'];

const categoryNames = {
  poster: 'Poster',
  social: 'Social',
  website: 'Website',
  application: 'Application',
  magazine: 'Magazine',
  movie: 'Movie',
  newspaper: 'Newspaper',
  calendar: 'Calendar'
};

const palettes = [
  ['#0a0a0c', '#8b5cf6', '#3b82f6', '#f8fafc'],
  ['#09090b', '#ec4899', '#06b6d4', '#e2e8f0'],
  ['#18181b', '#f59e0b', '#10b981', '#fafafa'],
  ['#0c0a09', '#ef4444', '#f97316', '#f5f5f4'],
  ['#020617', '#6366f1', '#a855f7', '#f1f5f9'],
  ['#171717', '#14b8a6', '#06b6d4', '#f5f5f5'],
  ['#0f172a', '#38bdf8', '#818cf8', '#ffffff']
];

function formatTitle(catName, filename) {
  const base = filename.replace(/\.(webp|png|jpg|jpeg|svg)$/i, '');
  if (/^\d+$/.test(base)) {
    return `${catName.toUpperCase()} #${base.padStart(2, '0')}`;
  }
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

const items = [];
let idCounter = 1;

for (const cat of categories) {
  const catDir = path.join(publicDir, cat);
  if (!fs.existsSync(catDir)) continue;
  const files = fs.readdirSync(catDir).filter(f => /\.(webp|png|jpg|jpeg|svg)$/i.test(f));
  
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  files.forEach((file, idx) => {
    const catName = categoryNames[cat];
    const title = formatTitle(catName, file);
    const pal = palettes[(idCounter - 1) % palettes.length];
    items.push({
      id: `${cat}-${(idx + 1).toString().padStart(2, '0')}`,
      title,
      category: catName,
      date: '2026',
      pinterest_url: 'https://pinterest.com/shubhamgoatfr',
      description: `${title} — Curated visual archive by shubhamgoatfr.`,
      aspect_ratio: 'portrait',
      image: `/${cat}/${file}`,
      palette: pal,
      tags: [catName, 'Curation', 'Visual Archive'],
      featured: idx < 2
    });
    idCounter++;
  });
}

const fileContent = `export interface Artwork {
  id: string;
  title: string;
  category: "Poster" | "Social" | "Website" | "Application" | "Magazine" | "Movie" | "Newspaper" | "Calendar";
  date: string;
  pinterest_url: string;
  description: string;
  aspect_ratio: "portrait" | "square" | "landscape" | "tall";
  image: string;
  palette: string[];
  tags: string[];
  featured?: boolean;
}

export const ARTWORKS: Artwork[] = ${JSON.stringify(items, null, 2)};

export const GALLERY_CATEGORIES = [
  "All",
  "Poster",
  "Social",
  "Website",
  "Application",
  "Magazine",
  "Movie",
  "Newspaper",
  "Calendar",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
`;

fs.writeFileSync(path.join(rootDir, 'src', 'data', 'artworks.ts'), fileContent, 'utf8');
console.log(`Successfully generated src/data/artworks.ts with ${items.length} artworks across ${categories.length} categories.`);

