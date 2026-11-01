import { Reveal } from "@/components/portfolio/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
        <span aria-hidden="true">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-zinc-300" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
