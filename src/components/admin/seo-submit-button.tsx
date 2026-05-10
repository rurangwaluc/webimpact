"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SeoSubmitButton({
  children,
  pendingText = "Saving...",
  variant = "primary",
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: "primary" | "danger";
}) {
  const { pending } = useFormStatus();

  const className =
    variant === "danger"
      ? "inline-flex items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
      : "inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b] disabled:cursor-not-allowed disabled:opacity-70";

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}