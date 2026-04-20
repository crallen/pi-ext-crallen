import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { isToolCallEventType } from "@mariozechner/pi-coding-agent";

// Patterns that should never be read, written, or executed against
const SENSITIVE_PATTERNS = [
  /(?:^|[/\\])\.env(?:rc|\..*)?$/,
  /(?:^|[/\\])\.npmrc$/,
  /(?:^|[/\\])id_(?:rsa|ed25519|ecdsa|dsa)[^/\\]*$/,
  /credentials[^/\\]*\.json$/i,
  /service[_-]?account[^/\\]*\.json$/i,
  /\.(?:pem|key|p12|pfx)$/,
  /\.tfvars(?:\.json)?$/,
  /(?:^|[/\\])secrets?[^/\\]*\.(?:ya?ml|json)$/i,
];

function isSensitivePath(filePath: string): boolean {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(filePath));
}

const WORKFLOW_GUIDANCE = `
## Development Workflow

You have access to a suite of on-demand skills that provide deep procedural knowledge for specific domains. Skills are loaded via the read tool when you need their guidance — they appear in your available skills list with descriptions.

### Skill Selection Guide

| When the work involves... | Load these skills |
|---|---|
| Any implementation work | \`coding-guardrails\` (always) + domain skill |
| Backend handlers, services, auth, validation | \`backend-patterns\` |
| Schema, migrations, indexes, queries, transactions | \`database-patterns\` |
| Frontend UI components, pages, styling | \`frontend-patterns\` (router — it tells you which references to load) |
| Writing or running tests | \`test-strategy\` |
| Investigating bugs | \`debugging-methodology\` |
| Git commits, branches, releases | \`git-conventions\` |
| Security assessment | \`security-analysis\` |
| Docker, CI/CD, infrastructure | \`docker-best-practices\`, \`ci-pipeline\` |
| Documentation | \`doc-templates\` |
| Design before implementation | \`spec-writing\` |
| Code review | \`code-review-checklist\` |

### How to Work

- **Read before changing.** Understand the project's stack, conventions, and existing patterns first.
- **Load skills proactively.** When starting implementation work, load \`coding-guardrails\` plus the relevant domain skill before writing code. Don't wait to be asked.
- **Surface assumptions.** If the request is ambiguous, ask rather than guess. If a simpler approach would work, say so.
- **Keep changes surgical.** Touch only what the request requires. Match existing style.
- **Verify explicitly.** Define how you'll prove the change works before making it.
- **Use \`gh\` for GitHub tasks** when appropriate (PRs, issues, releases, checks).

### Protected Files

Never read or write files matching these patterns: \`.env\`, \`.envrc\`, \`.npmrc\`, private keys (\`.pem\`, \`.key\`, \`.p12\`, \`.pfx\`), credentials files, secrets files, \`.tfvars\`, or SSH identity files. If you encounter them in a diff or staging area, warn immediately.
`.trim();

export default function (pi: ExtensionAPI) {
  // Inject workflow guidance into system prompt
  pi.on("before_agent_start", async (event) => {
    return {
      systemPrompt: event.systemPrompt + "\n\n" + WORKFLOW_GUIDANCE,
    };
  });

  // Block access to sensitive files via read/write/edit tools
  pi.on("tool_call", async (event, ctx) => {
    if (
      isToolCallEventType("read", event) ||
      isToolCallEventType("write", event) ||
      isToolCallEventType("edit", event)
    ) {
      const path = (event.input as { path: string }).path;
      if (isSensitivePath(path)) {
        return { block: true, reason: `Blocked: ${path} matches a sensitive file pattern` };
      }
      return;
    }

    if (isToolCallEventType("bash", event)) {
      const cmd = event.input.command;
      // Extract potential file-like tokens from the command.
      // Strip common shell prefixes/operators so paths after redirects,
      // pipes, and flags are still checked.
      const tokens = cmd
        .replace(/[|;>&<]+/g, " ")
        .split(/\s+/)
        .map((t) => t.replace(/^['"-]+|['"-]+$/g, ""));
      for (const token of tokens) {
        if (token && isSensitivePath(token)) {
          return { block: true, reason: `Blocked: command references sensitive file ${token}` };
        }
      }
    }
  });
}
