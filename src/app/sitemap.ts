import { MetadataRoute } from "next";
import { getAllMachineSlugs } from "@/data/machines";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://last-words-spaceapps.vercel.app";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/teachers`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  const machineRoutes = getAllMachineSlugs().map((slug) => ({
    url: `${baseUrl}/machines/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...machineRoutes];
}
