import fs from "fs";
import { ARTWORKS } from "../src/data/artworks.ts";
import spatialLayoutRaw from "../src/data/spatialLayout.json" with { type: "json" };

const artMap = new Map();
ARTWORKS.forEach((a) => artMap.set(a.id, a));

let imagesXml = "";
spatialLayoutRaw.forEach((item) => {
  const art = artMap.get(item.id);
  if (art && art.image) {
    const titleEscaped = (art.title || "Graphic Design Artwork")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
    const loc =
      "https://shubhamgoatfr.netlify.app" +
      (art.image.startsWith("/") ? "" : "/") +
      art.image;
    imagesXml += `    <image:image>
      <image:loc>${loc}</image:loc>
      <image:title>${titleEscaped} — ${art.category} Design by Shubham Kumawat (Shubhamgoatfr)</image:title>
    </image:image>\n`;
  }
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://shubhamgoatfr.netlify.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${imagesXml}  </url>
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", sitemap, "utf8");
console.log("Successfully generated public/sitemap.xml with artwork images.");
