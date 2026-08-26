#!/usr/bin/env python3
"""Extract the approved four-week DOCX reviews into typed website content."""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE_DIR = ROOT / "source-documents" / "monthly-reviews"
SOURCE_DIR = Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else os.environ.get("CODIE_PRIVATE_REVIEW_SOURCE_DIR", DEFAULT_SOURCE_DIR)
)
OUTPUT = ROOT / "src" / "data" / "monthlyPortfolioReviews.generated.ts"
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
        "majorEvents": ["Recovered from the first drawdown", "Finished 0.45% above the starting point", "Held course without chasing"],
        "pageCount": 4,
    },
    {
        "file": "Capital_Research_Review_03_Weeks_9-12.docx",
        "slug": "capital-research-review-03",
        "date": "22 May 2026",
        "tags": ["Alphabet", "Cash", "QQQA", "Patience", "Profit taking"],
        "majorEvents": ["Sold Alphabet for a realised profit", "Raised cash to a 12.42% allocation", "Learned to treat waiting as a decision"],
        "pageCount": 4,
    },
    {
        "file": "Capital_Research_Review_04_Weeks_13-16.docx",
        "slug": "capital-research-review-04",
        "date": "23 June 2026",
        "tags": ["Microsoft", "Alphabet", "ASML", "SpaceX", "Pershing Square", "Cash"],
        "majorEvents": ["Re-entered Alphabet near the planned level", "Added SpaceX and Pershing Square", "Cash allocation fell to about 2%"],
        "pageCount": 5,
    },
    {
        "file": "Capital_Research_Review_05_3_July-3_August_2026.docx",
        "slug": "capital-research-review-05",
        "title": "Capital Research Review 05",
        "subtitle": "Portfolio Review: 3 July–3 August 2026 · Valuation updated 6 August 2026",
        "date": "6 August 2026",
        "excerpt": "The 6 August snapshot finished 0.52% above the starting point after a quiet month shaped by one deliberate Microsoft purchase and no impulsive trades.",
        "tags": ["Microsoft", "Gold", "Rheinmetall", "Index funds", "Position sizing", "Behaviour"],
        "majorEvents": ["Moved back above starting capital", "Microsoft gained 23.61%", "Set clearer rules for gold and impulsive trades"],
        "pageCount": 4,
    },
]

SAFE_SNAPSHOTS = {
    "capital-research-review-01": "Snapshot\nSINCE INCEPTION\n−6.85%\nMAXIMUM DRAWDOWN\n−6.85%\nDECISION\nReduced speculative exposure",
    "capital-research-review-02": "Snapshot\nSINCE INCEPTION\n+0.45%\nFROM THE LOW\n~9.7%\nPERIOD HIGH\n+1.34%",
    "capital-research-review-03": "Snapshot\nSINCE INCEPTION\n−0.78%\nCASH ALLOCATION\n12.42%\nDECISION\nRaised cash and waited",
    "capital-research-review-04": "Snapshot\nSINCE INCEPTION\n~−0.90%\nPERIOD HIGH\n+2.84%\nCASH ALLOCATION\n~2.02%",
    "capital-research-review-05": "Snapshot\nSINCE INCEPTION\n+0.52%\nCASH ALLOCATION\n0.03%\nLARGEST POSITION\nGold | 17.46%\nVALUATION UPDATED\n6 August 2026",
}

SAFE_EXCERPTS = {
    "capital-research-review-01": "The first month tested the portfolio with a 6.85% drawdown, prompting a reduction in speculative exposure without abandoning the underlying strategy.",
    "capital-research-review-02": "The portfolio recovered from its first drawdown and finished 0.45% above the starting point without relying on one oversized bet.",
    "capital-research-review-03": "The portfolio finished 0.78% below the starting point while cash rose to 12.42%, turning patience into an explicit allocation decision.",
    "capital-research-review-04": "The portfolio reached a 2.84% period high before finishing about 0.90% below the starting point, with cash reduced to roughly 2%.",
    "capital-research-review-05": "The 6 August snapshot finished 0.52% above the starting point after a quiet month shaped by one deliberate Microsoft purchase and no impulsive trades.",
}


