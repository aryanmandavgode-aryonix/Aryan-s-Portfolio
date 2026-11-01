import { ArrowUpRight, GraduationCap, Briefcase } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { education, experience } from "@/lib/portfolio";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50/60"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          index="04"
          eyebrow="Experience & Education"
          title={
            <span id="experience-heading">
              The journey so{" "}
              <span className="font-serif font-normal italic">far.</span>
            </span>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Experience */}
          <div className="lg:col-span-7">
            <h3 className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
              <Briefcase className="size-3.5" aria-hidden="true" />
              Experience
            </h3>
            <ol className="mt-6">
              {experience.map((job) => (
                <li
                  key={job.role}
                  className="border-t border-zinc-200 pt-8 first:border-t-0 first:pt-0"
                >
                  <Reveal>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h4 className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
                          {job.role}
                        </h4>
                        <p className="mt-1 text-[15px] text-zinc-600">
                          {job.companyHref ? (
                            <a
                              href={job.companyHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-medium text-zinc-950 transition-colors hover:text-zinc-500"
                            >
                              {job.company}
                              <ArrowUpRight className="size-3.5" aria-hidden="true" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          ) : (
                            job.company
                          )}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm text-zinc-500">{job.period}</p>
                    </div>
                    <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-zinc-600">
                      {job.summary}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[15px] leading-relaxed text-zinc-600"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-zinc-400"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Education */}
          <div className="lg:col-span-5">
            <h3 className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
              <GraduationCap className="size-3.5" aria-hidden="true" />
              Education
            </h3>
            <Reveal delay={0.1} className="mt-6">
              <article className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8">
                <p className="text-sm font-medium text-zinc-500">
                  {education.period}
                </p>
                <h4 className="mt-2 text-lg font-semibold tracking-tight text-zinc-950">
                  {education.degree}
                </h4>
                <p className="mt-1 text-[15px] text-zinc-600">
                  {education.university}
                </p>
                <p className="mt-4 border-t border-zinc-100 pt-4 text-pretty text-sm leading-relaxed text-zinc-600">
                  {education.summary}
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
