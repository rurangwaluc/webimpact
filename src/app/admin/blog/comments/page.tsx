import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Trash2,
  XCircle,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SubmitButton } from "@/components/ui/submit-button";

type BlogCommentStatus = "pending" | "approved" | "rejected";

type BlogPostPreview = {
  id: string;
  title: string;
  slug: string;
};

type RawBlogCommentRow = {
  id: string;
  blog_post_id: string;
  name: string;
  email: string | null;
  comment: string;
  status: BlogCommentStatus;
  created_at: string;
  blog_posts: BlogPostPreview | BlogPostPreview[] | null;
};

type BlogCommentRow = {
  id: string;
  blog_post_id: string;
  name: string;
  email: string | null;
  comment: string;
  status: BlogCommentStatus;
  created_at: string;
  blog_post: BlogPostPreview | null;
};

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

function normalizeComment(row: RawBlogCommentRow): BlogCommentRow {
  const post = Array.isArray(row.blog_posts)
    ? row.blog_posts[0] || null
    : row.blog_posts;

  return {
    id: row.id,
    blog_post_id: row.blog_post_id,
    name: row.name,
    email: row.email,
    comment: row.comment,
    status: row.status,
    created_at: row.created_at,
    blog_post: post,
  };
}

async function getComments() {
  const { data, error } = await supabaseAdmin
    .from("blog_post_comments")
    .select(
      `
      id,
      blog_post_id,
      name,
      email,
      comment,
      status,
      created_at,
      blog_posts (
        id,
        title,
        slug
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as unknown as RawBlogCommentRow[]).map(normalizeComment);
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export default async function BlogCommentsModerationPage() {
  await requireAdmin();

  const comments = await getComments();

  const pendingComments = comments.filter(
    (comment) => comment.status === "pending",
  );
  const approvedComments = comments.filter(
    (comment) => comment.status === "approved",
  );
  const rejectedComments = comments.filter(
    (comment) => comment.status === "rejected",
  );

  async function approveComment(formData: FormData) {
    "use server";

    await requireAdmin();

    const id = getText(formData, "id");
    const slug = getText(formData, "slug");

    const { error } = await supabaseAdmin
      .from("blog_post_comments")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/blog/comments");
    revalidatePath("/blog");
    if (slug) revalidatePath(`/blog/${slug}`);
  }

  async function rejectComment(formData: FormData) {
    "use server";

    await requireAdmin();

    const id = getText(formData, "id");
    const slug = getText(formData, "slug");

    const { error } = await supabaseAdmin
      .from("blog_post_comments")
      .update({ status: "rejected" })
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/blog/comments");
    if (slug) revalidatePath(`/blog/${slug}`);
  }

  async function deleteComment(formData: FormData) {
    "use server";

    await requireAdmin();

    const id = getText(formData, "id");
    const slug = getText(formData, "slug");

    const { error } = await supabaseAdmin
      .from("blog_post_comments")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/blog/comments");
    if (slug) revalidatePath(`/blog/${slug}`);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
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
              Comment moderation
            </p>

            <h1 className="mt-4 max-w-4xl text-[clamp(2.15rem,5.5vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
              Control what appears under your articles.
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62">
              Approve useful comments, reject weak ones, and delete spam before
              it reaches the public blog.
            </p>
          </div>

          <div className="relative grid gap-4 p-6 sm:grid-cols-3 sm:p-8 lg:p-10">
            <StatsCard label="Pending" value={pendingComments.length} />
            <StatsCard label="Approved" value={approvedComments.length} />
            <StatsCard label="Rejected" value={rejectedComments.length} />
          </div>

          <div className="relative grid gap-6 border-t border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
            <CommentSection
              title="Pending comments"
              description="Review these before they appear publicly."
              comments={pendingComments}
              emptyText="No pending comments right now."
              approveAction={approveComment}
              rejectAction={rejectComment}
              deleteAction={deleteComment}
              showApprove
              showReject
            />

            <CommentSection
              title="Approved comments"
              description="These are visible on public blog posts."
              comments={approvedComments}
              emptyText="No approved comments yet."
              approveAction={approveComment}
              rejectAction={rejectComment}
              deleteAction={deleteComment}
              showReject
            />

            <CommentSection
              title="Rejected comments"
              description="These are hidden from public pages."
              comments={rejectedComments}
              emptyText="No rejected comments."
              approveAction={approveComment}
              rejectAction={rejectComment}
              deleteAction={deleteComment}
              showApprove
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatsCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#070707]">
      <div className="flex items-center justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38]/15 text-[#fd5b38]">
          <MessageCircle className="h-5 w-5" />
        </div>

        <p className="text-4xl font-semibold tracking-[-0.06em] text-black dark:text-white">
          {value}
        </p>
      </div>

      <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
        {label}
      </p>
    </div>
  );
}

function CommentSection({
  title,
  description,
  comments,
  emptyText,
  approveAction,
  rejectAction,
  deleteAction,
  showApprove = false,
  showReject = false,
}: {
  title: string;
  description: string;
  comments: BlogCommentRow[];
  emptyText: string;
  approveAction: (formData: FormData) => Promise<void>;
  rejectAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  showApprove?: boolean;
  showReject?: boolean;
}) {
  return (
    <section className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#070707] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
            {description}
          </p>
        </div>

        <span className="w-fit rounded-full border border-black/10 bg-black/[0.025] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
          {comments.length} comments
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-[2rem] border border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#fd5b38] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                      {comment.status}
                    </span>

                    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-black text-black/55 dark:border-white/10 dark:bg-[#070707] dark:text-white/55">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-black dark:text-white">
                    {comment.name}
                  </h3>

                  {comment.email ? (
                    <p className="mt-1 text-xs font-semibold text-black/45 dark:text-white/45">
                      {comment.email}
                    </p>
                  ) : null}

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-black/65 dark:text-white/65">
                    {comment.comment}
                  </p>

                  {comment.blog_post ? (
                    <Link
                      href={`/blog/${comment.blog_post.slug}`}
                      target="_blank"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
                    >
                      View article
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>

                <div className="grid shrink-0 gap-2 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                  {showApprove ? (
                    <form action={approveAction}>
                      <input type="hidden" name="id" value={comment.id} />
                      <input
                        type="hidden"
                        name="slug"
                        value={comment.blog_post?.slug || ""}
                      />

                      <SubmitButton
                        label="Approve"
                        loadingLabel="Approving..."
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                      />
                    </form>
                  ) : null}

                  {showReject ? (
                    <form action={rejectAction}>
                      <input type="hidden" name="id" value={comment.id} />
                      <input
                        type="hidden"
                        name="slug"
                        value={comment.blog_post?.slug || ""}
                      />

                      <SubmitButton
                        label="Reject"
                        loadingLabel="Rejecting..."
                        className="w-full border border-black/10 bg-white text-black hover:border-[#fd5b38] hover:bg-white hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                      />
                    </form>
                  ) : null}

                  <form action={deleteAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <input
                      type="hidden"
                      name="slug"
                      value={comment.blog_post?.slug || ""}
                    />

                    <SubmitButton
                      label="Delete"
                      loadingLabel="Deleting..."
                      className="w-full border border-red-500/20 bg-red-500/10 text-red-700 hover:bg-red-600 hover:text-white dark:text-red-300"
                    />
                  </form>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[2rem] border border-dashed border-black/10 bg-black/[0.025] p-8 text-center dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38]/15 text-[#fd5b38]">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <p className="mt-4 text-sm font-bold text-black/55 dark:text-white/55">
              {emptyText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}