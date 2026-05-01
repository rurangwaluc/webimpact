import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { ElementType } from "react";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  FileText,
  ImageIcon,
  Link2,
  Save,
  Search,
  Sparkles,
  Target,
  UploadCloud,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SubmitButton } from "@/components/ui/submit-button";
import { PremiumSelect } from "@/components/ui/premium-select";
import { BlogCoverUploadField } from "@/components/admin/blog-cover-upload-field";

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-[0.95rem] text-sm font-bold text-black/78 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]";

const textareaClass =
  "min-h-[190px] w-full resize-none rounded-[1.75rem] border border-black/10 bg-black/[0.025] px-5 py-4 text-sm font-bold leading-7 text-black/78 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]";

const categoryOptions = [
  {
    value: "Software Development",
    label: "Software Development",
    description: "Custom systems, platforms, and backend/frontend builds.",
  },
  {
    value: "Web Development",
    label: "Web Development",
    description: "Websites, landing pages, SEO pages, and conversion pages.",
  },
  {
    value: "Business Systems",
    label: "Business Systems",
    description: "Operations, dashboards, workflows, and internal tools.",
  },
  {
    value: "Dashboards",
    label: "Dashboards",
    description: "Reporting, analytics, KPIs, and business visibility.",
  },
  {
    value: "Automation",
    label: "Automation",
    description: "Manual work reduction, process automation, and alerts.",
  },
  {
    value: "SaaS",
    label: "SaaS",
    description: "Subscription platforms, portals, and product systems.",
  },
  {
    value: "SEO",
    label: "SEO",
    description: "Search growth, programmatic SEO, and content strategy.",
  },
];

const searchIntentOptions = [
  {
    value: "informational",
    label: "Informational",
    description: "Reader wants to learn or understand a topic.",
  },
  {
    value: "commercial",
    label: "Commercial",
    description: "Reader is comparing options before buying.",
  },
  {
    value: "transactional",
    label: "Transactional",
    description: "Reader is close to taking action.",
  },
  {
    value: "local",
    label: "Local",
    description: "Reader searches with a place like Kigali or Rwanda.",
  },
];

const statusOptions = [
  {
    value: "draft",
    label: "Draft - hidden",
    description: "Only visible inside admin.",
  },
  {
    value: "published",
    label: "Published - visible",
    description: "Visible on the public blog.",
  },
];

const featuredOptions = [
  {
    value: "no",
    label: "No",
    description: "Keep it as a normal blog post.",
  },
  {
    value: "yes",
    label: "Yes, feature it",
    description: "Use it as a stronger homepage/blog highlight.",
  },
];

const indexingOptions = [
  {
    value: "no",
    label: "Index in Google",
    description: "Allow this post to appear in search results.",
  },
  {
    value: "yes",
    label: "Noindex - hide from Google",
    description:
      "Public page stays visible, but search engines should not rank it.",
  },
];

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

