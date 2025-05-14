import * as fs from "fs"; // Node.js file system module
import * as path from "path"; // Node.js path module

// Import the services data from your addServices.ts file
// Adjust the path if your addServices.ts file is located elsewhere
import { servicesData } from "../src/firebase/addServices"; // Assuming addServices.ts is in src/

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

// --- Configuration ---
const DOMAIN = "https://plumbperfectwenatchee.com";
const SITEMAP_OUTPUT_PATH = path.resolve(__dirname, "../../public/sitemap.xml");
// Note: __dirname in a script run by ts-node from ./scripts/ will be ./scripts
// So, ../../public/ will correctly point to your_project_root/public/

// --- Define Your Routes ---

// Static routes from your App.tsx
const staticRoutes: RouteInfo[] = [
  { path: "/", changefreq: "monthly", priority: 1.0 },
  { path: "/services", changefreq: "monthly", priority: 0.9 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  // Assuming '/contact' is a page. If it's part of ContactFooter and not a distinct page, remove or adjust.
  // If you add a dedicated /contact page route in App.tsx, include it here.
  // For now, I'll assume it might become one:
  { path: "/contact", changefreq: "yearly", priority: 0.7 },
];

// Dynamic service routes from servicesData
const dynamicServiceRoutes: RouteInfo[] = servicesData.map((service) => ({
  path: `/service/${service.url}`,
  changefreq: "yearly", // Content of individual service pages likely changes less often
  priority: 0.7,
}));

// Combine all routes
const allRoutes: RouteInfo[] = [...staticRoutes, ...dynamicServiceRoutes];

// --- Sitemap Generation Logic ---
const generateSitemap = () => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const sitemapEntries = allRoutes
    .map((route) => {
      return `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
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
    fs.writeFileSync(SITEMAP_OUTPUT_PATH, sitemapXml.trim());
    console.log(`✅ Sitemap generated successfully at ${SITEMAP_OUTPUT_PATH}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1); // Exit with error code
  }
};

// --- Execute Script ---
if (require.main === module) {
  // This check ensures the script runs only when executed directly (e.g., node generate-sitemap.ts)
  // and not when imported by another module (though less relevant for this specific script).
  generateSitemap();
}

// Export for potential testing or programmatic use, though not strictly necessary for CLI execution
export default generateSitemap;
