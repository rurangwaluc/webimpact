import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { ElementType } from "react";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  ImageIcon,
  Link2,
  Save,
  Search,
  ShieldCheck,
  Star,
  StarOff,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SubmitButton } from "@/components/ui/submit-button";
import { getBlogPostForAdmin, type BlogPost } from "@/lib/cms/blog";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-[0.95rem] text-sm font-bold text-black/78 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]";

const textareaClass =
  "min-h-[190px] w-full resize-none rounded-[1.75rem] border border-black/10 bg-black/[0.025] px-5 py-4 text-sm font-bold leading-7 text-black/78 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/admin/login");
  }

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL in environment variables.");
  }

  if (user.email.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect("/");
  }
}

export default async function EditBlogPostPage({ params }: PageProps) {
  await requireAdmin();

  const { id } = await params;
 const maybePost = await getBlogPostForAdmin(id);

if (!maybePost) {
  notFound();
}

const post = maybePost;
  async function updateBlogPost(formData: FormData) {
    "use server";

    await requireAdmin();

    const title = getText(formData, "title");
    const rawSlug = getText(formData, "slug");
    const slug = slugify(rawSlug || title);
    const excerpt = getText(formData, "excerpt");
    const content = getText(formData, "content");
    const authorName = getText(formData, "author_name") || "WebImpact Lab";
    const category = getText(formData, "category") || "Business Systems";
    const metaTitle = getText(formData, "meta_title") || null;
    const metaDescription = getText(formData, "meta_description") || null;
    const status =
      getText(formData, "status") === "published" ? "published" : "draft";
    const isFeatured = getText(formData, "is_featured") === "yes";

    if (!title || !slug || !excerpt || !content || !category) {
      throw new Error("Missing required blog fields.");
    }

    let coverImageUrl = post.cover_image_url;
    const image = formData.get("cover_image");

    if (image instanceof File && image.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(image.type)) {
        throw new Error("Blog image must be JPG, PNG, or WEBP.");
      }

      if (image.size > 8 * 1024 * 1024) {
        throw new Error("Blog image must be 8MB or smaller.");
      }

      const extension =
        image.type === "image/png"
          ? "png"
          : image.type === "image/webp"
            ? "webp"
            : "jpg";

      const filePath = `${slug}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("blog-images")
        .upload(filePath, image, {
          cacheControl: "31536000",
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      coverImageUrl = publicUrlData.publicUrl;
    }

    const publishedAt =
      status === "published" && !post.published_at
        ? new Date().toISOString()
        : post.published_at;

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .update({
        title,
        slug,
        excerpt,
        content,
        cover_image_url: coverImageUrl,
        author_name: authorName,
        category,
        status,
        is_featured: isFeatured,
        meta_title: metaTitle,
        meta_description: metaDescription,
        published_at: status === "published" ? publishedAt : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");

    redirect("/admin/blog");
  }

  async function publishPost() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .update({
        status: "published",
        published_at: post.published_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blog");

    redirect(`/admin/blog/${post.id}/edit`);
  }

  async function unpublishPost() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .update({
        status: "draft",
        is_featured: false,
        published_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blog");

    redirect(`/admin/blog/${post.id}/edit`);
  }

  async function featurePost() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .update({
        status: "published",
        is_featured: true,
        published_at: post.published_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blog");

    redirect(`/admin/blog/${post.id}/edit`);
  }

  async function unfeaturePost() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .update({
        is_featured: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blog");

    redirect(`/admin/blog/${post.id}/edit`);
  }

  async function deletePost() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .delete()
      .eq("id", post.id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/blog");

    redirect("/admin/blog");
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <form
          action={updateBlogPost}
          className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]"
        >
          <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />

          <div className="relative border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to blog manager
            </Link>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Edit blog post
            </p>

            <h1 className="mt-4 max-w-4xl text-[clamp(2.15rem,5.5vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
              Improve the article before search traffic sees it.
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62">
              Keep every post useful, specific, and connected to a buyer problem.
              Blog content should support SEO, authority, and lead conversion.
            </p>
          </div>

          <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.7fr_0.3fr] lg:p-10">
            <div className="grid gap-5">
              <SectionCard
                icon={BookOpenText}
                title="Post basics"
                text="Make the article easy to understand before someone clicks."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Post title" required>
                    <input
                      name="title"
                      required
                      defaultValue={post.title}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Public link name" required>
                    <input
                      name="slug"
                      required
                      defaultValue={post.slug}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Author name">
                    <input
                      name="author_name"
                      defaultValue={post.author_name}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Category" required>
                    <input
                      name="category"
                      required
                      defaultValue={post.category}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Short excerpt" required>
                  <textarea
                    name="excerpt"
                    required
                    rows={4}
                    defaultValue={post.excerpt}
                    className={textareaClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard
                icon={FileText}
                title="Article content"
                text="Keep the structure clear and useful for business buyers."
              >
                <Field label="Full article" required>
                  <textarea
                    name="content"
                    required
                    rows={14}
                    defaultValue={post.content}
                    className="min-h-[520px] w-full resize-none rounded-[1.75rem] border border-black/10 bg-black/[0.025] px-5 py-4 text-sm font-bold leading-7 text-black/78 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
                  />
                </Field>
              </SectionCard>

              <SectionCard
                icon={ImageIcon}
                title="Image and SEO"
                text="Update the article image and search preview."
              >
                {post.cover_image_url ? (
                  <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-black dark:border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover_image_url}
                      alt={`${post.title} current cover`}
                      className="h-[340px] w-full object-cover object-center"
                    />
                  </div>
                ) : null}

                <Field label="Replace cover image">
                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-black/15 bg-black/[0.025] px-5 py-8 text-center transition hover:border-[#fd5b38]/50 hover:bg-[#fd5b38]/10 dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-[#fd5b38]/50">
                    <UploadCloud className="h-8 w-8 text-[#fd5b38]" />
                    <span className="mt-4 text-sm font-black text-black dark:text-white">
                      Upload new cover image
                    </span>
                    <span className="mt-2 max-w-sm text-xs font-semibold leading-5 text-black/50 dark:text-white/50">
                      Leave empty to keep the current image. JPG, PNG, or WEBP.
                      Max 8MB.
                    </span>

                    <input
                      name="cover_image"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                    />
                  </label>
                </Field>

                <Field label="SEO title">
                  <input
                    name="meta_title"
                    defaultValue={post.meta_title || ""}
                    placeholder="Optional. If empty, post title will be used."
                    className={inputClass}
                  />
                </Field>

                <Field label="SEO description">
                  <textarea
                    name="meta_description"
                    rows={4}
                    defaultValue={post.meta_description || ""}
                    placeholder="Optional. If empty, excerpt will be used."
                    className={textareaClass}
                  />
                </Field>
              </SectionCard>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#070707] sm:p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                  <Save className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  Update control
                </h2>

                <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                  Publish only when the post helps a real buyer understand a
                  real business problem.
                </p>

                <div className="mt-6 grid gap-4">
                  <Field label="Website visibility" required>
                    <select
                      name="status"
                      defaultValue={post.status}
                      className={inputClass}
                    >
                      <option value="draft">Draft - hidden</option>
                      <option value="published">Published - visible</option>
                    </select>
                  </Field>

                  <Field label="Feature this post?">
                    <select
                      name="is_featured"
                      defaultValue={post.is_featured ? "yes" : "no"}
                      className={inputClass}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes, feature it</option>
                    </select>
                  </Field>
                </div>

                <SubmitButton
                  label="Update blog post"
                  loadingLabel="Updating post..."
                  className="mt-6 w-full shadow-lg shadow-[#fd5b38]/25"
                />

                <BlogFastControls
                  post={post}
                  publishAction={publishPost}
                  unpublishAction={unpublishPost}
                  featureAction={featurePost}
                  unfeatureAction={unfeaturePost}
                  deleteAction={deletePost}
                />

                <div className="mt-5 grid gap-3">
                  {post.status === "published" ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:text-white"
                    >
                      <Link2 className="h-4 w-4" />
                      View public post
                    </Link>
                  ) : null}

                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Blog page
                  </Link>
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#070707]">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                  <Search className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  SEO reminder
                </h3>

                <div className="mt-4 grid gap-3 text-sm font-bold leading-6 text-black/60 dark:text-white/60">
                  <p>• Answer one clear buyer question.</p>
                  <p>• Link to one service page.</p>
                  <p>• Link to one case study when relevant.</p>
                  <p>• End with a clear contact CTA.</p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}

function BlogFastControls({
  post,
  publishAction,
  unpublishAction,
  featureAction,
  unfeatureAction,
  deleteAction,
}: {
  post: BlogPost;
  publishAction: () => Promise<void>;
  unpublishAction: () => Promise<void>;
  featureAction: () => Promise<void>;
  unfeatureAction: () => Promise<void>;
  deleteAction: () => Promise<void>;
}) {
  return (
    <div className="mt-6 rounded-[2rem] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
        Fast controls
      </p>

      <div className="mt-4 grid gap-2">
        <button
          type="submit"
          formAction={post.status === "published" ? unpublishAction : publishAction}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
        >
          {post.status === "published" ? (
            <>
              <EyeOff className="h-4 w-4" />
              Unpublish post
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Publish post
            </>
          )}
        </button>

        <button
          type="submit"
          formAction={post.is_featured ? unfeatureAction : featureAction}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
        >
          {post.is_featured ? (
            <>
              <StarOff className="h-4 w-4" />
              Remove from featured
            </>
          ) : (
            <>
              <Star className="h-4 w-4" />
              Feature post
            </>
          )}
        </button>

        <button
          type="submit"
          formAction={deleteAction}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-black text-red-700 transition hover:-translate-y-0.5 hover:bg-red-600 hover:text-white dark:text-red-300"
        >
          <Trash2 className="h-4 w-4" />
          Delete post
        </button>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-4">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
          <p className="text-sm font-bold leading-6 text-black/65 dark:text-white/65">
            Keep the post live only if it strengthens trust, search visibility,
            or buyer education.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  text,
  children,
}: {
  icon: ElementType;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#070707] sm:p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fd5b38] text-white">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
            {text}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-black dark:text-white">
        {label}
        {required ? <span className="text-[#fd5b38]"> *</span> : null}
      </span>
      {children}
    </label>
  );
}