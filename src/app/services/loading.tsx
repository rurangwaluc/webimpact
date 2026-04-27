export default function ServicesLoading() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <section className="px-4 pb-14 pt-10 sm:px-6 sm:pb-18 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12">
            <div className="h-4 w-56 rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-6 h-16 max-w-3xl rounded-3xl bg-black/10 dark:bg-white/10" />
            <div className="mt-4 h-16 max-w-2xl rounded-3xl bg-black/10 dark:bg-white/10" />
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="h-40 rounded-[2rem] bg-black/10 dark:bg-white/10" />
              <div className="h-40 rounded-[2rem] bg-black/10 dark:bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-[2rem] border border-black/10 bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.06]"
            />
          ))}
        </div>
      </section>
    </main>
  );
}