import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { personalInfo } from "@/lib/portfolio";

const facts = [
  { label: "Currently", value: "Founder & Full-Stack Developer, ARYONIX" },
  {
    label: "Studying",
    value: `${personalInfo.education}, ${personalInfo.university} (${personalInfo.educationDuration})`,
  },
  { label: "Based in", value: personalInfo.location },
  { label: "Focus", value: "Full-stack development, SaaS, UI/UX" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="About"
              title={
                <span id="about-heading">
                  Design and technology, working{" "}
                  <span className="font-serif font-normal italic">
                    together.
                  </span>
                </span>
              }
            />
          </div>

          <div className="space-y-10 lg:col-span-7">
            <Reveal className="space-y-5 text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
              <p>
                I&apos;m a Computer Science Engineering student who spends as
                much time building as studying. What started as curiosity about
                how websites work has grown into a genuine craft — designing
                interfaces, writing full-stack code, and shipping products that
                people and businesses actually use.
              </p>
              <p>
                In December 2025 I founded{" "}
                <a
                  href={personalInfo.company}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-950"
                >
                  ARYONIX
                </a>
                , a digital development agency focused on websites,
                applications, software, and SaaS products. Running it has
                taught me how to translate a client&apos;s vague idea into a
                clear scope, a clean design, and a working product.
              </p>
              <p>
                I&apos;m interested in SaaS, full-stack development, UI/UX, and
                product engineering — the whole path from an empty canvas to
                something deployed and useful. I care about details: fast
                loads, honest copy, layouts that breathe, and code that&apos;s
                easy to maintain.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="divide-y divide-zinc-200 border-y border-zinc-200">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                      {fact.label}
                    </dt>
                    <dd className="text-sm text-zinc-700 sm:text-[15px]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
