import type { MetadataRoute } from "next";

const SITE_URL = "https://grabfabs.in";

const productSlugs = [
  "muesli",
  "peanut-butter",
  "bites",
  "loaf",
  "makhana",
  "fruit-gels",
  "snowball-coco",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productSlugs.map((slug) => ({
      url: `${SITE_URL}/products/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${SITE_URL}/cart`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.1,
    },
  ];
}