def sentence_is_private(sentence: str) -> bool:
    """Remove personal ledger facts while retaining public company figures and prices."""
    lowered = sentence.lower()
    if "trading 212" in lowered or "trading212" in lowered:
        return True
    if re.search(r"\b(?:\d+(?:\.\d+)?|one|two|three|four|five)\s+shares?\b", sentence, re.I):
        return True
    if any(term in lowered for term in ("new wages", "salary", "monthly savings", "spare cash")):
        return True
    if not re.search(r"[£$]\s?\d", sentence):
        return False

    # These are public market/company figures, not personal account information.
    if "nav of £57.21 per share" in lowered and "price of £38.08" in lowered:
        return False
    if "preferred range" in lowered and re.search(r"\$3(?:59|60|65)", sentence):
        return False
    if "entry range" in lowered and re.search(r"\$3(?:59|60|65)", sentence):
        return False
    return True


def sanitize_paragraph(paragraph: str) -> str:
    sentences = re.split(r"(?<=[.!?])\s+", paragraph.strip())
    kept = [sentence for sentence in sentences if sentence and not sentence_is_private(sentence)]
    return (
        " ".join(kept)
        .replace("each pound", "each allocation")
        .replace("cash balance", "cash allocation")
        .replace("Cash balance", "Cash allocation")
        .strip()
    )


def sanitize_block(block: str) -> str:
    if block.startswith("Snapshot\n"):
        return block
    parts = block.split("\n")
    heading = parts[0] if len(parts) > 1 else ""
    content = "\n".join(parts[1:]) if heading else block
    paragraphs = [sanitize_paragraph(item) for item in content.split("\n\n")]
    paragraphs = [item for item in paragraphs if item]
    if heading:
        return heading + ("\n" + "\n\n".join(paragraphs) if paragraphs else "")
    return "\n\n".join(paragraphs)


def text_of(element: ET.Element) -> str:
    return "".join(node.text or "" for node in element.findall(".//w:t", NS)).strip()


def paragraph_style(paragraph: ET.Element) -> str:
    style = paragraph.find("w:pPr/w:pStyle", NS)
    return style.get(f"{W}val", "Normal") if style is not None else "Normal"


def table_snapshot(table: ET.Element) -> str:
    cells: list[str] = []
    for cell in table.findall(".//w:tr/w:tc", NS):
        values = [text_of(paragraph) for paragraph in cell.findall("w:p", NS)]
        cells.extend(value for value in values if value)
    return "Snapshot\n" + "\n".join(cells)


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
            body.append(table_snapshot(block))
            continue
        if block.tag != f"{W}p":
            continue

        value = text_of(block)
        if not value:
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
    slug = str(config["slug"])
    complete_body = [SAFE_SNAPSHOTS[slug]] + [sanitize_block(item) for item in intro + sections]
    complete_body = [item for item in complete_body if item]

    return {
        "slug": slug,
        "title": config.get("title", title),
        "subtitle": config.get("subtitle", subtitle),
        "date": config["date"],
        "category": "Monthly Reviews",
        "excerpt": SAFE_EXCERPTS[slug],
        "tags": config["tags"],
        "majorEvents": config["majorEvents"],
        "body": complete_body,
    }


def main() -> None:
    reviews = [extract_review(config) for config in REVIEWS]
    payload = json.dumps(reviews, ensure_ascii=False, indent=2)
    OUTPUT.write_text(
        "// Generated by scripts/import-monthly-portfolio-reviews.py.\n"
        "// Private source documents are intentionally stored outside the deployable repository.\n\n"
        "import type { JournalEntry } from './siteData';\n\n"
        f"export const monthlyPortfolioReviews: JournalEntry[] = {payload};\n",
        encoding="utf-8",
    )
    print(f"Imported {len(reviews)} monthly portfolio reviews into {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
