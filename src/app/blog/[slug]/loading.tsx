export default function BlogPostLoading() {
  return (
    <main className="bg-white px-4 py-10 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="h-5 w-32 animate-pulse rounded-full bg-[#fd5b38]/25" />
              <div className="mt-8 h-16 max-w-3xl animate-pulse rounded-3xl bg-black/10 dark:bg-white/10" />
              <div className="mt-4 h-16 max-w-2xl animate-pulse rounded-3xl bg-black/10 dark:bg-white/10" />
              <div className="mt-6 h-5 max-w-xl animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
              <div className="mt-3 h-5 max-w-lg animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            </div>

            <div className="h-[360px] animate-pulse bg-black/10 dark:bg-white/10 sm:h-[520px]" />
          </section>

          <aside className="rounded-[2.25rem] border border-black/10 bg-[#f7f7f7] p-6 dark:border-white/10 dark:bg-[#111111] lg:sticky lg:top-28 lg:self-start">
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-[#fd5b38]/25" />
            <div className="mt-6 h-7 w-48 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-3 h-4 w-4/5 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-6 h-12 w-full animate-pulse rounded-full bg-[#fd5b38]/25" />
          </aside>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="rounded-[2.5rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="mb-4 h-5 animate-pulse rounded-full bg-black/10 dark:bg-white/10"
                style={{ width: `${index % 3 === 0 ? 92 : index % 3 === 1 ? 78 : 64}%` }}
              />
            ))}
          </article>

          <div className="rounded-[2.25rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#111111]">
            <div className="h-6 w-40 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-5 h-12 w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-3 h-12 w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
          </div>
        </div>
      </div>
    </main>
  );
}