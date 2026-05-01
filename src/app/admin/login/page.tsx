"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Loader2, LockKeyhole } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }
    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });

    setIsSubmitting(false);
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("success");
      setMessage("Check your email for the secure login link.");
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#070707] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl dark:border-white/10 dark:bg-[#111111] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info panel */}
          <div className="hidden lg:block border-r border-black/10 p-10 dark:border-white/10">
            <div className="relative">
              <Link href="/" className="text-sm font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                WebImpact Lab
              </Link>
              <h1 className="mt-10 text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
                Owner access for serious content control.
              </h1>
              <p className="mt-6 text-black/60 dark:text-white/60">
                Manage case studies, blog posts, and homepage content securely.
              </p>
            </div>
          </div>

          {/* Login panel */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-md">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38] text-white shadow-lg shadow-[#fd5b38]/20">
                <LockKeyhole className="h-6 w-6" />
              </div>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Admin login
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-black dark:text-white">
                Sign in with your admin email
              </h2>

              <form onSubmit={handleLogin} className="mt-8 grid gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus("idle");
                    setMessage("");
                  }}
                  className="input-field"
                />

                {status !== "idle" && (
                  <div
                    className={`rounded-2xl p-4 text-sm font-bold ${
                      status === "success"
                        ? "bg-emerald-500/10 border border-emerald-500 text-emerald-700 dark:text-emerald-300"
                        : "bg-red-500/10 border border-red-500 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending link...
                    </>
                  ) : (
                    <>
                      Send login link <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <Link href="/" className="mt-6 inline-flex text-sm font-black text-black dark:text-white hover:text-[#fd5b38]">
                Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}