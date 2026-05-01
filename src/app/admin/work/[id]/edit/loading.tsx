export default function EditWorkLoading() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 dark:bg-[#070707] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="animate-pulse rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.05] dark:border-white/10 dark:bg-[#111111] sm:p-10">
          
          {/* Header */}
          <div className="h-6 w-40 rounded bg-black/10 dark:bg-white/10" />
          <div className="mt-4 h-10 w-2/3 rounded bg-black/10 dark:bg-white/10" />

          {/* Inputs */}
          <div className="mt-8 grid gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="grid gap-2">
                <div className="h-4 w-32 rounded bg-black/10 dark:bg-white/10" />
                <div className="h-12 rounded-xl bg-black/10 dark:bg-white/10" />
              </div>
            ))}
          </div>

          {/* Big textarea */}
          <div className="mt-6">
            <div className="h-4 w-40 rounded bg-black/10 dark:bg-white/10" />
            <div className="mt-2 h-32 rounded-xl bg-black/10 dark:bg-white/10" />
          </div>

          {/* Button */}
          <div className="mt-8 h-12 w-full rounded-full bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    </main>
  );
}