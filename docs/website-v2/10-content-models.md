# Suggested Editable Content Models

These are framework-neutral suggestions.

Codex should adapt them to the existing stack rather than forcing a new technology.

## Site identity

```json
{
  "name": "Codie Marillier",
  "shortIntroduction": "",
  "purposeStatement": "I built this website to document who I am, what I am learning and what I am working towards.",
  "location": "",
  "showLocation": false,
  "contact": {
    "email": "",
    "linkedin": ""
  }
}
```

## Now page

```json
{
  "lastUpdated": "",
  "location": "",
  "work": "",
  "building": [],
  "researching": [],
  "reading": [],
  "learning": [],
  "improving": [],
  "investmentFocus": [],
  "sport": []
}
```

## Work experience

```json
{
  "slug": "sweden",
  "title": "Working in Sweden",
  "location": "Sweden",
  "period": "",
  "status": "past",
  "featured": true,
  "summary": "",
  "responsibilities": [],
  "lessons": [],
  "quote": "",
  "images": [],
  "privacyApproved": false
}
```

## Projects

```json
{
  "slug": "",
  "title": "",
  "status": "active",
  "type": "business",
  "summary": "",
  "problem": "",
  "whatIDid": [],
  "lessons": [],
  "links": [],
  "images": [],
  "claimVerification": []
}
```

Allowed status suggestions:

- active
- researching
- paused
- archived
- completed

## Timeline

```json
{
  "date": "",
  "year": 2026,
  "title": "",
  "category": "work",
  "location": "",
  "summary": "",
  "relatedPage": "",
  "image": "",
  "public": true
}
```

Suggested categories:

- life
- Zimbabwe
- education
- sport
- work
- travel
- investing
- project

## Travel story

```json
{
  "slug": "cambodia",
  "country": "Cambodia",
  "period": "",
  "featured": true,
  "summary": "",
  "people": [
    {
      "name": "Dara",
      "publicNameApproved": true,
      "description": "A Cambodian guide who had previously spent around ten years as a Buddhist monk."
    }
  ],
  "lessons": [],
  "images": [],
  "coordinates": null
}
```

## Books

```json
{
  "slug": "",
  "title": "",
  "author": "",
  "status": "read",
  "dateFinished": "",
  "rating": null,
  "subjects": [],
  "summary": "",
  "whatChanged": "",
  "notes": [],
  "quotes": []
}
```

Copyright note: avoid publishing long copyrighted excerpts.

## Goals

```json
{
  "horizon": "next-five-years",
  "title": "",
  "description": "",
  "status": "direction",
  "lastReviewed": ""
}
```

Use goals as directions, not guaranteed predictions.

## Homepage featured content

```json
{
  "featuredWork": ["sweden", "colchester-estate", "marquee-work"],
  "featuredProjects": [],
  "featuredTravel": ["cambodia"],
  "featuredWriting": [],
  "featuredBooks": []
}
```

## Verification status

For factual claims, consider:

```json
{
  "claim": "Token reached approximately $500,000 market capitalisation",
  "status": "unverified",
  "evidence": "",
  "approvedForPublication": false
}
```

This helps prevent unverified claims from accidentally appearing publicly.
