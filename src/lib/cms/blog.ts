import { supabaseAdmin } from "@/lib/supabase/admin";

export type BlogStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  category: string;
  status: BlogStatus;
  is_featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
  support_keywords: string[] | null;
  search_intent: string | null;
  target_reader: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  reading_time_minutes: number;
  noindex: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostComment = {
  id: string;
  blog_post_id: string;
  name: string;
  email: string | null;
  comment: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export type BlogPostStats = {
  views: number;
  likes: number;
  ratings: number;
  averageRating: number;
  comments: number;
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
  seo_title,
  seo_description,
  focus_keyword,
  support_keywords,
  search_intent,
  target_reader,
  canonical_url,
  og_title,
  og_description,
  reading_time_minutes,
  noindex,
  published_at,
  created_at,
  updated_at
`;

function normalizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    author_name: post.author_name || "WebImpact Lab",
    category: post.category || "Business Systems",
    reading_time_minutes: post.reading_time_minutes || 1,
    support_keywords: post.support_keywords || [],
    noindex: Boolean(post.noindex),
  };
}

export async function getPublishedBlogPosts() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as BlogPost[]).map(normalizePost);
}

export async function getFeaturedBlogPosts(limit = 4) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .eq("is_featured", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as BlogPost[]).map(normalizePost);
}

export async function getAllBlogPostsForAdmin() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as BlogPost[]).map(normalizePost);
}

export async function getBlogPostsForAdmin() {
  return getAllBlogPostsForAdmin();
}

export async function getBlogPostForAdmin(id: string) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? normalizePost(data as BlogPost) : null;
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? normalizePost(data as BlogPost) : null;
}

export async function getApprovedBlogPostComments(blogPostId: string) {
  const { data, error } = await supabaseAdmin
    .from("blog_post_comments")
    .select("id, blog_post_id, name, email, comment, status, created_at")
    .eq("blog_post_id", blogPostId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BlogPostComment[];
}

export async function getBlogPostStats(
  blogPostId: string,
): Promise<BlogPostStats> {
  const [
    viewsResponse,
    likesResponse,
    ratingsResponse,
    commentsResponse,
  ] = await Promise.all([
    supabaseAdmin
      .from("blog_post_views")
      .select("id", { count: "exact", head: true })
      .eq("blog_post_id", blogPostId),

    supabaseAdmin
      .from("blog_post_reactions")
      .select("id", { count: "exact", head: true })
      .eq("blog_post_id", blogPostId)
      .eq("liked", true),

    supabaseAdmin
      .from("blog_post_reactions")
      .select("rating")
      .eq("blog_post_id", blogPostId)
      .not("rating", "is", null),

    supabaseAdmin
      .from("blog_post_comments")
      .select("id", { count: "exact", head: true })
      .eq("blog_post_id", blogPostId)
      .eq("status", "approved"),
  ]);

  if (viewsResponse.error) throw new Error(viewsResponse.error.message);
  if (likesResponse.error) throw new Error(likesResponse.error.message);
  if (ratingsResponse.error) throw new Error(ratingsResponse.error.message);
  if (commentsResponse.error) throw new Error(commentsResponse.error.message);

  const ratingRows = (ratingsResponse.data ?? []) as { rating: number | null }[];
  const ratingValues = ratingRows
    .map((row) => row.rating)
    .filter((rating): rating is number => typeof rating === "number");

  const ratingTotal = ratingValues.reduce((sum, rating) => sum + rating, 0);

  return {
    views: viewsResponse.count ?? 0,
    likes: likesResponse.count ?? 0,
    ratings: ratingValues.length,
    averageRating:
      ratingValues.length > 0
        ? Number((ratingTotal / ratingValues.length).toFixed(1))
        : 0,
    comments: commentsResponse.count ?? 0,
  };
}

export async function recordBlogPostView({
  blogPostId,
  visitorKey,
}: {
  blogPostId: string;
  visitorKey: string;
}) {
  const cleanVisitorKey = visitorKey.trim();

  if (!cleanVisitorKey) {
    return;
  }

  const { error } = await supabaseAdmin.from("blog_post_views").upsert(
    {
      blog_post_id: blogPostId,
      visitor_key: cleanVisitorKey,
    },
    {
      onConflict: "blog_post_id,visitor_key",
      ignoreDuplicates: true,
    },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function submitBlogPostReaction({
  blogPostId,
  visitorKey,
  liked,
  rating,
}: {
  blogPostId: string;
  visitorKey: string;
  liked?: boolean;
  rating?: number | null;
}) {
  const cleanVisitorKey = visitorKey.trim();

  if (!cleanVisitorKey) {
    throw new Error("Missing visitor key.");
  }

  const cleanRating =
    typeof rating === "number" && rating >= 1 && rating <= 5 ? rating : null;

  const { error } = await supabaseAdmin.from("blog_post_reactions").upsert(
    {
      blog_post_id: blogPostId,
      visitor_key: cleanVisitorKey,
      liked: Boolean(liked),
      rating: cleanRating,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "blog_post_id,visitor_key",
    },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function submitBlogPostComment({
  blogPostId,
  name,
  email,
  comment,
}: {
  blogPostId: string;
  name: string;
  email?: string | null;
  comment: string;
}) {
  const cleanName = name.trim();
  const cleanEmail = email?.trim() || null;
  const cleanComment = comment.trim();

  if (!cleanName) {
    throw new Error("Name is required.");
  }

  if (!cleanComment || cleanComment.length < 5) {
    throw new Error("Comment is too short.");
  }

  const { error } = await supabaseAdmin.from("blog_post_comments").insert({
    blog_post_id: blogPostId,
    name: cleanName,
    email: cleanEmail,
    comment: cleanComment,
    status: "pending",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getRelatedBlogPosts({
  currentPostId,
  category,
  limit = 3,
}: {
  currentPostId: string;
  category: string;
  limit?: number;
}) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .eq("category", category)
    .neq("id", currentPostId)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as BlogPost[]).map(normalizePost);
}