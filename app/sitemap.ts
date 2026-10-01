import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/about", "/privacy", "/disclaimer"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    priority: p === "" ? 1 : 0.4,
  }));
}
