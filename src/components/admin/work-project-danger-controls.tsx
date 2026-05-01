"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";

type ServerAction = () => Promise<void>;

type WorkProjectDangerControlsProps = {
  status: "draft" | "published";
  isFeatured: boolean;
  publishAction: ServerAction;
  unpublishAction: ServerAction;
  featureAction: ServerAction;
  unfeatureAction: ServerAction;
  deleteAction: ServerAction;
};

export function WorkProjectDangerControls({
  status,
  isFeatured,
  publishAction,
  unpublishAction,
  featureAction,
  unfeatureAction,
  deleteAction,
}: WorkProjectDangerControlsProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="mt-6 rounded-[2rem] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
        Fast controls
      </p>

      <div className="mt-4 grid gap-2">
        <ActionButton
          action={status === "published" ? unpublishAction : publishAction}
          icon={status === "published" ? EyeOff : Eye}
          label={status === "published" ? "Unpublish project" : "Publish project"}
          loadingLabel={status === "published" ? "Unpublishing..." : "Publishing..."}
        />

        <ActionButton
          action={isFeatured ? unfeatureAction : featureAction}
          icon={isFeatured ? StarOff : Star}
          label={isFeatured ? "Remove from homepage" : "Feature on homepage"}
          loadingLabel={isFeatured ? "Removing..." : "Featuring..."}
        />

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-500 hover:text-white dark:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
            Delete project
          </button>
        ) : (
          <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-300" />
              <div>
                <p className="text-sm font-black text-red-700 dark:text-red-300">
                  Delete permanently?
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-red-700/70 dark:text-red-300/70">
                  This removes the project from admin, public work pages, and the
                  homepage.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
              >
                Cancel
              </button>

              <ActionButton
                action={deleteAction}
                icon={Trash2}
                label="Yes, delete"
                loadingLabel="Deleting..."
                danger
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  action,
  icon: Icon,
  label,
  loadingLabel,
  danger = false,
}: {
  action: ServerAction;
  icon: React.ElementType;
  label: string;
  loadingLabel: string;
  danger?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      formAction={action}
      disabled={pending}
      className={
        danger
          ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          : "inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:border-[#fd5b38] hover:text-[#fd5b38] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
      }
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <Icon className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}