"use client";

import { useRef, useState } from "react";
import { ImageIcon, UploadCloud, X } from "lucide-react";

export function BlogCoverUploadField() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl("");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
  }

  function clearImage() {
    setPreviewUrl("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="grid gap-4">
      <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-black/15 bg-black/[0.025] px-5 py-8 text-center transition hover:border-[#fd5b38]/50 hover:bg-[#fd5b38]/10 dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-[#fd5b38]/50">
        <UploadCloud className="h-8 w-8 text-[#fd5b38]" />

        <span className="mt-4 text-sm font-black text-black dark:text-white">
          Upload blog cover image
        </span>

        <span className="mt-2 max-w-sm text-xs font-semibold leading-5 text-black/50 dark:text-white/50">
          JPG, PNG, or WEBP. Max 8MB.
        </span>

        <input
          ref={inputRef}
          name="cover_image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleChange}
        />
      </label>

      {previewUrl ? (
        <div className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-black dark:border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Selected blog cover preview"
            className="h-[360px] w-full object-cover object-center"
          />

          <button
            type="button"
            onClick={clearImage}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-xl transition hover:bg-[#fd5b38]"
            aria-label="Remove selected image"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/65 p-4 text-white backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fd5b38] text-white">
                <ImageIcon className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black">Cover image selected</p>
                <p className="mt-1 text-xs font-semibold text-white/65">
                  This image will upload when you save the post.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}