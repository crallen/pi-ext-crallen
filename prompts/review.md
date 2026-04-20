---
description: Review staged or unstaged changes for quality issues
---
Review the current working diff for quality, security, performance, and maintainability issues. Adopt the perspective of a senior code reviewer — read-only analysis, no modifications.

**Prefer the staged diff when present; fall back to unstaged when nothing is staged.** If the diff includes sensitive-looking files (`.env*`, keys, certs, credentials), stop and tell me to redact them before review.

Start by loading the `code-review-checklist` skill for the rubric and output format, and `coding-guardrails` for diff discipline heuristics.

Produce a structured review with `## Summary`, `## Findings` (by severity: CRITICAL / WARNING / INFO), and `## Recommendations`.

$ARGUMENTS
