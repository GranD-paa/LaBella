# graphify
- **graphify** (`.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

# Persian writing
- **farsi-bidi** (`.claude/skills/farsi-bidi/SKILL.md`) — how to mix Latin words, code identifiers and numbers into Persian prose without the line rendering scrambled. Trigger: `/farsi-bidi`

This one is not opt-in. Every Persian sentence you write for this user — chat
replies, commit messages, UI strings, docs, support tickets — follows those
rules, whether or not the skill is invoked. The short version: put every Latin
run in backticks, never start or end a line with Latin, keep punctuation
against the Persian side, move two or more Latin items into a table, use
Persian digits in prose and Latin digits in code, and make every URL a
markdown link.