function getKeywordList(formData: FormData, key: string) {
  return getText(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function getImageExtension(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

async function uploadBlogImage(file: File, pathPrefix: string) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Blog images must be JPG, PNG, or WEBP.");
  }

  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Each blog image must be 8MB or smaller.");
  }

  const extension = getImageExtension(file.type);
  const filePath = `${pathPrefix}-${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("blog-images")
    .upload(filePath, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabaseAdmin.storage
    .from("blog-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
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

export default async function NewBlogPostPage() {
  await requireAdmin();

  async function createBlogPost(formData: FormData) {
    "use server";

    await requireAdmin();

    const title = getText(formData, "title");
    const rawSlug = getText(formData, "slug");
    const slug = slugify(rawSlug || title);
    const excerpt = getText(formData, "excerpt");
    const rawContent = getText(formData, "content");
    const authorName = getText(formData, "author_name") || "WebImpact Lab";
    const category = getText(formData, "category") || "Business Systems";
    const focusKeyword = getText(formData, "focus_keyword") || null;
    const supportKeywords = getKeywordList(formData, "support_keywords");
    const searchIntent = getText(formData, "search_intent") || "commercial";
    const targetReader = getText(formData, "target_reader") || null;
    const seoTitle = getText(formData, "seo_title") || null;
    const seoDescription = getText(formData, "seo_description") || null;
    const canonicalUrl = getText(formData, "canonical_url") || null;
    const ogTitle = getText(formData, "og_title") || null;
    const ogDescription = getText(formData, "og_description") || null;
    const status =
      getText(formData, "status") === "published" ? "published" : "draft";
    const isFeatured = getText(formData, "is_featured") === "yes";
    const noindex = getText(formData, "noindex") === "yes";

    if (!title || !slug || !excerpt || !rawContent || !category) {
      throw new Error("Missing required blog fields.");
    }

    let coverImageUrl: string | null = null;
    const coverImage = formData.get("cover_image");

    if (coverImage instanceof File && coverImage.size > 0) {
      coverImageUrl = await uploadBlogImage(coverImage, `${slug}/cover`);
    }

    const inlineImageFiles = formData
      .getAll("inline_images")
      .filter((item): item is File => item instanceof File && item.size > 0);

    const inlineImageUrls: string[] = [];

    for (const file of inlineImageFiles) {
      const url = await uploadBlogImage(file, `${slug}/inline`);
      inlineImageUrls.push(url);
    }

    const inlineImagesMarkdown =
      inlineImageUrls.length > 0
        ? `\n\n## Supporting images\n\n${inlineImageUrls
            .map((url, index) => `![${title} supporting image ${index + 1}](${url})`)
            .join("\n\n")}`
        : "";

    const content = `${rawContent}${inlineImagesMarkdown}`;
    const readingTimeMinutes = getReadingTime(content);

    const publishedAt =
      status === "published" ? new Date().toISOString() : null;

    const { error } = await supabaseAdmin.from("blog_posts").insert({
      title,
      slug,
      excerpt,
      content,
      cover_image_url: coverImageUrl,
      author_name: authorName,
      category,
      status,
      is_featured: isFeatured,
      meta_title: seoTitle,
      meta_description: seoDescription,
      focus_keyword: focusKeyword,
      support_keywords: supportKeywords,
      search_intent: searchIntent,
      target_reader: targetReader,
      seo_title: seoTitle,
      seo_description: seoDescription,
      canonical_url: canonicalUrl,
      og_title: ogTitle,
      og_description: ogDescription,
      reading_time_minutes: readingTimeMinutes,
      noindex,
      published_at: publishedAt,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    redirect("/admin/blog");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <form
          action={createBlogPost}
          className="relative rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]"
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
              Add blog post
            </p>

            <h1 className="mt-4 max-w-5xl text-[clamp(2.35rem,5.7vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-black dark:text-white">
              Create content that ranks, teaches, and converts buyers.
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62">
              Write for real business owners first. Use SEO fields to make the
              post easier to discover, but keep the article useful enough to
              build trust.
            </p>
          </div>

          <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:p-10 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div className="grid gap-5">
              <SectionCard
                icon={BookOpenText}
                title="Post basics"
                text="Make the article clear before someone clicks."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Post title" required>
                    <input
                      name="title"
                      required
                      placeholder="Example: How Much Does Custom Software Cost in Rwanda?"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Public link name">
                    <input
                      name="slug"
                      placeholder="custom-software-cost-rwanda"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Author name">
                    <input
                      name="author_name"
                      defaultValue="WebImpact Lab"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Category" required>
                    <PremiumSelect
                      name="category"
                      defaultValue="Software Development"
                      options={categoryOptions}
                    />
                  </Field>
                </div>

                <Field label="Short excerpt" required>
                  <textarea
                    name="excerpt"
                    required
                    rows={4}
                    placeholder="Short summary for cards, meta previews, and readers."
                    className={textareaClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard
                icon={Target}
                title="SEO targeting"
                text="These fields help every article target a clear search opportunity."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Focus keyword">
                    <input
                      name="focus_keyword"
                      placeholder="custom software cost in Rwanda"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Search intent">
                    <PremiumSelect
                      name="search_intent"
                      defaultValue="commercial"
                      options={searchIntentOptions}
                    />
                  </Field>
                </div>

                <Field label="Support keywords">
                  <textarea
                    name="support_keywords"
                    rows={4}
                    placeholder="software development Rwanda, dashboard development Rwanda, business system Kigali"
                    className={textareaClass}
                  />
                </Field>

                <Field label="Target reader">
                  <textarea
                    name="target_reader"
                    rows={4}
                    placeholder="Example: Business owners in Rwanda comparing whether to build custom software, dashboards, automation, or a business system."
                    className={textareaClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard
                icon={FileText}
                title="Article content"
                text="Use headings, short paragraphs, useful examples, and a clear CTA."
              >
                <Field label="Full article" required>
                  <textarea
                    name="content"
                    required
                    rows={18}
                    placeholder={`## Introduction

