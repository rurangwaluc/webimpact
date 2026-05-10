import { supabaseAdmin } from "@/lib/supabase/admin";
import type { SeoPage } from "./seo-pages";

export async function getPublishedSeoPageBySlug(
  slug: string,
): Promise<SeoPage | null> {
  const { data, error } = await supabaseAdmin
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as SeoPage;
}

export async function getAllPublishedSeoPages(): Promise<SeoPage[]> {
  const { data, error } = await supabaseAdmin
    .from("seo_pages")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as SeoPage[];
}