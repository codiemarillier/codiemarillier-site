#!/usr/bin/env python3
"""Extract the approved monthly DOCX reviews into typed website content."""

from __future__ import annotations

import json
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "source-documents" / "monthly-reviews"
OUTPUT = ROOT / "src" / "data" / "monthlyPortfolioReviews.generated.ts"
VIEW_ROOT = ROOT / "public" / "documents" / "portfolio-reviews" / "view"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
W = f"{{{NS['w']}}}"

REVIEWS = [
    {
        "file": "Capital_Research_Review_01_Weeks_1-4.docx",
        "slug": "capital-research-review-01",
        "date": "30 March 2026",
        "tags": ["Drawdown", "Diversification", "Position sizing", "IonQ", "Symbotic", "Gold"],
        "majorEvents": ["First proper drawdown", "Reduced speculative exposure", "First meaningful rebalance"],
        "pageCount": 4,
    },
    {
        "file": "Capital_Research_Review_02_Weeks_5-8.docx",
        "slug": "capital-research-review-02",
        "date": "28 April 2026",
        "tags": ["Recovery", "Patience", "Alphabet", "Symbotic", "Gold", "Position sizing"],
        "majorEvents": ["Recovered from the first drawdown", "Returned above the starting value", "Held course without chasing"],
        "pageCount": 4,
    },
    {
        "file": "Capital_Research_Review_03_Weeks_9-12.docx",
        "slug": "capital-research-review-03",
        "date": "22 May 2026",
        "tags": ["Alphabet", "Cash", "QQQA", "Patience", "Profit taking"],
        "majorEvents": ["Sold Alphabet for a realised profit", "Raised a meaningful cash balance", "Learned to treat waiting as a decision"],
        "pageCount": 4,
    },
    {
        "file": "Capital_Research_Review_04_Weeks_13-16.docx",
        "slug": "capital-research-review-04",
        "date": "23 June 2026",
        "tags": ["Microsoft", "Alphabet", "ASML", "SpaceX", "Pershing Square", "Cash"],
        "majorEvents": ["Re-entered Alphabet near the planned level", "Added SpaceX and Pershing Square", "Cash fell to about £40"],
        "pageCount": 5,
    },
    {
        "file": "Trading_212_Portfolio_Review_3_July-3_August_2026.docx",
        "slug": "capital-research-review-05",
        "date": "6 August 2026",
        "excerpt": "The account ended the review period almost flat and moved just above starting capital in the 6 August snapshot. The fund comparison still shows that a simpler strategy has performed much better so far.",
        "tags": ["Microsoft", "Gold", "Rheinmetall", "Cash", "Portfolio construction", "Behaviour"],
        "majorEvents": [
            "Re-entered Microsoft with £41.40 on 8 July",
            "Moved £10.30 above the original capital",
            "Finished with £0.56 cash and no impulsive trades",
        ],
        "pageCount": 4,
        "skipParagraphs": [
            "MONTHLY INVESTMENT JOURNAL",
            "MONTH IN ONE LINE I made one deliberate purchase, avoided impulsive trading and finished with a clearer set of rules for the portfolio.",
        ],
        "tables": [
            {"label": "Snapshot", "allRows": True},
            {"label": "Benchmark comparison", "allRows": True},
        ],
    },
]


def text_of(element: ET.Element) -> str:
    return "".join(node.text or "" for node in element.findall(".//w:t", NS)).strip()


def paragraph_style(paragraph: ET.Element) -> str:
    style = paragraph.find("w:pPr/w:pStyle", NS)
    return style.get(f"{W}val", "Normal") if style is not None else "Normal"


def table_text(table: ET.Element, label: str = "Snapshot", all_rows: bool = False) -> str:
    cells: list[str] = []
    rows = table.findall("w:tr", NS)
    for row in rows if all_rows else rows[:1]:
        for cell in row.findall("w:tc", NS):
            values = [text_of(paragraph) for paragraph in cell.findall("w:p", NS)]
            cells.extend(value for value in values if value)
    return label + "\n" + "\n".join(cells)


