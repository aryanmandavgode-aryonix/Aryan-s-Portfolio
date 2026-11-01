import {
  Code2,
  Database,
  PenTool,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { skillCategories, type SkillCategory } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const icons: Record<SkillCategory["icon"], LucideIcon> = {
  code: Code2,
  server: Server,
  database: Database,
  tools: Wrench,
  pen: PenTool,
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50/60"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={
            <span id="skills-heading">
              The tools I use to{" "}
              <span className="font-serif font-normal italic">build.</span>
            </span>
          }
          description="A working toolkit for taking a product from idea to deployment — covering the interface, the server behind it, and everything in between."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = icons[category.icon];
            return (
              <Reveal
                key={category.title}
                delay={0.05 * index}
                className={cn(category.featured && "lg:col-span-2")}
              >
                <article className="group h-full rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_2px_16px_rgba(0,0,0,0.05)] sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors duration-300 group-hover:border-zinc-300">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-950">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors duration-200 group-hover:border-zinc-300"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
