import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { personalInfo } from "@/lib/portfolio";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aryan Mandavgode — Full-Stack Developer & Founder of ARYONIX",
    template: "%s — Aryan Mandavgode",
  },
  description:
    "Portfolio of Aryan Mandavgode — Computer Science Engineering student, Full-Stack Developer, and Founder of ARYONIX, based in Pune, India. Building websites, applications, and digital products.",
  keywords: [
    "Aryan Mandavgode",
    "Full-Stack Developer",
    "ARYONIX",
    "Web Developer Pune",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
    "Ajeenkya DY Patil University",
  ],
  authors: [{ name: personalInfo.name, url: siteUrl }],
  creator: personalInfo.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Aryan Mandavgode — Portfolio",
    title: "Aryan Mandavgode — Full-Stack Developer & Founder of ARYONIX",
    description:
      "Computer Science Engineering student, Full-Stack Developer, and Founder of ARYONIX. Building websites, applications, and digital products that make an impact.",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1344,
        height: 768,
        alt: "Aryan Mandavgode — Full-Stack Developer & Founder of ARYONIX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Mandavgode — Full-Stack Developer & Founder of ARYONIX",
    description:
      "Computer Science Engineering student, Full-Stack Developer, and Founder of ARYONIX. Building websites, applications, and digital products.",
    images: ["/images/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: "Full-Stack Developer",
  description:
    "Computer Science Engineering student, Full-Stack Developer, and Founder of ARYONIX.",
  email: `mailto:${personalInfo.email}`,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: personalInfo.university,
  },
  worksFor: {
    "@type": "Organization",
    name: "ARYONIX",
    url: personalInfo.company,
  },
  sameAs: [personalInfo.linkedin, personalInfo.github, personalInfo.company],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
