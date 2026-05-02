export default function BlogLoading() {
  return (
    <main className="bg-white px-4 py-12 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-5 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto h-4 w-28 animate-pulse rounded-full bg-[#fd5b38]/25" />
            <div className="mx-auto mt-5 h-12 max-w-2xl animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
            <div className="mx-auto mt-4 h-5 max-w-xl animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mx-auto mt-3 h-5 max-w-lg animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
          </div>

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#070707]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-2xl bg-[#fd5b38]/25" />

                <div>
                  <div className="h-4 w-36 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
                  <div className="mt-2 h-3 w-52 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
                </div>
              </div>

              <div className="h-14 w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10 lg:w-64" />
            </div>

            <div className="mt-5 flex gap-2 overflow-hidden">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-36 shrink-0 animate-pulse rounded-full bg-black/10 dark:bg-white/10"
                />
              ))}
            </div>
          </div>

          <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-black/10 bg-white dark:border-white/10 dark:bg-[#070707] lg:grid-cols-[0.95fr_1fr]">
            <div className="min-h-[280px] animate-pulse bg-black/10 dark:bg-white/10 sm:min-h-[360px] lg:min-h-[430px]" />

            <div className="flex min-h-[360px] flex-col justify-between bg-[#fff3ef] p-6 dark:bg-[#160b08] sm:p-8">
              <div>
                <div className="h-6 w-36 animate-pulse rounded-full bg-[#fd5b38]/25" />
                <div className="mt-6 h-10 max-w-xl animate-pulse rounded-2xl bg-black/10 dark:bg-white/10" />
                <div className="mt-4 h-5 max-w-lg animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
                <div className="mt-3 h-5 max-w-md animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
              </div>

              <div className="mt-10 h-10 w-40 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="rounded-[2rem] p-2">
                <div className="aspect-[4/3] animate-pulse rounded-[1.75rem] bg-black/10 dark:bg-white/10" />
                <div className="mx-auto mt-5 h-6 max-w-xs animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
                <div className="mx-auto mt-3 h-4 max-w-32 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}