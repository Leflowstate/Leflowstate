import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { legalNav } from "@/content/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalUpdate = new Date(siteConfig.legal.lastUpdated);

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...legalNav.map((page) => ({
      url: `${siteConfig.url}${page.href}`,
      lastModified: legalUpdate,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
