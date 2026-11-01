"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { personalInfo } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Please add a short subject.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }
  return errors;
}

/**
 * Builds the pre-filled WhatsApp message in the exact format Aryan expects,
 * encoded for the Click to Chat URL (wa.me).
 */
function buildWhatsAppUrl(values: FormValues): string {
  const message = [
    "Hello Aryan!",
    "",
    "I found your portfolio website and would like to connect with you.",
    "",
    `*Name:* ${values.name.trim()}`,
    "",
    `*Email:* ${values.email.trim()}`,
    "",
    `*Subject:* ${values.subject.trim()}`,
    "",
    "*Message:*",
    values.message.trim(),
    "",
    "Looking forward to hearing from you!",
  ].join("\n");

  return `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const inputClasses =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-[15px] text-zinc-950 placeholder:text-zinc-400 transition-colors focus:border-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-400/10";

export function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setField =
    (field: keyof FormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setValues((v) => ({ ...v, [field]: event.target.value }));
      setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
    };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link still works.
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot filled → almost certainly a bot. Do nothing.
    const honeypot = formRef.current?.querySelector<HTMLInputElement>(
      "#contact-company"
    );
    if (honeypot && honeypot.value.trim().length > 0) return;

    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      const firstError = formRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true']"
      );
      firstError?.focus();
      return;
    }

    const url = buildWhatsAppUrl(values);
    // Opens WhatsApp Web / the WhatsApp app in a new tab, message pre-filled.
    // Note: window.open() with the "noopener" feature always returns null,
    // so we sever the opener reference manually to detect popup blocking.
    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      // Popup blocked — fall back to navigating in the same tab.
      window.location.href = url;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-zinc-200"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: pitch + direct channels */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
                <span aria-hidden="true">05</span>
                <span aria-hidden="true" className="h-px w-8 bg-zinc-300" />
                <span>Contact</span>
              </p>
              <h2
                id="contact-heading"
                className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem]"
              >
                Have a project in mind?{" "}
                <span className="font-serif font-normal italic">
                  Let&apos;s build something meaningful.
                </span>
              </h2>
              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-zinc-600">
                Whether it&apos;s a website, an application, or a product
                idea — I&apos;d love to hear about it. I usually reply within
                a day.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {personalInfo.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950"
                  aria-live="polite"
                >
                  {copied ? (
                    <>
                      <Check className="size-4 text-emerald-600" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" aria-hidden="true" />
                      Copy email
                    </>
                  )}
                </button>
              </div>

              <ul className="flex flex-wrap gap-3 pt-2">
                <li>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950"
                  >
                    <Linkedin className="size-4" aria-hidden="true" />
                    LinkedIn
                    <ArrowUpRight className="size-3.5 text-zinc-400" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950"
                  >
                    <Github className="size-4" aria-hidden="true" />
                    GitHub
                    <ArrowUpRight className="size-3.5 text-zinc-400" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-8 lg:p-10">
              <form ref={formRef} onSubmit={onSubmit} noValidate>
                <h3 className="text-lg font-semibold tracking-tight text-zinc-950">
                  Send a message
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  All fields are required.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium text-zinc-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={setField("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClasses}
                    />
                    {errors.name ? (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="size-3.5" aria-hidden="true" />
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium text-zinc-700"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={setField("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={inputClasses}
                    />
                    {errors.email ? (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="size-3.5" aria-hidden="true" />
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block text-sm font-medium text-zinc-700"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What is this about?"
                    value={values.subject}
                    onChange={setField("subject")}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    className={inputClasses}
                  />
                  {errors.subject ? (
                    <p
                      id="contact-subject-error"
                      className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                    >
                      <AlertCircle className="size-3.5" aria-hidden="true" />
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium text-zinc-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, timeline, and goals…"
                    value={values.message}
                    onChange={setField("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={cn(inputClasses, "resize-y min-h-[8rem]")}
                  />
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                    >
                      <AlertCircle className="size-3.5" aria-hidden="true" />
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                {/* Honeypot — hidden from humans, catches bots */}
                <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                  <label htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/30 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:px-10"
                >
                  <Send
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  Send Message
                </button>
                <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                  You&apos;ll be redirected to WhatsApp with your message
                  pre-filled — just press send.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
