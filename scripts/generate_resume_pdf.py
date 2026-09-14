#!/usr/bin/env python3
"""Generate the PDF resume from the current site content."""

from __future__ import annotations

import os
import json
import hashlib
import shutil
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image, ImageDraw, ImageOps
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable,
    Image as RLImage,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Соснович Иван Владимирович — для сайта.pdf"
TMP = ROOT / "tmp" / "pdfs"
ENTITIES = ("profile", "experience", "project", "personal-project", "education", "publication")
DATA = {name: json.loads((ROOT / "src" / "entities" / name / "model" / "data.json").read_text()) for name in ENTITIES}
PROFILE = DATA["profile"]
SITE_URL = PROFILE["siteUrl"]

PAGE_W, PAGE_H = A4
MARGIN_X = 15 * mm
MARGIN_TOP = 15 * mm
MARGIN_BOTTOM = 14 * mm
CONTENT_W = PAGE_W - 2 * MARGIN_X

INK = colors.HexColor("#0F172A")
TEXT = colors.HexColor("#334155")
MUTED = colors.HexColor("#64748B")
PALE = colors.HexColor("#F8FAFC")
WHITE = colors.white
BORDER = colors.HexColor("#E2E8F0")
BRAND = colors.HexColor("#4F46E5")
BRAND_DARK = colors.HexColor("#3730A3")
BRAND_PALE = colors.HexColor("#EEF2FF")
SUCCESS = colors.HexColor("#059669")
SUCCESS_PALE = colors.HexColor("#ECFDF5")


def clean(value: str) -> str:
    """Keep the output compatible with PDF readers and the PDF skill contract."""
    return (
        value.replace("\u2011", "-")
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2212", "-")
        .replace("\u2194", "<->")
    )


def prepare_avatar() -> Path:
    TMP.mkdir(parents=True, exist_ok=True)
    output = TMP / "avatar-circle.png"
    source = Image.open(ROOT / "public" / "avatar.jpg").convert("RGB")
    portrait = ImageOps.fit(source, (560, 560), method=Image.Resampling.LANCZOS, centering=(0.5, 0.38))
    mask = Image.new("L", portrait.size, 0)
    ImageDraw.Draw(mask).ellipse((0, 0, portrait.width - 1, portrait.height - 1), fill=255)
    rgba = portrait.convert("RGBA")
    rgba.putalpha(mask)
    rgba.save(output)
    return output


def register_fonts() -> None:
    candidates = [
        (Path(os.environ.get("RESUME_FONT_DIR", "/System/Library/Fonts/Supplemental")), ["Arial.ttf", "Arial Bold.ttf", "Arial Italic.ttf"]),
        (Path("/usr/share/fonts/truetype/dejavu"), ["DejaVuSans.ttf", "DejaVuSans-Bold.ttf", "DejaVuSans-Oblique.ttf"]),
    ]
    for directory, names in candidates:
        if all((directory / name).is_file() for name in names):
            for alias, name in zip(["Resume", "Resume-Bold", "Resume-Italic"], names):
                pdfmetrics.registerFont(TTFont(alias, str(directory / name)))
            return
    raise RuntimeError("Install Arial (macOS) or fonts-dejavu-core (Linux) to build the PDF.")



register_fonts()
BASE = getSampleStyleSheet()

