---
description: Stage logical changes and create well-formed Conventional Commits
---
Review the current working tree and create appropriate Conventional Commit(s).

If the working tree is clean, report that there is nothing to commit and stop. If files are already staged, treat the staged set as the intended commit unless I say otherwise. If nothing is staged, inspect unstaged and untracked changes, group them into logical commits, stage the current group, and commit. If the split is ambiguous, explain the proposed grouping and ask before committing.

Load the `git-conventions` skill for commit format, branch naming, and hygiene rules.

**Git safety rules:**
- Never force push to `main`/`master` unless explicitly asked and confirmed.
- Never commit secrets, credentials, `.env` files, or private keys. If they are staged, warn immediately and unstage them.
- One logical change per commit. Keep subject lines under 72 characters.
- Verify the final commit before reporting success.

$ARGUMENTS
