import { MetadataRoute } from "next";
import { getAllMachineSlugs } from "@/data/machines";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://last-words-spaceapps.vercel.app";
  const buildDate = new Date("2026-11-14T00:00:00.000Z");

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/teachers`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  const machineRoutes = getAllMachineSlugs().map((slug) => ({
    url: `${baseUrl}/machines/${slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...machineRoutes];
}

