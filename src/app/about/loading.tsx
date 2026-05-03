export default function AboutLoading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 py-12 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl animate-pulse">
        <section className="mx-auto max-w-5xl text-center">
          <div className="mx-auto h-3 w-44 rounded-full bg-black/10 dark:bg-white/10" />
          <div className="mx-auto mt-6 h-14 w-full max-w-3xl rounded-[1.5rem] bg-black/10 dark:bg-white/10" />
          <div className="mx-auto mt-4 h-14 w-full max-w-2xl rounded-[1.5rem] bg-black/10 dark:bg-white/10" />
          <div className="mx-auto mt-6 h-4 w-full max-w-xl rounded-full bg-black/10 dark:bg-white/10" />
          <div className="mx-auto mt-3 h-4 w-full max-w-lg rounded-full bg-black/10 dark:bg-white/10" />
        </section>

        <section className="mt-16 rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 dark:border-white/10 dark:bg-[#111111] sm:p-10">
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-[2rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#070707]"
              >
                <div className="h-12 w-12 rounded-2xl bg-black/10 dark:bg-white/10" />
                <div className="mt-6 h-6 w-36 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="mt-4 h-4 w-full rounded-full bg-black/10 dark:bg-white/10" />
                <div className="mt-3 h-4 w-4/5 rounded-full bg-black/10 dark:bg-white/10" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="h-3 w-44 rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-5 h-10 w-full max-w-md rounded-[1.25rem] bg-black/10 dark:bg-white/10" />
            <div className="mt-5 h-4 w-full max-w-xl rounded-full bg-black/10 dark:bg-white/10" />
            <div className="mt-3 h-4 w-full max-w-lg rounded-full bg-black/10 dark:bg-white/10" />

            <div className="mt-8 grid gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-12 rounded-2xl bg-black/10 dark:bg-white/10"
                />
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-[#f7f7f7] p-6 dark:border-white/10 dark:bg-[#111111]">
            <div className="grid gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-20 rounded-[1.5rem] bg-black/10 dark:bg-white/10"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-8 text-center dark:border-white/10 dark:bg-[#111111] sm:p-12">
          <div className="mx-auto h-9 w-full max-w-md rounded-[1.25rem] bg-black/10 dark:bg-white/10" />
          <div className="mx-auto mt-5 h-4 w-full max-w-xl rounded-full bg-black/10 dark:bg-white/10" />
          <div className="mx-auto mt-3 h-4 w-full max-w-lg rounded-full bg-black/10 dark:bg-white/10" />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <div className="h-12 w-full rounded-full bg-black/10 dark:bg-white/10 sm:w-44" />
            <div className="h-12 w-full rounded-full bg-black/10 dark:bg-white/10 sm:w-36" />
          </div>
        </section>
      </div>
    </main>
  );
}