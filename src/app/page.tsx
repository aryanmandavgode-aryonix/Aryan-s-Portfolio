import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { Experience } from "@/components/portfolio/experience";
import { HeroSection } from "@/components/portfolio/hero";
import { Projects } from "@/components/portfolio/projects";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Skills } from "@/components/portfolio/skills";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-zinc-950 focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
