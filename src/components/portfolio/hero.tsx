"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { personalInfo } from "@/lib/portfolio";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

function HeroContent() {
  return (
    <>
      <motion.p
        variants={item}
        className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white py-1.5 pl-3 pr-4 text-xs font-medium text-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      >
        <span className="relative flex size-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none"
            aria-hidden="true"
          />
          <span
            className="relative inline-flex size-2 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
        </span>
        Available for new projects
      </motion.p>

      <motion.h1
        variants={item}
        className="mt-8 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.03em] text-zinc-950 sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
      >
        Building digital experiences that{" "}
        <span className="font-serif font-normal italic tracking-[-0.01em]">
          make an impact.
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg"
      >
        I&apos;m Aryan, a Computer Science Engineering student, Full-Stack
        Developer, and Founder of ARYONIX. I design and build modern websites,
        applications, and digital products.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a
          href="#projects"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-700"
        >
          Explore My Work
          <ArrowDown className="size-4" aria-hidden="true" />
        </a>
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition-colors duration-200 hover:border-zinc-950"
        >
          Get In Touch
        </a>
        <a
          href={personalInfo.resumePath}
          download="Aryan-Mandavgode-Resume.pdf"
          className="inline-flex min-h-11 items-center rounded-full px-4 py-3 text-sm font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors duration-200 hover:text-zinc-950 hover:decoration-zinc-950"
        >
          Download Resume
        </a>
      </motion.div>
    </>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {prefersReducedMotion ? (
          <div>
            <HeroContent />
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show">
            <HeroContent />
          </motion.div>
        )}
      </div>

      {/* Bottom meta strip */}
      <div className="mx-auto mt-16 w-full max-w-6xl px-5 pb-8 sm:px-8">
        {prefersReducedMotion ? (
          <div className="flex flex-col gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <HeroMeta />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <HeroMeta />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function HeroMeta() {
  return (
    <>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
        <li className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5" aria-hidden="true" />
          {personalInfo.shortLocation}
        </li>
        <li aria-hidden="true" className="hidden sm:block">
          ·
        </li>
        <li>{personalInfo.university}</li>
        <li aria-hidden="true" className="hidden sm:block">
          ·
        </li>
        <li>
          <a
            href={personalInfo.company}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950"
          >
            Founder, ARYONIX
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </li>
      </ul>
      <a
        href="#about"
        className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-950"
      >
        Scroll to explore
        <ArrowDown
          className="size-3.5 animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        />
      </a>
    </>
  );
}
