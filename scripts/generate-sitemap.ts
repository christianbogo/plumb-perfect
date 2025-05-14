import * as fs from "fs";
import * as path from "path";
// Ensure servicesData is properly typed. If not, you might need to provide one.
// For example: interface Service { url: string; [key: string]: any; }
// And then: import { servicesData } from "../src/firebase/addServices" as Service[];
import { servicesData } from "../src/firebase/addServices";

interface RouteInfo {
  path: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

const DOMAIN = "https://plumbperfectwenatchee.com";
// Corrected path assuming 'public' directory is at the project root.
// __dirname in 'scripts/generate-sitemap.ts' is '.../plumb-perfect/scripts'
// So, '../public/' refers to '.../plumb-perfect/public/'
const SITEMAP_OUTPUT_PATH = path.resolve(__dirname, "../public/sitemap.xml");

const staticRoutes: RouteInfo[] = [
  { path: "/", changefreq: "monthly", priority: 1.0 },
  { path: "/services", changefreq: "monthly", priority: 0.9 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/contact", changefreq: "yearly", priority: 0.7 },
];

// It's good practice to type the items within servicesData if possible.
// For now, using 'any' to ensure compatibility if the type isn't readily available.
const dynamicServiceRoutes: RouteInfo[] = servicesData.map(
  (service: { url: string }) => ({
    path: `/service/${service.url}`,
    changefreq: "yearly",
    priority: 0.7,
  })
);

const allRoutes: RouteInfo[] = [...staticRoutes, ...dynamicServiceRoutes];

const generateSitemap = () => {
  const today = new Date().toISOString().split("T")[0];

  const sitemapEntries = allRoutes
    .map((route) => {
      return `
  <url>
    <loc><span class="math-inline">\{DOMAIN\}</span>{route.path}</loc>
    <lastmod><span class="math-inline">\{today\}</lastmod\>
<changefreq>{route.changefreq}</changefreq>
<priority>${route.priority.toFixed(1)}</priority>
</url>`;
    })
    .join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitemapEntries}
</urlset>`;

  try {
    // Ensure the output directory exists
    const outputDir = path.dirname(SITEMAP_OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`Created directory: ${outputDir}`);
    }

    fs.writeFileSync(SITEMAP_OUTPUT_PATH, sitemapXml.trim());
    console.log(`✅ Sitemap generated successfully at ${SITEMAP_OUTPUT_PATH}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1); // Exit with an error code if generation fails
  }
};

// This CommonJS pattern correctly executes the function when the script is run directly.
if (require.main === module) {
  generateSitemap();
}

export default generateSitemap; // The export is fine, though not strictly necessary if only run as a script.
