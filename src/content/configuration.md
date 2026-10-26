- Prefix: `/setprefix` — per-guild, cached
- Admin roles: `/fadmin @Role` (owner-only)
- Mod blanket: `/fmod @Role` (admin+)
- **Granular fake perms**: `/givepermission add @Role ban kick timeout warn purge` / `!gp @Role chatmod` — per-command grants without Discord perms (see Guides → Fake permissions)
- Jail: `/setjailrole`, `/setjailchannel`
- Automatic greetings: `/setgreetchannel add channels:#general`, `/setgreetchannel message template:Hello {{user}}!`, `/setgreetchannel duration time:5m`
- Logs: `/setup` wizard routes audit, moderation, message, member, voice and case logs per channel
- Auto-responses: `/autoresponder`

Stored atomically in `GuildConfig` (`src/database/models/guild/GuildConfig.ts`) via `src/services/core/config-service.ts` with a 5-minute cache and upsert writes. Fake perms live in `GuildConfig.fakePermissions`.

Greeting durations accept seconds, minutes, hours and days, such as `30s`, `5 minutes`, `2h` or `1d`, from 1 second to 365 days. The default is 2 seconds. Check the current duration with `/setgreetchannel list`; changes apply to new greetings. Remove all greet channels to disable them.

Greetings delete automatically, with pending deletions restored after restarts. Downtime or missing permissions can delay deletion. Give Bolt View Channel, Send Messages and Read Message History in greet channels. Permanent welcome messages and manual greeting commands have been removed.
