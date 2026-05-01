import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { WorkProjectForm } from "@/components/admin/work-project-form";

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) redirect("/admin/login");

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL.");
  }

  if (user.email.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect("/");
  }
}

async function uploadCoverImage(file: File, slug: string) {
  if (!file || file.size === 0) return null;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG, or WEBP image.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image is too large. Please upload an image under 5MB.");
  }

  const extension = file.name.split(".").pop() || "webp";
  const filePath = `${slug}-${Date.now()}.${extension}`;

  const { error } = await supabaseAdmin.storage
    .from("work-images")
    .upload(filePath, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage
    .from("work-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

async function createProject(formData: FormData) {
  "use server";

  await ensureAdmin();

  const title = clean(formData.get("title"));
  const manualSlug = clean(formData.get("slug"));
  const slug = slugify(manualSlug || title);
  const clientName = clean(formData.get("client_name"));
  const projectType = clean(formData.get("project_type"));
  const summary = clean(formData.get("summary"));
  const problem = clean(formData.get("problem"));
  const solution = clean(formData.get("solution"));
  const result = clean(formData.get("result"));
  const liveUrl = clean(formData.get("live_url"));
  const status =
    clean(formData.get("status")) === "published" ? "published" : "draft";
  const isFeatured = clean(formData.get("is_featured")) === "yes";
  const coverFile = formData.get("cover_image");

  if (
    !title ||
    !slug ||
    !projectType ||
    !summary ||
    !problem ||
    !solution ||
    !result
  ) {
    throw new Error("Please fill in all required fields.");
  }

  const coverImageUrl =
    coverFile instanceof File ? await uploadCoverImage(coverFile, slug) : null;

  const { error } = await supabaseAdmin.from("work_projects").insert({
    title,
    slug,
    client_name: clientName || null,
    project_type: projectType,
    summary,
    problem,
    solution,
    result,
    cover_image_url: coverImageUrl,
    live_url: liveUrl || null,
    status,
    is_featured: isFeatured,
    published_at: status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/work");

  redirect("/admin/work");
}

export default async function NewWorkProjectPage() {
  await ensureAdmin();

  return (
    <main className="min-h-screen bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <WorkProjectForm action={createProject} />
      </div>
    </main>
  );
}