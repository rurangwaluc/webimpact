"use client";

import { Heart, MessageCircle, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";

type Comment = {
  id: string;
  name: string;
  comment: string;
  created_at: string;
};

const INITIAL_VISIBLE_COMMENTS = 6;
const COMMENTS_STEP = 6;

function getVisitorKey() {
  if (typeof window === "undefined") return "";

  const existing = window.localStorage.getItem("webimpactlab_visitor_key");

  if (existing) return existing;

  const created = crypto.randomUUID();
  window.localStorage.setItem("webimpactlab_visitor_key", created);

  return created;
}

export function BlogEngagementPanel({
  likeCount = 0,
  averageRating = 0,
  ratingCount = 0,
  comments = [],
  likeAction,
  ratingAction,
  commentAction,
}: {
  likeCount?: number;
  averageRating?: number;
  ratingCount?: number;
  comments?: Comment[];
  likeAction: (formData: FormData) => Promise<void>;
  ratingAction: (formData: FormData) => Promise<void>;
  commentAction: (formData: FormData) => Promise<void>;
}) {
  const visitorKey = useMemo(() => getVisitorKey(), []);
  const [selectedRating, setSelectedRating] = useState(0);
  const [visibleComments, setVisibleComments] = useState(
    INITIAL_VISIBLE_COMMENTS,
  );

  const commentsToShow = comments.slice(0, visibleComments);
  const hasMoreComments = visibleComments < comments.length;

  return (
    <section className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#111111] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                Reader feedback
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white">
                Was this useful?
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/55">
                Like or rate this article so the best content becomes easier to
                improve.
              </p>
            </div>

            <form action={likeAction}>
              <input type="hidden" name="visitor_key" value={visitorKey} />

              <button
                type="submit"
                className="group grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-black/[0.03] text-black transition hover:border-[#fd5b38] hover:bg-[#fd5b38] hover:text-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                aria-label="Like this article"
              >
                <Heart className="h-5 w-5 transition group-hover:fill-white" />
              </button>
            </form>
          </div>

          <form action={ratingAction} className="mt-6">
            <input type="hidden" name="visitor_key" value={visitorKey} />
            <input type="hidden" name="rating" value={selectedRating} />

            <div className="flex flex-wrap items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="submit"
                  onClick={() => setSelectedRating(rating)}
                  className="rounded-2xl p-2 transition hover:bg-[#fd5b38]/10"
                  aria-label={`Rate ${rating} stars`}
                >
                  <Star
                    className={
                      rating <= selectedRating
                        ? "h-7 w-7 fill-[#fd5b38] text-[#fd5b38]"
                        : "h-7 w-7 text-black/25 transition hover:text-[#fd5b38] dark:text-white/25"
                    }
                  />
                </button>
              ))}
            </div>
          </form>

          <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-[1.5rem] border border-black/10 dark:border-white/10">
            <Metric label="Likes" value={likeCount} />
            <Metric label="Ratings" value={ratingCount} withBorder />
            <Metric
              label="Average"
              value={ratingCount > 0 ? averageRating.toFixed(1) : "—"}
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#111111] sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
              <MessageCircle className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white">
                Join the conversation
              </h2>
              <p className="mt-1 text-xs font-semibold text-black/45 dark:text-white/45">
                Comments are reviewed before publishing.
              </p>
            </div>
          </div>

          <form action={commentAction} className="mt-6 grid gap-3">
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-3 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
            />

            <input
              name="email"
              type="email"
              placeholder="Email address optional"
              className="rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-3 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
            />

            <textarea
              name="comment"
              required
              rows={5}
              placeholder="What did you find useful?"
              className="resize-none rounded-[1.5rem] border border-black/10 bg-black/[0.025] px-4 py-3 text-sm font-bold leading-6 text-black outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
            />

            <SubmitButton
              label="Submit comment"
              loadingLabel="Submitting..."
              className="w-full"
            />
          </form>
        </div>
      </div>

      <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#111111] sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
              Approved comments
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white">
              Reader discussion
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/55">
              Showing {commentsToShow.length} of {comments.length} approved{" "}
              {comments.length === 1 ? "comment" : "comments"}.
            </p>
          </div>

          <span className="w-fit rounded-full border border-black/10 bg-black/[0.025] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
            {comments.length} total
          </span>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {commentsToShow.length > 0 ? (
            commentsToShow.map((comment) => (
              <article
                key={comment.id}
                className="rounded-[1.75rem] border border-black/10 bg-black/[0.025] p-5 transition hover:border-[#fd5b38]/30 hover:bg-[#fd5b38]/5 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fd5b38]/15 text-sm font-black uppercase text-[#fd5b38]">
                      {comment.name.slice(0, 1)}
                    </div>

                    <p className="mt-3 text-sm font-black text-black dark:text-white">
                      {comment.name}
                    </p>
                  </div>

                  <p className="shrink-0 text-[11px] font-bold text-black/35 dark:text-white/35">
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(comment.created_at))}
                  </p>
                </div>

                <p className="mt-4 line-clamp-6 text-sm leading-7 text-black/62 dark:text-white/62">
                  {comment.comment}
                </p>
              </article>
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-black/[0.025] p-5 text-sm font-semibold leading-6 text-black/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/50 md:col-span-2">
              No approved comments yet. Be the first to start the conversation.
            </div>
          )}
        </div>

        {hasMoreComments ? (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleComments((current) => current + COMMENTS_STEP)
              }
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/[0.025] px-6 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            >
              Load more comments
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  withBorder = false,
}: {
  label: string;
  value: number | string;
  withBorder?: boolean;
}) {
  return (
    <div
      className={
        withBorder
          ? "border-x border-black/10 p-4 text-center dark:border-white/10"
          : "p-4 text-center"
      }
    >
      <p className="text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white">
        {value}
      </p>
      <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em] text-black/45 dark:text-white/45">
        {label}
      </p>
    </div>
  );
}