import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Submissions are forwarded to Formspree (https://formspree.io) using the
 * FORMSPREE_FORM_ID environment variable. See README.md for setup.
 *
 * If the form ID is not configured yet, the endpoint responds with 503 and a
 * clear message — it never fakes a successful send.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Minimal in-memory rate limiting (per IP, sliding 60s window) ---
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    // Keep the map bounded
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX_REQUESTS;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown; // honeypot
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot filled → almost certainly a bot. Pretend success, drop silently.
  if (asString(payload.company).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(payload.name).trim();
  const email = asString(payload.email).trim();
  const subject = asString(payload.subject).trim();
  const message = asString(payload.message).trim();

  // Server-side validation (mirrors the client)
  if (name.length < 2 || name.length > 120) {
    return NextResponse.json(
      { error: "Please provide your name." },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 }
    );
  }
  if (subject.length < 3 || subject.length > 200) {
    return NextResponse.json(
      { error: "Please provide a subject." },
      { status: 422 }
    );
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Your message should be between 10 and 5000 characters." },
      { status: 422 }
    );
  }

  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) {
    return NextResponse.json(
      {
        ok: false,
        notConfigured: true,
        error:
          "The contact form is not set up yet. Please email me directly and I'll get back to you.",
      },
      { status: 503 }
    );
  }

  try {
    const formspreeRes = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        _replyto: email,
        _subject: `Portfolio contact: ${subject}`,
      }),
      cache: "no-store",
    });

    if (formspreeRes.ok) {
      return NextResponse.json({ ok: true });
    }

    // Formspree rejected the submission (bad form id, plan limit, etc.)
    return NextResponse.json(
      {
        ok: false,
        error:
          "The message could not be delivered right now. Please try again later or email me directly.",
      },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "The message could not be delivered right now. Please try again later or email me directly.",
      },
      { status: 502 }
    );
  }
}
