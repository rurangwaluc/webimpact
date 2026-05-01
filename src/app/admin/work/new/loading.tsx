export default function NewWorkLoading() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 dark:bg-[#070707] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="animate-pulse rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.05] dark:border-white/10 dark:bg-[#111111] sm:p-10">

          {/* Title */}
          <div className="h-6 w-40 rounded bg-black/10 dark:bg-white/10" />
          <div className="mt-4 h-10 w-1/2 rounded bg-black/10 dark:bg-white/10" />

          {/* Form */}
          <div className="mt-8 grid gap-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid gap-2">
                <div className="h-4 w-28 rounded bg-black/10 dark:bg-white/10" />
                <div className="h-12 rounded-xl bg-black/10 dark:bg-white/10" />
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-8 h-12 w-full rounded-full bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    </main>
  );
}