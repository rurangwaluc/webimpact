import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type BlogPostStatus = "draft" | "published";
export type BlogSearchIntent =
  | "informational"
  | "commercial"
  | "transactional"
  | "local";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  category: string;
  status: BlogPostStatus;
  is_featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  support_keywords: string[];
  search_intent: BlogSearchIntent;
  target_reader: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  reading_time_minutes: number;
  noindex: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const BLOG_SELECT = `
  id,
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  author_name,
  category,
  status,
  is_featured,
  meta_title,
  meta_description,
  focus_keyword,
  support_keywords,
  search_intent,
  target_reader,
  seo_title,
  seo_description,
  canonical_url,
  og_title,
  og_description,
  reading_time_minutes,
  noindex,
  published_at,
  created_at,
  updated_at
`;

export async function getPublishedBlogPosts() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .eq("noindex", false)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as BlogPost[];
}

export async function getFeaturedBlogPosts(limit = 3) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .eq("is_featured", true)
    .eq("noindex", false)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return (data ?? []) as BlogPost[];
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .eq("noindex", false)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data as BlogPost | null;
}

export async function getAllBlogPostsForAdmin() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as BlogPost[];
}

export async function getBlogPostForAdmin(id: string) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data as BlogPost | null;
}