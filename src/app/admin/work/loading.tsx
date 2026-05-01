export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] p-6 dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
          <div className="h-4 w-32 rounded-full bg-black/10 dark:bg-white/10" />

          <div className="mt-8 h-4 w-36 rounded-full bg-[#fd5b38]/30" />
          <div className="mt-5 h-12 w-full max-w-3xl rounded-2xl bg-black/10 dark:bg-white/10" />
          <div className="mt-3 h-12 w-2/3 rounded-2xl bg-black/10 dark:bg-white/10" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 rounded-[2rem] bg-white dark:bg-[#070707]"
              />
            ))}
          </div>

          <div className="mt-8 h-32 rounded-[2rem] bg-white dark:bg-[#070707]" />

          <div className="mt-6 grid gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-44 rounded-[2rem] bg-white dark:bg-[#070707]"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}