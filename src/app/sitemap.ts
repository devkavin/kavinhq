import type { MetadataRoute } from "next";
import { getPublishedNotes, getPublishedProjects } from "@/lib/data/public";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, notes] = await Promise.all([getPublishedProjects(), getPublishedNotes()]);
  const staticRoutes = ["", "/work", "/services", "/notes", "/about", "/contact", "/lab", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(route), lastModified: new Date() })),
    ...projects.map((project) => ({ url: absoluteUrl(`/work/${project.slug}`), lastModified: new Date(project.updated_at) })),
    ...notes.map((note) => ({ url: absoluteUrl(`/notes/${note.slug}`), lastModified: new Date(note.updated_at) }))
  ];
}
