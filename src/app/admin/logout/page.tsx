"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogoutPage() {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds <= 0) {
        router.push("/admin/login");
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#070707] px-4 sm:px-6">
      <div className="mx-auto max-w-md rounded-[2.25rem] border border-black/10 bg-[#f7f7f7] p-10 shadow-2xl dark:border-white/10 dark:bg-[#111111] sm:p-12">
        <div className="flex flex-col items-center gap-6">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#fd5b38] text-white">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <h1 className="text-center text-2xl font-semibold text-black dark:text-white sm:text-3xl">
            You’ve been logged out
          </h1>

          <p className="text-center text-sm text-black/65 dark:text-white/65 sm:text-base">
            Your session ended. Redirecting to login in{" "}
            <span className="font-bold">{seconds}</span> second
            {seconds !== 1 ? "s" : ""}.
          </p>

          <Link
            href="/admin/login"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b] sm:text-base"
          >
            Go to Admin Login
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}