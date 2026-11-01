"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const SECTION_IDS = navLinks.map((link) => link.href.replace("#", ""));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const prefersReducedMotion = useReducedMotion();

  // Header background once the page scrolls past the hero top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on Escape for keyboard users
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled || open
            ? "border-zinc-200/80 bg-white/85 backdrop-blur-md"
            : "border-transparent bg-white/0"
        )}
      >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-zinc-950"
          onClick={closeMenu}
          aria-label="Aryan Mandavgode — back to top"
        >
          Aryan Mandavgode
          <span aria-hidden="true" className="text-zinc-400">
            .
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href.slice(1) ? "true" : undefined}
              className={cn(
                "text-sm transition-colors duration-200",
                activeSection === link.href.slice(1)
                  ? "text-zinc-950"
                  : "text-zinc-500 hover:text-zinc-950"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-700"
          >
            Get in touch
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-full text-zinc-950 transition-colors hover:bg-zinc-100 md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      </header>

      {/* Mobile menu overlay — rendered outside <header> so its `fixed`
          positioning is relative to the viewport (backdrop-blur on the header
          would otherwise become the containing block and collapse it). */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-white md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block border-b border-zinc-100 py-4 text-3xl font-medium tracking-tight text-zinc-950 transition-colors hover:text-zinc-500"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="space-y-4 px-8 pb-10">
              <a
                href="#contact"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                Get in touch
              </a>
              <div className="flex items-center justify-center gap-6 text-sm text-zinc-500">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950"
                >
                  LinkedIn
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950"
                >
                  GitHub
                </a>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-zinc-950">
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
