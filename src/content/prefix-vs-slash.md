Slash: `chatInputRun(interaction)` in each command file. Prefix: `messageRun(message, args)` with per-guild prefix from `GuildConfig.prefix` (default `!`), cached in `src/lib/bot-client.ts`.

Example `ban`: slash reads `target`, `reason`, `evidence` options. Prefix parses mentions, user IDs (`/^\d{17,20}$/`) and falls back to `memberResolver`. Both paths end in the same `performBan` flow: Discord ban, immediate toast reply, background case creation, DM attempt and mod logs.
