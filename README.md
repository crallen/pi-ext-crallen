# pi-ext-crallen

A [pi](https://pi.dev) package that bundles a development workflow extension, on-demand skills, and prompt templates.

## What's Included

### Extension

**Sensitive file guard** — intercepts `read`, `write`, `edit`, and `bash` tool calls to block access to files matching sensitive patterns (`.env`, private keys, credentials, `.tfvars`, etc.).

**Workflow system prompt** — injects skill selection guidance, development workflow rules, and protected-file reminders into every agent turn.

### Skills (13)

On-demand procedural knowledge loaded by the agent when the task matches:

| Skill | Description |
|---|---|
| `coding-guardrails` | Cross-cutting execution guardrails — assumptions, simplicity, surgical changes, verification |
| `backend-patterns` | Handlers, services, validation, auth/authz, integrations |
| `database-patterns` | Schemas, migrations, indexes, constraints, transactions, queries |
| `frontend-patterns` | UI component architecture, styling, accessibility (router with reference files) |
| `test-strategy` | Test types, coverage targets, mocking strategies, suite structure |
| `debugging-methodology` | Reproduction, evidence gathering, hypothesis testing, root cause analysis |
| `git-conventions` | Conventional Commits, branching model, git workflow rules |
| `security-analysis` | Vulnerability taxonomy, data flow analysis, dependency auditing |
| `docker-best-practices` | Image optimization, multi-stage builds, security hardening, Compose patterns |
| `ci-pipeline` | GitHub Actions / GitLab CI build, test, lint, caching, deployment |
| `doc-templates` | READMEs, API docs, ADRs, changelogs, inline documentation |
| `spec-writing` | Collaborative idea-to-spec workflow with dialogue and task checklists |
| `code-review-checklist` | Structured review rubric covering correctness, security, performance, maintainability |

### Prompt Templates (3)

| Template | Description |
|---|---|
| `/review` | Review staged or unstaged changes for quality issues |
| `/commit` | Stage logical changes and create Conventional Commits |
| `/spec <goal>` | Research a goal and produce a design spec with task checklist |

## Install

```bash
pi install git:github.com/crallen/pi-ext-crallen
```

Or add to your `settings.json`:

```json
{
  "packages": ["git:github.com/crallen/pi-ext-crallen"]
}
```

## Development

```bash
git clone https://github.com/crallen/pi-ext-crallen.git
cd pi-ext-crallen
npm install

# Type-check
npm run check

# Test locally with pi
pi -e ./src/index.ts
```

## License

[MIT](LICENSE)
