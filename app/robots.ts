import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/cart", "/api/", "/_next/"],
      },
    ],
    sitemap: "https://grabfabs.in/sitemap.xml",
    host: "https://grabfabs.in",
  };
}
