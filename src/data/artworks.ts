export interface Artwork {
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

export const ARTWORKS: Artwork[] = [
  {
    "id": "poster-01",
    "title": "POSTER #01",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #01 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/1.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "poster-02",
    "title": "POSTER #02",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #02 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/2.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "poster-03",
    "title": "POSTER #03",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #03 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/3.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-04",
    "title": "POSTER #04",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #04 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/4.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-05",
    "title": "5 WALI",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "5 WALI — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/5-wali.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-06",
    "title": "POSTER #05",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #05 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/5.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-07",
    "title": "POSTER #06",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #06 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/6.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-08",
    "title": "POSTER #07",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #07 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/7.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-09",
    "title": "POSTER #08",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #08 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/8.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-10",
    "title": "POSTER #09",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #09 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/9.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-11",
    "title": "POSTER #10",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #10 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/10.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-12",
    "title": "POSTER #11",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #11 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/11.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-13",
    "title": "POSTER #12",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #12 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/12.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-14",
    "title": "POSTER #13",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #13 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/13.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-15",
    "title": "14 MAY",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "14 MAY — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/14-may.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-16",
    "title": "14 MAY2222",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "14 MAY2222 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/14-may2222.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-17",
    "title": "POSTER #14",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #14 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/14.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-18",
    "title": "POSTER #15",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #15 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/15.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-19",
    "title": "16 (2)",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "16 (2) — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/16 (2).webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-20",
    "title": "POSTER #16",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #16 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/16.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-21",
    "title": "POSTER #17",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #17 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/17.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-22",
    "title": "POSTER #23",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #23 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/23.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-23",
    "title": "POSTER #61",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #61 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/61.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-24",
    "title": "POSTER #71",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #71 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/71.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-25",
    "title": "POSTER #85",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #85 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/85.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-26",
    "title": "POSTER #86",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #86 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/86.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-27",
    "title": "500 DAYS OF GARMI",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "500 DAYS OF GARMI — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/500-Days-Of-Garmi.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-28",
    "title": "POSTER #1235",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #1235 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/1235.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-29",
    "title": "1500X500",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "1500X500 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/1500x500.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-30",
    "title": "POSTER #54545",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #54545 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/54545.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-31",
    "title": "POSTER #1255111",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #1255111 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/1255111.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-32",
    "title": "POSTER #222222222222",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTER #222222222222 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/222222222222.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-33",
    "title": "AAKH",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "AAKH — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/AAKH.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-34",
    "title": "AFTER",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "AFTER — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/after.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-35",
    "title": "AMERICAN PHYCO",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "AMERICAN PHYCO — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/american-phyco.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-36",
    "title": "AOD",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "AOD — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/aod.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-37",
    "title": "ARTBOARD 3",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "ARTBOARD 3 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/Artboard 3.png",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-38",
    "title": "ARTBOARD 4",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "ARTBOARD 4 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/Artboard 4.png",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-39",
    "title": "ASAP",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "ASAP — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/asap.png",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-40",
    "title": "BEYOND LIMIT",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "BEYOND LIMIT — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/beyond limit.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-41",
    "title": "BEYOND HUMAN THOUGH122",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "BEYOND HUMAN THOUGH122 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/beyond-human-though122.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-42",
    "title": "BHBH",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "BHBH — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/bhbh.png",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-43",
    "title": "BHEDIYA",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "BHEDIYA — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/bhediya.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-44",
    "title": "BLOOM PIUNK",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "BLOOM PIUNK — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/bloom-piunk.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-45",
    "title": "BUTTERFLY",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "BUTTERFLY — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/butterfly.png",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-46",
    "title": "CBXB",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "CBXB — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/cbxb.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-47",
    "title": "CRAZYZZZ",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "CRAZYZZZ — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/crazyzzz.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-48",
    "title": "CRAZYZZZ2",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "CRAZYZZZ2 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/crazyzzz2.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-49",
    "title": "DAGDSFH",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DAGDSFH — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/dagdsfh.png",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-50",
    "title": "DAMN",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DAMN — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/damn.png",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-51",
    "title": "DDDDDVSBS",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DDDDDVSBS — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/dddddvsbs.png",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-52",
    "title": "DHURANDHAR PART 2",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DHURANDHAR PART 2 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/dhurandhar-part-2.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-53",
    "title": "DRAJE",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DRAJE — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/draje.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-54",
    "title": "DRAKE BLUE",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DRAKE BLUE — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/drake-blue.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-55",
    "title": "DRAKE ICE",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DRAKE ICE — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/drake-ice.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-56",
    "title": "DRAKE KA POSTER",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DRAKE KA POSTER — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/drake-ka-poster.png",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-57",
    "title": "DRAKE NEW",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DRAKE NEW — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/drake-new.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-58",
    "title": "DRAKE THRESHOLD NAYA 6 GOD",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DRAKE THRESHOLD NAYA 6 GOD — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/Drake-threshold-naya-6-god.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-59",
    "title": "DRAKE TIMEPASS",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DRAKE TIMEPASS — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/DRAKE-TIMEPASS.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-60",
    "title": "DSGSDHGJ",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DSGSDHGJ — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/dsgsdhgj.png",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-61",
    "title": "DUA BHUA",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DUA BHUA — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/dua-bhua.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-62",
    "title": "DUA LIPA NEW",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "DUA LIPA NEW — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/dua-lipa-new.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-63",
    "title": "EMIWAYPAKKAA",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "EMIWAYPAKKAA — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/emiwaypakkaa.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-64",
    "title": "FDGSFHSRHETJTE",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "FDGSFHSRHETJTE — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/fdgsfhsrhetjte.png",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-65",
    "title": "FIGHT CLUB POSTER ARENA",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "FIGHT CLUB POSTER ARENA — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/fight-club-poster-arena.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-66",
    "title": "GDGDFH",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "GDGDFH — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/gdgdfh.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-67",
    "title": "GLASS EFFECT 4 SAATH ME REKHA",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "GLASS EFFECT 4 SAATH ME REKHA — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/glass-effect-4-saath-me-rekha.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-68",
    "title": "GRYSGARYURSGUIH",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "GRYSGARYURSGUIH — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/grysgaryursguih.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-69",
    "title": "HARRY POTTER MOVIE 1",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "HARRY POTTER MOVIE 1 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/harry-potter-movie-1.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-70",
    "title": "HHGGGGGFBFU",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "HHGGGGGFBFU — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/hhgggggfbfu.png",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-71",
    "title": "HIIIII",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "HIIIII — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/hiiiii.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-72",
    "title": "ICEMAN BABY PHONE",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "ICEMAN BABY PHONE — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/iceman-baby-phone.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-73",
    "title": "ICEMANNEW",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "ICEMANNEW — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/icemannew.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-74",
    "title": "IDK WHAT I M MAKING",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "IDK WHAT I M MAKING — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/idk-what-i-m-making.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-75",
    "title": "IKKA FUBU",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "IKKA FUBU — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/ikka-fubu.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-76",
    "title": "KAL BANUNGAAAAAA",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "KAL BANUNGAAAAAA — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/KAL-BANUNGAAAAAA.png",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-77",
    "title": "KANYE FATHER11",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "KANYE FATHER11 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/kanye-father11.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-78",
    "title": "KANYEEE",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "KANYEEE — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/kanyeee.png",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-79",
    "title": "KANYEEEEE",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "KANYEEEEE — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/kanyeeeee.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-80",
    "title": "KING MM INSTA POST GLOW",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "KING MM INSTA POST GLOW — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/king-mm-insta-post-glow.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-81",
    "title": "KRSNAAAAAAAA",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "KRSNAAAAAAAA — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/krsnaaaaaaaa.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-82",
    "title": "LOML VALENTINE22",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "LOML VALENTINE22 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/loml-valentine22.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-83",
    "title": "LOSING CONTROL BW",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "LOSING CONTROL BW — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/losing-control-bw.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-84",
    "title": "LOSING CONTROL PSD",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "LOSING CONTROL PSD — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/losing-control-psd.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-85",
    "title": "LOSING CONTROL RED",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "LOSING CONTROL RED — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/losing-control-red.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-86",
    "title": "MAA KI AAKH 2",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MAA KI AAKH 2 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/maa-ki-aakh-2.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-87",
    "title": "MEET JOE BLACK RED",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MEET JOE BLACK RED — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/meet-joe-black-red.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-88",
    "title": "MEET JOE BLACK",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MEET JOE BLACK — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/meet-joe-black.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-89",
    "title": "MICHAEL JACKSON",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MICHAEL JACKSON — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/Michael-Jackson.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-90",
    "title": "MIRROR",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MIRROR — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/mirror.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-91",
    "title": "MJ",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MJ — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/mj.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-92",
    "title": "NEW POST SHAAM 13 APRIL",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "NEW POST SHAAM 13 APRIL — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/new-post-shaam-13-april.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-93",
    "title": "NEW POST SHAAM 13 APRIL11",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "NEW POST SHAAM 13 APRIL11 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/new-post-shaam-13-april11.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-94",
    "title": "NEW THAT METALIC SHITTT",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "NEW THAT METALIC SHITTT — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/new-that-metalic-shittt.png",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-95",
    "title": "OBESSION2",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "OBESSION2 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/obession2.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-96",
    "title": "OBESSION3",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "OBESSION3 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/obession3.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-97",
    "title": "PAANI3",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "PAANI3 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/paani3.png",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-98",
    "title": "PLOT TWIST",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "PLOT TWIST — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/plot-twist.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-99",
    "title": "POSTERRR",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "POSTERRR — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/POSTERRR.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-100",
    "title": "RAI",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "RAI — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/rai.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-101",
    "title": "RAN TO",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "RAN TO — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/ran-to.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-102",
    "title": "RCB",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "RCB — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/rcb.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-103",
    "title": "REWTERGERSYD",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "REWTERGERSYD — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/rewtergersyd.png",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-104",
    "title": "SILENT CHAOS",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SILENT CHAOS — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/SILENT-CHAOS.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-105",
    "title": "SM",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SM — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/sm.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-106",
    "title": "TALA IN LOCK IN GAY 2",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "TALA IN LOCK IN GAY 2 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/tala-in-lock-in-gay-2.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-107",
    "title": "TALA IN LOOCK IN",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "TALA IN LOOCK IN — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/tala-in-loock-in.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-108",
    "title": "TASHRAJ PISSED OFF POSTER",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "TASHRAJ PISSED OFF POSTER — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/tashraj-pissed-off-poster.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-109",
    "title": "TRAVISS DA",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "TRAVISS DA — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/traviss-da.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-110",
    "title": "VIRAT NEW",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "VIRAT NEW — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/virat-new.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-111",
    "title": "VIRAT2",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "VIRAT2 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/virat2.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "poster-112",
    "title": "YE BULLY PORTRAIT LESS NOISE",
    "category": "Poster",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "YE BULLY PORTRAIT LESS NOISE — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/poster/ye-bully-portrait-less-noise.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Poster",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-01",
    "title": "SOCIAL #01",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #01 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/1.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "social-02",
    "title": "SOCIAL #02",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #02 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/2.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "social-03",
    "title": "SOCIAL #03",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #03 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/3.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-04",
    "title": "SOCIAL #04",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #04 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/4.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-05",
    "title": "SOCIAL #05",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #05 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/5.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-06",
    "title": "SOCIAL #06",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #06 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/6.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-07",
    "title": "SOCIAL #07",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #07 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/7.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-08",
    "title": "SOCIAL #08",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #08 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/8.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-09",
    "title": "SOCIAL #09",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #09 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/9.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-10",
    "title": "SOCIAL #10",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #10 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/10.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-11",
    "title": "SOCIAL #11",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #11 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/11.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-12",
    "title": "SOCIAL #12",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #12 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/12.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "social-13",
    "title": "SOCIAL #13",
    "category": "Social",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "SOCIAL #13 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/social/13.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Social",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "website-01",
    "title": "WEBSITE #01",
    "category": "Website",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "WEBSITE #01 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/website/1.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Website",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "website-02",
    "title": "WEBSITE #02",
    "category": "Website",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "WEBSITE #02 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/website/2.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Website",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "website-03",
    "title": "WEBSITE #03",
    "category": "Website",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "WEBSITE #03 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/website/3.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Website",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "website-04",
    "title": "WEBSITE #04",
    "category": "Website",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "WEBSITE #04 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/website/4.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Website",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "application-01",
    "title": "APP1",
    "category": "Application",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "APP1 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/application/app1.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Application",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "application-02",
    "title": "APP2",
    "category": "Application",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "APP2 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/application/app2.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Application",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "application-03",
    "title": "APP3",
    "category": "Application",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "APP3 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/application/app3.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Application",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "magazine-01",
    "title": "MAGAZINE #01",
    "category": "Magazine",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MAGAZINE #01 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/magazine/1.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Magazine",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "magazine-02",
    "title": "MAGAZINE #02",
    "category": "Magazine",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MAGAZINE #02 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/magazine/2.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Magazine",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "magazine-03",
    "title": "MAGAZINE #03",
    "category": "Magazine",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MAGAZINE #03 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/magazine/3.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Magazine",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "magazine-04",
    "title": "MAGAZINE #04",
    "category": "Magazine",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MAGAZINE #04 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/magazine/4.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Magazine",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "movie-01",
    "title": "MOVIE #01",
    "category": "Movie",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MOVIE #01 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/movie/1.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Movie",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "movie-02",
    "title": "MOVIE #02",
    "category": "Movie",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "MOVIE #02 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/movie/2.webp",
    "palette": [
      "#020617",
      "#6366f1",
      "#a855f7",
      "#f1f5f9"
    ],
    "tags": [
      "Movie",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "movie-03",
    "title": "STRANGERS POSTER ARENA PAPER",
    "category": "Movie",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "STRANGERS POSTER ARENA PAPER — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/movie/strangers-poster-arena-paper.webp",
    "palette": [
      "#171717",
      "#14b8a6",
      "#06b6d4",
      "#f5f5f5"
    ],
    "tags": [
      "Movie",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "newspaper-01",
    "title": "NEWSPAPER #01",
    "category": "Newspaper",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "NEWSPAPER #01 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/newspaper/1.webp",
    "palette": [
      "#0f172a",
      "#38bdf8",
      "#818cf8",
      "#ffffff"
    ],
    "tags": [
      "Newspaper",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "newspaper-02",
    "title": "NEWSPAPER #02",
    "category": "Newspaper",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "NEWSPAPER #02 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/newspaper/2.webp",
    "palette": [
      "#0a0a0c",
      "#8b5cf6",
      "#3b82f6",
      "#f8fafc"
    ],
    "tags": [
      "Newspaper",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "newspaper-03",
    "title": "NEWSPAPER #03",
    "category": "Newspaper",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "NEWSPAPER #03 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/newspaper/3.webp",
    "palette": [
      "#09090b",
      "#ec4899",
      "#06b6d4",
      "#e2e8f0"
    ],
    "tags": [
      "Newspaper",
      "Curation",
      "Visual Archive"
    ],
    "featured": false
  },
  {
    "id": "calendar-01",
    "title": "CALENDAR #01",
    "category": "Calendar",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "CALENDAR #01 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/calendar/1.webp",
    "palette": [
      "#18181b",
      "#f59e0b",
      "#10b981",
      "#fafafa"
    ],
    "tags": [
      "Calendar",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  },
  {
    "id": "calendar-02",
    "title": "CALENDAR #02",
    "category": "Calendar",
    "date": "2026",
    "pinterest_url": "https://pinterest.com/shubhamgoatfr",
    "description": "CALENDAR #02 — Curated visual archive by shubhamgoatfr.",
    "aspect_ratio": "portrait",
    "image": "/calendar/2.webp",
    "palette": [
      "#0c0a09",
      "#ef4444",
      "#f97316",
      "#f5f5f4"
    ],
    "tags": [
      "Calendar",
      "Curation",
      "Visual Archive"
    ],
    "featured": true
  }
];

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