def extract_review(config: dict[str, object]) -> dict[str, object]:
    path = SOURCE_DIR / str(config["file"])
    with ZipFile(path) as archive:
        document = ET.fromstring(archive.read("word/document.xml"))

    title = ""
    subtitle = ""
    intro: list[str] = []
    body: list[str] = []
    current_heading: str | None = None
    current_paragraphs: list[str] = []
    table_index = 0
    skip_paragraphs = set(config.get("skipParagraphs", []))
    table_configs = config.get("tables", [])

    def flush_section() -> None:
        nonlocal current_heading, current_paragraphs
        if current_heading:
            body.append(current_heading + "\n" + "\n\n".join(current_paragraphs))
        current_heading = None
        current_paragraphs = []

    body_element = document.find("w:body", NS)
    if body_element is None:
        raise ValueError(f"No Word document body found in {path}")

    for block in body_element:
        if block.tag == f"{W}tbl":
            if table_index < len(table_configs):
                table_config = table_configs[table_index]
                rendered_table = table_text(
                    block,
                    label=str(table_config["label"]),
                    all_rows=bool(table_config.get("allRows")),
                )
            else:
                rendered_table = table_text(block)
            table_index += 1
            if current_heading:
                current_paragraphs.append(rendered_table)
            else:
                body.append(rendered_table)
            continue
        if block.tag != f"{W}p":
            continue

        value = text_of(block)
        if not value:
            continue
        if value in skip_paragraphs:
            continue
        style = paragraph_style(block).lower().replace(" ", "")

        if style == "title":
            title = value
        elif style == "subtitle":
            subtitle = value
        elif style == "heading1":
            flush_section()
            current_heading = value
        elif style in {"kicker", "snapshotlabel"}:
            continue
        elif current_heading:
            current_paragraphs.append(value)
        else:
            intro.append(value)

    flush_section()
    snapshot = [item for item in body if item.startswith("Snapshot\n")]
    sections = [item for item in body if not item.startswith("Snapshot\n")]
    complete_body = snapshot + intro + sections
    slug = str(config["slug"])
    page_count = int(config["pageCount"])

    return {
        "slug": slug,
        "title": title,
        "subtitle": subtitle,
        "date": config["date"],
        "category": "Monthly Reviews",
        "excerpt": config.get("excerpt") or intro[0],
        "tags": config["tags"],
        "majorEvents": config["majorEvents"],
        "documentUrl": f"/documents/portfolio-reviews/view/{slug}/",
        "documentPdfUrl": f"/documents/portfolio-reviews/{slug}.pdf",
        "documentPages": [
            f"/documents/portfolio-reviews/pages/{slug}/page-{page:02d}.png"
            for page in range(1, page_count + 1)
        ],
        "body": complete_body,
    }


def write_viewer(review: dict[str, object], page_count: int) -> None:
    slug = str(review["slug"])
    title = str(review["title"])
    page_markup = "\n".join(
        f'    <figure><img src="../../pages/{slug}/page-{page:02d}.png" alt="{title} page {page}" '
        f'loading="{"eager" if page == 1 else "lazy"}"><figcaption>Page {page}</figcaption></figure>'
        for page in range(1, page_count + 1)
    )
    output_dir = VIEW_ROOT / slug
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "index.html").write_text(
        f'''<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    body {{ margin: 0; background: #f4f1ea; color: #17221e; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }}
    header {{ max-width: 1120px; margin: 0 auto; padding: 28px 20px 8px; }}
    h1 {{ margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(2rem, 5vw, 3.5rem); }}
    p {{ line-height: 1.7; color: #52625b; }}
    main {{ max-width: 1120px; margin: 0 auto; padding: 16px 20px 64px; }}
    figure {{ margin: 0 0 28px; }}
    img {{ display: block; width: 100%; height: auto; background: white; border: 1px solid rgba(23, 34, 30, 0.16); box-shadow: 0 18px 40px rgba(23, 34, 30, 0.08); }}
    figcaption {{ margin-top: 8px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #52625b; }}
    a {{ color: #32634f; font-weight: 700; }}
  </style>
</head>
<body>
  <header>
    <p><a href="/journal/{slug}">Back to journal page</a> &middot; <a href="../../{slug}.pdf">Open PDF</a></p>
    <h1>{title}</h1>
    <p>This view uses rendered pages from the authored review. A readable text version is also available on the journal page.</p>
  </header>
  <main>
{page_markup}
  </main>
</body>
</html>
''',
        encoding="utf-8",
    )


def main() -> None:
    reviews = [extract_review(config) for config in REVIEWS]
    payload = json.dumps(reviews, ensure_ascii=False, indent=2)
    OUTPUT.write_text(
        "// Generated by scripts/import-monthly-portfolio-reviews.py.\n"
        "// Edit the source DOCX files, then rerun the importer.\n\n"
        "import type { JournalEntry } from './siteData';\n\n"
        f"export const monthlyPortfolioReviews: JournalEntry[] = {payload};\n",
        encoding="utf-8",
    )
    for review, config in zip(reviews, REVIEWS):
        write_viewer(review, int(config["pageCount"]))
    print(f"Imported {len(reviews)} monthly portfolio reviews into {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