styles = {
    "name": ParagraphStyle(
        "Name", parent=BASE["Normal"], fontName="Resume-Bold", fontSize=24,
        leading=26, textColor=INK, spaceAfter=4,
    ),
    "role": ParagraphStyle(
        "Role", parent=BASE["Normal"], fontName="Resume", fontSize=10.5,
        leading=14, textColor=TEXT, spaceAfter=6,
    ),
    "meta": ParagraphStyle(
        "Meta", parent=BASE["Normal"], fontName="Resume", fontSize=8.4,
        leading=11.5, textColor=MUTED,
    ),
    "section": ParagraphStyle(
        "Section", parent=BASE["Heading2"], fontName="Resume-Bold", fontSize=14,
        leading=17, textColor=INK, spaceBefore=1, spaceAfter=7,
    ),
    "subsection": ParagraphStyle(
        "Subsection", parent=BASE["Heading3"], fontName="Resume-Bold", fontSize=10,
        leading=13, textColor=INK, spaceAfter=2,
    ),
    "company": ParagraphStyle(
        "Company", parent=BASE["Normal"], fontName="Resume-Bold", fontSize=8.8,
        leading=11, textColor=BRAND_DARK,
    ),
    "period": ParagraphStyle(
        "Period", parent=BASE["Normal"], fontName="Resume", fontSize=7.5,
        leading=9.5, textColor=MUTED, alignment=TA_RIGHT,
    ),
    "body": ParagraphStyle(
        "Body", parent=BASE["BodyText"], fontName="Resume", fontSize=8.1,
        leading=11.2, textColor=TEXT, spaceAfter=4,
    ),
    "small": ParagraphStyle(
        "Small", parent=BASE["BodyText"], fontName="Resume", fontSize=7.3,
        leading=9.5, textColor=TEXT,
    ),
    "bullet": ParagraphStyle(
        "Bullet", parent=BASE["BodyText"], fontName="Resume", fontSize=7.7,
        leading=10.2, textColor=TEXT, leftIndent=9, firstLineIndent=-7,
        bulletIndent=0, spaceAfter=2.3,
    ),
    "kicker": ParagraphStyle(
        "Kicker", parent=BASE["Normal"], fontName="Resume-Bold", fontSize=7.4,
        leading=9, textColor=BRAND_DARK, uppercase=True, spaceAfter=3,
    ),
    "center": ParagraphStyle(
        "Center", parent=BASE["Normal"], fontName="Resume", fontSize=8,
        leading=10.5, textColor=MUTED, alignment=TA_CENTER,
    ),
}


def p(text: str, style: str = "body") -> Paragraph:
    return Paragraph(clean(text), styles[style])


def bullet(text: str) -> Paragraph:
    return Paragraph(f'<font color="#4F46E5">&#8226;</font> {clean(escape(text))}', styles["bullet"])


def link(label: str, url: str, color: str = "#3730A3") -> str:
    safe_label = escape(clean(label))
    safe_url = escape(url, {'"': '&quot;'})
    return f'<link href="{safe_url}" color="{color}"><u>{safe_label}</u></link>'


class SectionRule(Flowable):
    def __init__(self, label: str, accent: colors.Color = BRAND):
        super().__init__()
        self.label = clean(label)
        self.accent = accent
        self.height = 22

    def wrap(self, avail_width, avail_height):
        self.width = avail_width
        return avail_width, self.height

    def draw(self):
        self.canv.setFillColor(self.accent)
        self.canv.roundRect(0, 4, 4, 14, 2, fill=1, stroke=0)
        self.canv.setFont("Resume-Bold", 13)
        self.canv.setFillColor(INK)
        self.canv.drawString(11, 6, self.label)
        self.canv.setStrokeColor(BORDER)
        self.canv.setLineWidth(0.6)
        text_width = pdfmetrics.stringWidth(self.label, "Resume-Bold", 13)
        self.canv.line(20 + text_width, 9.5, self.width, 9.5)


class TagCloud(Flowable):
    def __init__(self, tags: list[str], font_size: float = 7.2, gap: float = 4, row_gap: float = 4):
        super().__init__()
        self.tags = [clean(tag) for tag in tags]
        self.font_size = font_size
        self.gap = gap
        self.row_gap = row_gap
        self.lines: list[list[tuple[str, float]]] = []

    def wrap(self, avail_width, avail_height):
        self.lines = []
        line: list[tuple[str, float]] = []
        used = 0.0
        for tag in self.tags:
            pill_w = pdfmetrics.stringWidth(tag, "Resume", self.font_size) + 13
            extra = pill_w if not line else pill_w + self.gap
            if line and used + extra > avail_width:
                self.lines.append(line)
                line = []
                used = 0.0
            line.append((tag, pill_w))
            used += pill_w if len(line) == 1 else pill_w + self.gap
        if line:
            self.lines.append(line)
        row_h = self.font_size + 7
        self.height = len(self.lines) * row_h + max(0, len(self.lines) - 1) * self.row_gap
        self.width = avail_width
        return avail_width, self.height

    def draw(self):
        row_h = self.font_size + 7
        y = self.height - row_h
        for line in self.lines:
            x = 0.0
            for tag, pill_w in line:
                self.canv.setFillColor(BRAND_PALE)
                self.canv.roundRect(x, y, pill_w, row_h, row_h / 2, fill=1, stroke=0)
                self.canv.setFillColor(BRAND_DARK)
                self.canv.setFont("Resume", self.font_size)
                self.canv.drawString(x + 6.5, y + 4.2, tag)
                x += pill_w + self.gap
            y -= row_h + self.row_gap


