import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-[15px] font-semibold tracking-tight text-zinc-950">
              {personalInfo.name}
              <span aria-hidden="true" className="text-zinc-400">
                .
              </span>
            </p>
            <p className="mt-2 font-serif text-lg italic text-zinc-500">
              Designed and developed with purpose.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-950"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-3">
            <li>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aryan Mandavgode on LinkedIn (opens in a new tab)"
                className="flex size-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-950 hover:text-zinc-950"
              >
                <Linkedin className="size-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aryan Mandavgode on GitHub (opens in a new tab)"
                className="flex size-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-950 hover:text-zinc-950"
              >
                <Github className="size-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label={`Email ${personalInfo.name}`}
                className="flex size-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-950 hover:text-zinc-950"
              >
                <Mail className="size-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="#top"
                aria-label="Back to top"
                className="flex size-10 items-center justify-center rounded-full bg-zinc-950 text-white transition-colors hover:bg-zinc-700"
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <p>{personalInfo.shortLocation}</p>
        </div>
      </div>
    </footer>
  );
}
