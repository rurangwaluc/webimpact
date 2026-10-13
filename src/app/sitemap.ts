import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/cms/blog";
import { getPublishedWorkProjects } from "@/lib/cms/work";
import { getAllPublishedSeoPages } from "@/lib/cms/seo-pages-service";

export const revalidate = 3600;

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.webimpactlab.com"
).replace(/\/+$/, "");

function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

function validDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function hasSelfCanonical(canonical: string | null, path: string): boolean {
  if (!canonical?.trim()) return true;

  try {
    const actual = new URL(canonical.trim(), `${siteUrl}/`);
    const expected = new URL(path, `${siteUrl}/`);

    const normalizePath = (value: string) => value.replace(/\/+$/, "") || "/";

    return (
      actual.origin === expected.origin &&
      normalizePath(actual.pathname) === normalizePath(expected.pathname) &&
      !actual.search
    );
  } catch {
    return false;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts, seoPages] = await Promise.all([
    getPublishedWorkProjects(),
    getPublishedBlogPosts(),
    getAllPublishedSeoPages(),
  ]);

  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/services/software-development",
    "/services/web-development",
    "/services/business-systems",
    "/services/saas-development",
    "/services/ai-automation",
    "/work",
    "/blog",
    "/contact",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
  }));

  const workRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: validDate(
      project.updated_at || project.published_at || project.created_at,
    ),
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter(
      (post) =>
        !post.noindex &&
        hasSelfCanonical(post.canonical_url, `/blog/${post.slug}`),
    )
    .map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: validDate(
        post.updated_at || post.published_at || post.created_at,
      ),
    }));

  const seoRoutes: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: validDate(page.updated_at),
  }));

  const allRoutes = [
    ...staticRoutes,
    ...workRoutes,
    ...blogRoutes,
    ...seoRoutes,
  ];

  const uniqueRoutes = new Map(allRoutes.map((route) => [route.url, route]));

  return Array.from(uniqueRoutes.values());
}
