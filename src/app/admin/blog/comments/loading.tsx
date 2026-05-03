export default function AdminCommentsLoading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="animate-pulse">
          <div className="h-4 w-32 rounded-full bg-black/10 dark:bg-white/10" />
          <div className="mt-4 h-10 w-[60%] rounded-full bg-black/10 dark:bg-white/10" />
          <div className="mt-3 h-4 w-[40%] rounded-full bg-black/10 dark:bg-white/10" />
        </div>

        {/* STATS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-[2rem] border border-black/10 bg-[#f7f7f7] p-5 dark:border-white/10 dark:bg-[#111111]"
            >
              <div className="h-6 w-16 rounded bg-black/10 dark:bg-white/10" />
              <div className="mt-3 h-8 w-20 rounded bg-black/10 dark:bg-white/10" />
            </div>
          ))}
        </div>

        {/* COMMENT LIST */}
        <div className="mt-8 grid gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#111111]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="h-4 w-32 rounded bg-black/10 dark:bg-white/10" />
                <div className="h-3 w-20 rounded bg-black/10 dark:bg-white/10" />
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-black/10 dark:bg-white/10" />
                <div className="h-3 w-[90%] rounded bg-black/10 dark:bg-white/10" />
                <div className="h-3 w-[70%] rounded bg-black/10 dark:bg-white/10" />
              </div>

              <div className="mt-5 flex gap-3">
                <div className="h-9 w-24 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="h-9 w-24 rounded-full bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}