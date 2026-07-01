import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const fallbackAdminPath = "/admin";
const fallbackLoginPath = "/admin/login";

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallbackAdminPath;
  }

  return value;
}

function redirectWithMessage(
  request: NextRequest,
  path: string,
  status: "error" | "success",
  message: string,
) {
  const redirectUrl = new URL(path, request.url);
  redirectUrl.searchParams.set(status, message);

  return NextResponse.redirect(redirectUrl);
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const authError = requestUrl.searchParams.get("error_description");
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (authError) {
    return redirectWithMessage(request, fallbackLoginPath, "error", authError);
  }

  if (!code) {
    return redirectWithMessage(
      request,
      fallbackLoginPath,
      "error",
      "The login link is missing its secure code. Please request a new admin login link.",
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirectWithMessage(
      request,
      fallbackLoginPath,
      "error",
      error.message || "The login link is invalid or expired. Please request a new one.",
    );
  }

  return NextResponse.redirect(new URL(next, request.url));
}
