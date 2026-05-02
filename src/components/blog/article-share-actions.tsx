"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  
  MessageCircle,
  Share2,
} from "lucide-react";
import { FaLinkedin, FaFacebook } from "react-icons/fa";

export function ArticleShareActions({
  url,
  title,
  compact = false,
}: {
  url: string;
  title: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleNativeShare() {
    if (navigator.share) {
      await navigator.share({
        title,
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const baseClass = compact
    ? "inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.025] px-4 py-2.5 text-xs font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
    : "inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white";

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        <MessageCircle className="h-3.5 w-3.5" />
        WhatsApp
      </Link>

      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        <FaFacebook className="h-3.5 w-3.5" />
        Facebook
      </Link>

      <Link
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        <FaLinkedin className="h-3.5 w-3.5" />
        LinkedIn
      </Link>

      <button type="button" onClick={handleNativeShare} className={baseClass}>
        {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "More"}
      </button>

      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
        className={baseClass}
      >
        <Copy className="h-3.5 w-3.5" />
        Copy
      </button>
    </div>
  );
}