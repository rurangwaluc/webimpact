export default function ContactLoading() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12 xl:p-16">
            <div className="grid animate-pulse gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="h-4 w-48 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="mt-6 h-20 max-w-2xl rounded-[2rem] bg-black/10 dark:bg-white/10" />
                <div className="mt-5 h-24 max-w-xl rounded-[2rem] bg-black/10 dark:bg-white/10" />
                <div className="mt-8 grid gap-3">
                  <div className="h-16 rounded-2xl bg-black/10 dark:bg-white/10" />
                  <div className="h-16 rounded-2xl bg-black/10 dark:bg-white/10" />
                  <div className="h-16 rounded-2xl bg-black/10 dark:bg-white/10" />
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#070707] sm:p-6 lg:p-8">
                <div className="h-4 w-40 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="mt-5 h-10 rounded-2xl bg-black/10 dark:bg-white/10" />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="h-14 rounded-2xl bg-black/10 dark:bg-white/10" />
                  <div className="h-14 rounded-2xl bg-black/10 dark:bg-white/10" />
                  <div className="h-14 rounded-2xl bg-black/10 dark:bg-white/10" />
                  <div className="h-14 rounded-2xl bg-black/10 dark:bg-white/10" />
                </div>
                <div className="mt-4 h-32 rounded-2xl bg-black/10 dark:bg-white/10" />
                <div className="mt-6 h-14 w-44 rounded-full bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}