def card(flowables: list[Flowable], padding: float = 8, background=WHITE, border=BORDER) -> Table:
    t = Table([[flowables]], colWidths=[CONTENT_W], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), background),
        ("BOX", (0, 0), (-1, -1), 0.65, border),
        ("LEFTPADDING", (0, 0), (-1, -1), padding),
        ("RIGHTPADDING", (0, 0), (-1, -1), padding),
        ("TOPPADDING", (0, 0), (-1, -1), padding),
        ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
    ]))
    return t


def two_column_cards(left: list[Flowable], right: list[Flowable], gap: float = 7) -> Table:
    width = (CONTENT_W - gap) / 2
    t = Table([[left, right]], colWidths=[width, width], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), WHITE),
        ("BOX", (0, 0), (0, 0), 0.65, BORDER),
        ("BOX", (1, 0), (1, 0), 0.65, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (1, 0), (1, 0), 8 + gap),
    ]))
    return t


def job_card(company: str, position: str, period: str, duration: str, summary: str,
             achievements: list[str], stack: list[str]) -> Table:
    header = Table(
        [[p(escape(position), "subsection"), p(f"{escape(clean(period))}<br/>{escape(clean(duration))}", "period")]],
        colWidths=[CONTENT_W - 132, 116],
    )
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    content: list[Flowable] = [header, p(escape(company), "company"), Spacer(1, 3), p(escape(summary), "small")]
    content.extend(bullet(item) for item in achievements)
    content.extend([Spacer(1, 2), p(f'<font color="#64748B"><b>Стек:</b> {escape(", ".join(clean(s) for s in stack))}</font>', "small")])
    return card(content, padding=8)


def project_block(name: str, company: str, description: str, details: list[str], stack: list[str], url: str | None = None) -> list[Flowable]:
    title = link(name, url) if url else escape(clean(name))
    flowables: list[Flowable] = [
        p(title, "subsection"),
        p(escape(clean(company)), "company"),
        Spacer(1, 2),
        p(escape(clean(description)), "small"),
    ]
    flowables.extend(bullet(item) for item in details)
    flowables.extend([Spacer(1, 2), p(f'<font color="#64748B"><b>Стек:</b> {escape(", ".join(clean(s) for s in stack))}</font>', "small")])
    return flowables


def page_chrome(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PALE)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    if doc.page > 1:
        canvas.setFont("Resume-Bold", 7.6)
        canvas.setFillColor(INK)
        canvas.drawString(MARGIN_X, PAGE_H - 9 * mm, PROFILE["name"])
        canvas.setFont("Resume", 7.4)
        canvas.setFillColor(BRAND_DARK)
        canvas.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 9 * mm, "sosnovich-ivan.ru")
        canvas.linkURL(SITE_URL, (PAGE_W - MARGIN_X - 80, PAGE_H - 11 * mm, PAGE_W - MARGIN_X, PAGE_H - 6 * mm), relative=0)
        canvas.setStrokeColor(BORDER)
        canvas.setLineWidth(0.5)
        canvas.line(MARGIN_X, PAGE_H - 11 * mm, PAGE_W - MARGIN_X, PAGE_H - 11 * mm)
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN_X, 10 * mm, PAGE_W - MARGIN_X, 10 * mm)
    canvas.setFont("Resume", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN_X, 6.5 * mm, f"Актуализировано по данным сайта - {date.today().isoformat()}")
    canvas.drawRightString(PAGE_W - MARGIN_X, 6.5 * mm, f"{doc.page}")
    canvas.restoreState()


def selected(item, field, index_field):
    values = item[field]
    indices = item.get(index_field, list(range(len(values))))
    return [values[i] for i in indices]


def project_content(item):
    return project_block(item["name"], item["company"], item["description"],
                         selected(item, "details", "pdfDetailIndices"), item["stack"], item.get("repo"))


