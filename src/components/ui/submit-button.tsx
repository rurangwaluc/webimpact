"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({
  label = "Save",
  loadingLabel = "Saving...",
  className = "",
}: {
  label?: string;
  loadingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black transition ${
        pending
          ? "bg-[#fd5b38]/70 text-white cursor-not-allowed"
          : "bg-[#fd5b38] text-white hover:-translate-y-0.5 hover:bg-[#e84a2b]"
      } ${className}`}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}