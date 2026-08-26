# Private source documents

Authored DOCX sources were moved outside the deployable repository on 26 August 2026 because the originals contain private account values.

The privacy-safe monthly review data in `src/data/monthlyPortfolioReviews.generated.ts` preserves the public narrative, percentage performance, decisions and lessons. To regenerate it from the private originals, pass the private monthly-review directory to:

```sh
npm run content:portfolio-reviews -- /absolute/path/to/monthly-reviews
```

The importer deliberately omits document download URLs and removes personal ledger facts.
