import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { projects, type Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: Project["status"] }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-500">
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          status === "Live" ? "bg-emerald-500" : "bg-zinc-400"
        )}
      />
      {status}
    </span>
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="group grid overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
          <Image
            src={project.image}
            alt={`Preview of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-zinc-950 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
              Featured
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-pretty text-base leading-relaxed text-zinc-600">
            {project.description}
          </p>
          <div className="mt-6">
            <Tags tags={project.tags} />
          </div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-1.5 border-b border-zinc-950 pb-1 text-sm font-medium text-zinc-950 transition-colors hover:text-zinc-500 hover:border-zinc-400"
            >
              {project.linkLabel ?? "View Project"}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Reveal className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={`Preview of ${project.title}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-2.5 flex-1 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
            {project.description}
          </p>
          <div className="mt-5">
            <Tags tags={project.tags} />
          </div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-950 transition-colors hover:text-zinc-500"
            >
              {project.linkLabel ?? "View Project"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 border-t border-zinc-200"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title={
            <span id="projects-heading">
              Selected{" "}
              <span className="font-serif font-normal italic">work.</span>
            </span>
          }
          description="Websites and products designed and built through ARYONIX — live client work, concept demos, and works in progress."
        />

        <div className="mt-14 space-y-6">
          <FeaturedCard project={featured} />
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
