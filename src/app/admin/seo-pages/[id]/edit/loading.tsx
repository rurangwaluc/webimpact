export default function Loading() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] p-6 dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="h-4 w-40 rounded-full bg-[#fd5b38]/30" />
                <div className="mt-5 h-14 w-full max-w-3xl rounded-2xl bg-black/10 dark:bg-white/10" />
                <div className="mt-3 h-14 w-2/3 rounded-2xl bg-black/10 dark:bg-white/10" />

                <div className="mt-7 space-y-3">
                  <div className="h-4 w-full max-w-xl rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-4 w-5/6 rounded bg-black/10 dark:bg-white/10" />
                </div>

                <div className="mt-8 flex gap-3">
                  <div className="h-12 w-36 rounded-full bg-black/10 dark:bg-white/10" />
                  <div className="h-12 w-36 rounded-full bg-black/10 dark:bg-white/10" />
                </div>
              </div>

              <div className="h-72 rounded-[2.25rem] bg-white dark:bg-[#070707]" />
            </div>
          </div>

          <div className="mt-12 grid gap-6">
            <div className="h-[420px] rounded-[2.5rem] bg-black/10 dark:bg-white/10" />

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-[420px] rounded-[2rem] bg-black/10 dark:bg-white/10"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}