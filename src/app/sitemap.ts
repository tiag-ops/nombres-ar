import type { MetadataRoute } from "next";
import { ANIOS, FICHAS } from "@/lib/datos";
import { GUIAS } from "@/lib/guias";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const estatico: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: ahora, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/ranking/`, lastModified: ahora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/nombres-por-letra/`, lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guia/`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/quienes-somos/`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacidad/`, lastModified: ahora, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terminos/`, lastModified: ahora, changeFrequency: "yearly", priority: 0.2 },
  ];

  const rankings: MetadataRoute.Sitemap = ANIOS.map((a) => ({
    url: `${SITE_URL}/ranking/${a}/`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: a === ANIOS[ANIOS.length - 1] ? 0.9 : 0.7,
  }));

  const fichas: MetadataRoute.Sitemap = FICHAS.map((n) => ({
    url: `${SITE_URL}/nombre/${n.toLowerCase()}/`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const letras: MetadataRoute.Sitemap = ["a", "b", "c", "d", "e"].map((l) => ({
    url: `${SITE_URL}/letra/${l}/`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const guias: MetadataRoute.Sitemap = GUIAS.map((g) => ({
    url: `${SITE_URL}/guia/${g.slug}/`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...estatico, ...rankings, ...fichas, ...letras, ...guias];
}