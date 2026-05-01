export default function Loading() {
  return (
    <main className="bg-white dark:bg-[#070707] animate-pulse">
      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Hero skeleton */}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Image */}
            <div className="h-[380px] w-full rounded-[2rem] bg-black/10 dark:bg-white/10 sm:h-[460px]" />

            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="h-4 w-32 rounded-full bg-black/10 dark:bg-white/10" />
              <div className="mt-4 h-10 w-full max-w-lg rounded-xl bg-black/10 dark:bg-white/10" />
              <div className="mt-3 h-10 w-2/3 rounded-xl bg-black/10 dark:bg-white/10" />

              <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded bg-black/10 dark:bg-white/10" />
                <div className="h-4 w-full rounded bg-black/10 dark:bg-white/10" />
                <div className="h-4 w-4/5 rounded bg-black/10 dark:bg-white/10" />
              </div>

              <div className="mt-6 flex gap-3">
                <div className="h-10 w-32 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="h-10 w-32 rounded-full bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-[1.75rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#111111]"
              >
                <div className="h-5 w-40 rounded bg-black/10 dark:bg-white/10" />
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-full rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-4 w-full rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-4 w-4/5 rounded bg-black/10 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}