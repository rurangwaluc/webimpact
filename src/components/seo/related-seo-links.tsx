import Link from "next/link";
import { ArrowRight } from "lucide-react";

type RelatedSeoLink = {
  title: string;
  href: string;
  description: string;
};

export function RelatedSeoLinks({
  eyebrow = "Related buyer-intent pages",
  title = "Go deeper into the service you are searching for.",
  description = "These pages explain specific WebImpact Lab services, search terms, and business problems in more detail.",
  links,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  links: RelatedSeoLink[];
}) {
  if (links.length === 0) return null;

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/15 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[0.38fr_1fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                {eyebrow}
              </p>

              <h2 className="mt-4 max-w-md text-[clamp(2rem,5vw,3.15rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                {title}
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                {description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[1.75rem] border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#fd5b38]/40 hover:shadow-2xl hover:shadow-black/[0.06] dark:border-white/10 dark:bg-[#070707]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold leading-[1.05] tracking-[-0.045em] text-black dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/58 dark:text-white/58">
                        {item.description}
                      </p>
                    </div>

                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#fd5b38] text-white transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
