import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://your-domain.com",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://your-domain.com/shop",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://your-domain.com/product",
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
