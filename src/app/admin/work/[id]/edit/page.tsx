import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { ElementType } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  Link2,
  Save,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SubmitButton } from "@/components/ui/submit-button";
import { WorkProjectDangerControls } from "@/components/admin/work-project-danger-controls";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type WorkProjectRow = {
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
  status: "draft" | "published";
  is_featured: boolean;
  published_at: string | null;
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

export default async function EditWorkProjectPage({ params }: PageProps) {
  await requireAdmin();

  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("work_projects")
    .select(
  "id,title,slug,client_name,project_type,summary,problem,solution,result,cover_image_url,live_url,status,is_featured,published_at",
)
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const project = data as WorkProjectRow;

  async function updateProject(formData: FormData) {
    "use server";

    await requireAdmin();

    const title = getText(formData, "title");
    const rawSlug = getText(formData, "slug");
    const slug = slugify(rawSlug || title);
    const projectType = getText(formData, "project_type");
    const summary = getText(formData, "summary");
    const problem = getText(formData, "problem");
    const solution = getText(formData, "solution");
    const result = getText(formData, "result");
    const clientName = getText(formData, "client_name") || null;
    const liveUrl = getText(formData, "live_url") || null;
    const status = getText(formData, "status") === "published" ? "published" : "draft";
    const isFeatured = getText(formData, "is_featured") === "yes";

    if (!title || !slug || !projectType || !summary || !problem || !solution || !result) {
      throw new Error("Missing required project fields.");
    }

    let coverImageUrl = project.cover_image_url;

    const image = formData.get("cover_image");

    if (image instanceof File && image.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(image.type)) {
        throw new Error("Project image must be JPG, PNG, or WEBP.");
      }

      if (image.size > 8 * 1024 * 1024) {
        throw new Error("Project image must be 8MB or smaller.");
      }

      const extension =
        image.type === "image/png"
          ? "png"
          : image.type === "image/webp"
            ? "webp"
            : "jpg";

      const filePath = `${slug}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("work-images")
        .upload(filePath, image, {
          cacheControl: "31536000",
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("work-images")
        .getPublicUrl(filePath);

      coverImageUrl = publicUrlData.publicUrl;
    }

    const { error: updateError } = await supabaseAdmin
      .from("work_projects")
      .update({
        title,
        slug,
        client_name: clientName,
        project_type: projectType,
        summary,
        problem,
        solution,
        result,
        cover_image_url: coverImageUrl,
        live_url: liveUrl,
        status,
        is_featured: isFeatured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    revalidatePath("/work");
    revalidatePath(`/work/${slug}`);
    revalidatePath("/admin/work");

    redirect("/admin/work");
  }

  async function publishProject() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("work_projects")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (error) throw new Error(error.message);

    revalidatePath("/work");
    revalidatePath(`/work/${project.slug}`);
    revalidatePath("/admin/work");
    redirect(`/admin/work/${project.id}/edit`);
  }

  async function unpublishProject() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("work_projects")
      .update({
        status: "draft",
        is_featured: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (error) throw new Error(error.message);

    revalidatePath("/work");
    revalidatePath(`/work/${project.slug}`);
    revalidatePath("/admin/work");
    redirect(`/admin/work/${project.id}/edit`);
  }

  async function featureProject() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("work_projects")
      .update({
        status: "published",
        is_featured: true,
        published_at: project.published_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${project.slug}`);
    revalidatePath("/admin/work");
    redirect(`/admin/work/${project.id}/edit`);
  }

  async function unfeatureProject() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("work_projects")
      .update({
        is_featured: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${project.slug}`);
    revalidatePath("/admin/work");
    redirect(`/admin/work/${project.id}/edit`);
  }

  async function deleteProject() {
    "use server";

    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("work_projects")
      .delete()
      .eq("id", project.id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath("/admin/work");
    redirect("/admin/work");
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <form
          action={updateProject}
          className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]"
        >
          <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />

          <div className="relative border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
            <Link
              href="/admin/work"
              className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to work manager
            </Link>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Edit project
            </p>

            <h1 className="mt-4 max-w-4xl text-[clamp(2.15rem,5.5vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
              Improve the proof before serious buyers see it.
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62">
              Keep the card simple, but make the case study strong: clear
              problem, clear system, clear result.
            </p>
          </div>

          <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.7fr_0.3fr] lg:p-10">
            <div className="grid gap-5">
              <SectionCard
                icon={BriefcaseBusiness}
                title="Project basics"
                text="Make the project easy to understand quickly."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Project title" required>
                    <input
                      name="title"
                      required
                      defaultValue={project.title}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Public link name" required>
                    <input
                      name="slug"
                      required
                      defaultValue={project.slug}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Client or brand name">
                    <input
                      name="client_name"
                      defaultValue={project.client_name || ""}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Project type" required>
                    <input
                      name="project_type"
                      required
                      defaultValue={project.project_type}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Short summary" required>
                  <textarea
                    name="summary"
                    required
                    rows={4}
                    defaultValue={project.summary}
                    className={textareaClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard
                icon={ShieldCheck}
                title="Case study story"
                text="This is what makes the work believable."
              >
                <Field label="Problem" required>
                  <textarea
                    name="problem"
                    required
                    rows={5}
                    defaultValue={project.problem}
                    className={textareaClass}
                  />
                </Field>

                <Field label="What was built" required>
                  <textarea
                    name="solution"
                    required
                    rows={6}
                    defaultValue={project.solution}
                    className={textareaClass}
                  />
                </Field>

                <Field label="Result" required>
                  <textarea
                    name="result"
                    required
                    rows={5}
                    defaultValue={project.result}
                    className={textareaClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard
                icon={ImageIcon}
                title="Image and landing page"
                text="Update the preview image or add the live project landing page."
              >
                {project.cover_image_url ? (
                  <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-black dark:border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover_image_url}
                      alt={`${project.title} current preview`}
                      className="h-[340px] w-full object-cover object-top"
                    />
                  </div>
                ) : null}

                <Field label="Replace project image">
                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-black/15 bg-black/[0.025] px-5 py-8 text-center transition hover:border-[#fd5b38]/50 hover:bg-[#fd5b38]/10 dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-[#fd5b38]/50">
                    <UploadCloud className="h-8 w-8 text-[#fd5b38]" />
                    <span className="mt-4 text-sm font-black text-black dark:text-white">
                      Upload new project image
                    </span>
                    <span className="mt-2 max-w-sm text-xs font-semibold leading-5 text-black/50 dark:text-white/50">
                      Leave empty to keep the current image.
                    </span>

                    <input
                      name="cover_image"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                    />
                  </label>
                </Field>

                <Field label="Project landing page URL">
                  <input
                    name="live_url"
                    defaultValue={project.live_url || ""}
                    placeholder="https://example.com"
                    className={inputClass}
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
                  Publish only when this project is strong enough to represent
                  the brand.
                </p>

                <div className="mt-6 grid gap-4">
                  <Field label="Website visibility" required>
                    <select
                      name="status"
                      defaultValue={project.status}
                      className={inputClass}
                    >
                      <option value="draft">Draft - hidden</option>
                      <option value="published">Published - visible</option>
                    </select>
                  </Field>

                  <Field label="Show on homepage?">
                    <select
                      name="is_featured"
                      defaultValue={project.is_featured ? "yes" : "no"}
                      className={inputClass}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes, feature it</option>
                    </select>
                  </Field>
                </div>

                <SubmitButton
                  label="Update project"
                  loadingLabel="Updating project..."
                  className="mt-6 w-full shadow-lg shadow-[#fd5b38]/25"
                />
                <WorkProjectDangerControls
                status={project.status}
                isFeatured={project.is_featured}
                publishAction={publishProject}
                unpublishAction={unpublishProject}
                featureAction={featureProject}
                unfeatureAction={unfeatureProject}
                deleteAction={deleteProject}
              />

                <div className="mt-6 rounded-[1.75rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                    <p className="text-sm font-bold leading-6 text-black/65 dark:text-white/65">
                      The public page should make a serious buyer understand the
                      problem, the system, and the business result.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {project.status === "published" ? (
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:text-white"
                    >
                      <Link2 className="h-4 w-4" />
                      View case study
                    </Link>
                  ) : null}

                  {project.live_url ? (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit landing page
                    </Link>
                  ) : null}
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