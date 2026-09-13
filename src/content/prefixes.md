Slash commands always work the same way in every server: `/ban`, `/help`, no setup needed. Prefixes are the configurable part.

## Default prefix

New servers use the bot-wide default from `DEFAULT_PREFIX` (`src/config/env.ts`, default `!`). Change a single server with `/setprefix`.

## Per-server prefixes

Prefixes live in `GuildConfig.prefix` (`src/database/models/guild/GuildConfig.ts`) and are cached in memory (`src/lib/bot-client.ts`), so lookups never hit MongoDB on every message. DMs always fall back to the default prefix.

Servers can also enable `noPrefixMode` (`GuildConfig.noPrefixMode`), which disables prefix commands entirely — slash only.

## Which to teach your members

Teach slash first: it shows option hints, validates input and never collides with another bot's prefix. Keep the prefix for fast moderation typing (`!purge 50`) and for channels where members already know it.