Explain the buyer problem clearly.

## Why this matters

Show the business cost.

## What affects the decision

- Point one
- Point two
- Point three

## What to do next

Give practical steps.

## Final advice

Connect the article to WebImpact Lab services.`}
                    className="min-h-[620px] w-full resize-none rounded-[1.75rem] border border-black/10 bg-black/[0.025] px-5 py-4 text-sm font-bold leading-7 text-black/78 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
                  />
                </Field>
              </SectionCard>

              <SectionCard
                icon={ImageIcon}
                title="Images"
                text="Add one cover image and optional images inside the article."
              >
                <Field label="Cover image">
                  <BlogCoverUploadField />
                </Field>

                <Field label="Images inside the article">
                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-black/15 bg-black/[0.025] px-5 py-8 text-center transition hover:border-[#fd5b38]/50 hover:bg-[#fd5b38]/10 dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-[#fd5b38]/50">
                    <UploadCloud className="h-8 w-8 text-[#fd5b38]" />
                    <span className="mt-4 text-sm font-black text-black dark:text-white">
                      Upload supporting article images
                    </span>
                    <span className="mt-2 max-w-sm text-xs font-semibold leading-5 text-black/50 dark:text-white/50">
                      Select multiple images. They will be added to the bottom
                      of the article automatically.
                    </span>

                    <input
                      name="inline_images"
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                    />
                  </label>
                </Field>
              </SectionCard>

              <SectionCard
                icon={Sparkles}
                title="Search preview"
                text="Control how the article appears in Google and social previews."
              >
                <Field label="SEO title">
                  <input
                    name="seo_title"
                    placeholder="Custom Software Cost in Rwanda: What Business Owners Should Know"
                    className={inputClass}
                  />
                </Field>

                <Field label="SEO description">
                  <textarea
                    name="seo_description"
                    rows={4}
                    placeholder="Learn what affects custom software cost in Rwanda, when it is worth building, and how business owners can plan better."
                    className={textareaClass}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Open Graph title">
                    <input
                      name="og_title"
                      placeholder="Optional social sharing title"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Canonical URL">
                    <input
                      name="canonical_url"
                      placeholder="Optional canonical URL"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Open Graph description">
                  <textarea
                    name="og_description"
                    rows={4}
                    placeholder="Optional social sharing description"
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
                  Publish control
                </h2>

                <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                  Publish only when the post is useful, specific, and connected
                  to a buyer problem.
                </p>

                <div className="mt-6 grid gap-4">
                  <Field label="Website visibility" required>
                    <PremiumSelect
                      name="status"
                      defaultValue="draft"
                      options={statusOptions}
                    />
                  </Field>

                  <Field label="Feature this post?">
                    <PremiumSelect
                      name="is_featured"
                      defaultValue="no"
                      options={featuredOptions}
                    />
                  </Field>

                  <Field label="Search indexing">
                    <PremiumSelect
                      name="noindex"
                      defaultValue="no"
                      options={indexingOptions}
                    />
                  </Field>
                </div>

                <SubmitButton
                  label="Save blog post"
                  loadingLabel="Saving post..."
                  className="mt-6 w-full shadow-lg shadow-[#fd5b38]/25"
                />

                <div className="mt-6 rounded-[1.75rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                    <p className="text-sm font-bold leading-6 text-black/65 dark:text-white/65">
                      Strong blog posts should answer a real search question,
                      link to a service, link to proof, and end with a clear
                      contact action.
                    </p>
                  </div>
                </div>

                <Link
                  href="/blog"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-black transition hover:text-[#fd5b38] dark:text-white"
                >
                  <Link2 className="h-4 w-4" />
                  View public Blog page
                </Link>
              </div>

              <div className="mt-5 rounded-[2rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#070707]">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                  <Search className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  First money topics
                </h3>

                <div className="mt-4 grid gap-3 text-sm font-bold leading-6 text-black/60 dark:text-white/60">
                  <p>• Custom software cost in Rwanda</p>
                  <p>• Why businesses outgrow Excel</p>
                  <p>• Dashboard mistakes owners make</p>
                  <p>• Website vs business system</p>
                  <p>• Automation for SMEs in Rwanda</p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
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