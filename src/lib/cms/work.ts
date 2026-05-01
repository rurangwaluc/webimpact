import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type WorkProject = {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  project_type: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  cover_image_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const workFields =
  "id,title,slug,client_name,project_type,summary,problem,solution,result,cover_image_url,live_url,is_featured,status,published_at,created_at,updated_at";

export async function getPublishedWorkProjects() {
  const { data, error } = await supabaseAdmin
    .from("work_projects")
    .select(workFields)
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as WorkProject[];
}

export async function getFeaturedWorkProjects(limit = 3) {
  const { data, error } = await supabaseAdmin
    .from("work_projects")
    .select(workFields)
    .eq("status", "published")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as WorkProject[];
}

export async function getPublishedWorkProjectBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("work_projects")
    .select(workFields)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as WorkProject | null;
}