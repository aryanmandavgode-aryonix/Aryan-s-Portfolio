#!/usr/bin/env python3
"""Generate an ATS-safe one-page resume PDF for Aryan Mandavgode.

Only verified information from the portfolio brief is used.
Output: public/resume-aryan-mandavgode.pdf
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
    KeepTogether,
)

INK = HexColor("#111111")
BODY = HexColor("#333333")
MUTED = HexColor("#555555")
RULE = HexColor("#CCCCCC")

OUT = "/home/z/my-project/public/resume-aryan-mandavgode.pdf"

styles = {
    "name": ParagraphStyle(
        "name", fontName="Helvetica-Bold", fontSize=22, leading=26,
        textColor=INK, spaceAfter=2,
    ),
    "title": ParagraphStyle(
        "title", fontName="Helvetica", fontSize=10.5, leading=14,
        textColor=MUTED, spaceAfter=3,
    ),
    "contact": ParagraphStyle(
        "contact", fontName="Helvetica", fontSize=9, leading=13,
        textColor=BODY,
    ),
    "section": ParagraphStyle(
        "section", fontName="Helvetica-Bold", fontSize=10.5, leading=13,
        textColor=INK, spaceBefore=0, spaceAfter=0,
    ),
    "body": ParagraphStyle(
        "body", fontName="Helvetica", fontSize=9.5, leading=14,
        textColor=BODY, alignment=TA_LEFT,
    ),
    "itemtitle": ParagraphStyle(
        "itemtitle", fontName="Helvetica-Bold", fontSize=10, leading=13.5,
        textColor=INK,
    ),
    "itemmeta": ParagraphStyle(
        "itemmeta", fontName="Helvetica", fontSize=9, leading=13.5,
        textColor=MUTED,
    ),
    "bullet": ParagraphStyle(
        "bullet", fontName="Helvetica", fontSize=9.5, leading=13.5,
        textColor=BODY, leftIndent=10, bulletIndent=0, spaceBefore=1.5,
    ),
}

LINK = '<a href="%s" color="#111111"><u>%s</u></a>'


def section_header(text):
    return [
        Spacer(1, 10),
        Paragraph(text, styles["section"]),
        Spacer(1, 3),
        HRFlowable(width="100%", thickness=0.7, color=RULE, spaceAfter=7),
    ]


def bullet(text):
    return Paragraph(
        f'<bullet>&bull;</bullet>{text}', styles["bullet"]
    )


def build():
    doc = SimpleDocTemplate(
        OUT,
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title="Aryan Mandavgode - Resume",
        author="Aryan Mandavgode",
        subject="Resume - Full-Stack Developer & Founder of ARYONIX",
        creator="Aryan Mandavgode",
    )

    story = []

    # ---- Header ----
    story.append(Paragraph("Aryan Mandavgode", styles["name"]))
    story.append(Paragraph(
        "Full-Stack Developer&nbsp;&nbsp;|&nbsp;&nbsp;Founder of ARYONIX",
        styles["title"],
    ))
    story.append(Paragraph(
        "Pune, Maharashtra, India &nbsp;&nbsp;&middot;&nbsp;&nbsp;"
        + LINK % ("mailto:aryanmandavgode@gmail.com", "aryanmandavgode@gmail.com")
        + " &nbsp;&nbsp;&middot;&nbsp;&nbsp;"
        + LINK % ("https://www.linkedin.com/in/aryan-mandavgode/", "LinkedIn")
        + " &nbsp;&nbsp;&middot;&nbsp;&nbsp;"
        + LINK % ("https://github.com/aryanmandavgode-aryonix", "GitHub")
        + " &nbsp;&nbsp;&middot;&nbsp;&nbsp;"
        + LINK % ("https://www.aryonix.in/", "aryonix.in"),
        styles["contact"],
    ))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.1, color=INK, spaceAfter=2))

    # ---- Summary ----
    story.extend(section_header("SUMMARY"))
    story.append(Paragraph(
        "Computer Science Engineering student and full-stack developer, and the "
        "founder of ARYONIX, a digital development agency building websites, "
        "applications, software, and SaaS products. Experienced in taking client "
        "requirements from concept to deployed product across frontend, backend, "
        "and UI/UX design. Interested in SaaS, product engineering, and building "
        "digital products that are useful, fast, and considered.",
        styles["body"],
    ))

    # ---- Experience ----
    story.extend(section_header("EXPERIENCE"))
    exp_head = [
        Paragraph("Founder &amp; Full-Stack Developer", styles["itemtitle"]),
        Paragraph(
            "ARYONIX &nbsp;&middot;&nbsp; December 2025 &ndash; Present",
            styles["itemmeta"],
        ),
        Spacer(1, 3),
    ]
    exp_body = [
        bullet("Design and build websites and digital products for real business needs."),
        bullet("Own frontend and backend development, from architecture to deployment."),
        bullet("Lead UI/UX design decisions with a focus on clarity and usability."),
        bullet(
            "Work directly with clients to shape focused, practical digital solutions."
        ),
    ]
    story.append(KeepTogether(exp_head + exp_body))

    # ---- Projects ----
    story.extend(section_header("PROJECTS"))
    projects = [
        (
            "ARYONIX",
            LINK % ("https://www.aryonix.in/", "aryonix.in"),
            "A digital development agency focused on websites, applications, "
            "software, and SaaS products.",
        ),
        (
            "AgencyOS",
            "In development",
            "A SaaS concept designed to streamline agency operations, project "
            "management, clients, and workflows.",
        ),
        (
            "New Dimension",
            "Concept",
            "A modern business website concept designed to establish a strong "
            "digital presence.",
        ),
        (
            "Elevate Fitness",
            "Concept",
            "A modern fitness website concept with a premium visual identity "
            "and responsive experience.",
        ),
        (
            "Fitniq",
            "Website project",
            "A gym website development project focused on presenting fitness "
            "services and membership information.",
        ),
    ]
    for name, meta, desc in projects:
        story.append(KeepTogether([
            Paragraph(
                f"{name} &nbsp;<font size=8.5 color='#555555'>&mdash; {meta}</font>",
                styles["itemtitle"],
            ),
            Paragraph(desc, styles["body"]),
            Spacer(1, 4),
        ]))

    # ---- Education ----
    story.extend(section_header("EDUCATION"))
    story.append(KeepTogether([
        Paragraph("B.Tech, Computer Science Engineering", styles["itemtitle"]),
        Paragraph(
            "Ajeenkya DY Patil University &nbsp;&middot;&nbsp; 2024&ndash;2028",
            styles["itemmeta"],
        ),
    ]))

    # ---- Skills ----
    story.extend(section_header("SKILLS"))
    skills = [
        ("Frontend", "HTML5, CSS3, JavaScript, React.js, Next.js, Tailwind CSS"),
        ("Backend", "Node.js, Express.js, REST APIs"),
        ("Database", "MongoDB, SQL, Prisma"),
        ("Tools", "Git, GitHub, VS Code, Figma, Vercel"),
        ("Design", "UI/UX Design, Responsive Design, Web Design"),
    ]
    for label, items in skills:
        story.append(Paragraph(
            f"<b>{label}:</b> {items}", styles["body"]
        ))
        story.append(Spacer(1, 2))

    doc.build(story)
    print(f"Resume written to {OUT}")


if __name__ == "__main__":
    build()