def build_story() -> list[Flowable]:
    hero = {"title": PROFILE["position"], "headline": PROFILE["headline"], "summary": PROFILE["tagline"], "skills": PROFILE["coreSkills"] + PROFILE["aiSkills"], "results": PROFILE["proofs"]}
    avatar = RLImage(str(prepare_avatar()), width=36 * mm, height=36 * mm, mask="auto")
    intro = [p(escape(PROFILE["name"]), "name"), p(escape(hero["title"]), "role"),
             p(escape(PROFILE["location"]), "meta"), Spacer(1, 5),
             p(escape(hero["headline"]), "subsection"), p(escape(hero["summary"])), p(link(SITE_URL.removeprefix("https://"), SITE_URL), "meta")]
    header = Table([[avatar, intro]], colWidths=[43 * mm, CONTENT_W - 43 * mm])
    header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                               ("LEFTPADDING", (0, 0), (-1, -1), 0),
                               ("RIGHTPADDING", (0, 0), (-1, -1), 8)]))
    story = [header, Spacer(1, 12), TagCloud(hero["skills"]), Spacer(1, 12),
             SectionRule("Избранные результаты")]
    for result in hero["results"]:
        story.append(p(f'<b>{escape(clean(result["value"]))}</b> · {escape(result["label"])}'))
    story.extend([Spacer(1, 8), SectionRule("Компетенции")])
    for role in PROFILE["competenceAreas"]:
        story.extend([p(escape(role["title"]), "subsection"),
                      p(escape(role["description"])), Spacer(1, 5)])
    story.extend([Spacer(1, 8), SectionRule("Контакты")])
    for contact in PROFILE["contacts"]:
        story.append(p(f'{escape(contact["label"])}: {link(contact["value"], contact["href"])}'))
    story.append(PageBreak())

    story.extend([SectionRule("Опыт работы"),
                  p(f'Коммерческая разработка с {PROFILE["careerStartYear"]} года', "meta"), Spacer(1, 7)])
    for job in DATA["experience"]:
        story.extend([job_card(job["company"], job["position"], job["period"], "",
                               job["summary"], selected(job, "achievements", "pdfAchievementIndices"), job["stack"]), Spacer(1, 7)])
    story.append(PageBreak())

    projects = {item["id"]: item for item in DATA["project"]}
    story.extend([SectionRule("Ключевые проекты · SberTech"), card(project_content(projects["kintsugi"])), Spacer(1, 8),
                  two_column_cards(project_content(projects["gridcentr"]), project_content(projects["tsa"])),
                  Spacer(1, 10), SectionRule("Fullstack-проект · фриланс"), card(project_content(projects["yoko"])), PageBreak()])
    story.extend([SectionRule("Ключевые проекты · Сбер"),
                  two_column_cards(project_content(projects["momentum"]), project_content(projects["reports"])), Spacer(1, 8),
                  two_column_cards(project_content(projects["sbol"]), project_content(projects["efs"])), Spacer(1, 10),
                  SectionRule("Образование и курсы")])
    for item in DATA["education"]:
        story.extend([p(escape(item["title"]), "subsection"),
                      p(f'{escape(item["org"])} · {escape(item["year"])}', "small"), Spacer(1, 6)])
    story.append(PageBreak())
    story.append(SectionRule("Личные проекты"))
    for item in DATA["personal-project"]:
        story.extend([card(project_block(item["name"], "Личный проект", item["description"], item["architecture"][:2], item["technologies"], item["repositoryUrl"])), Spacer(1, 10)])
    story.append(SectionRule("Публикации"))
    for item in DATA["publication"]:
        story.extend([p(link(item["title"], item["href"]), "subsection"), p(escape(item["description"])), Spacer(1, 8)])
    story.extend([SectionRule("Связаться"), p(" · ".join(link(c["value"], c["href"]) for c in PROFILE["contacts"]), "small")])
    return story


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4,
        leftMargin=MARGIN_X, rightMargin=MARGIN_X,
        topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM,
        title=f"{PROFILE["name"]} - {PROFILE["position"]}",
        author=PROFILE["name"],
        subject="Резюме, актуализированное по сайту sosnovich-ivan.ru",
        creator="Codex",
        pageCompression=1,
    )
    doc.build(build_story(), onFirstPage=page_chrome, onLaterPages=page_chrome)
    shutil.copyfile(OUTPUT, ROOT / "public" / "resume.pdf")
    sources = [ROOT / "src" / "entities" / name / "model" / "data.json" for name in ENTITIES]
    sources += [Path(__file__), ROOT / "public" / "avatar.jpg"]
    manifest = {str(source.relative_to(ROOT)): hashlib.sha256(source.read_bytes()).hexdigest() for source in sources}
    manifest["public/resume.pdf"] = hashlib.sha256((ROOT / "public" / "resume.pdf").read_bytes()).hexdigest()
    (ROOT / "scripts" / "resume-pdf-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT)


if __name__ == "__main__":
    main()
