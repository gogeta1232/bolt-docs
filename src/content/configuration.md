- Prefix: `/setprefix` — per-guild, cached
- Admin roles: `/fadmin @Role` (owner-only)
- Mod blanket: `/fmod @Role` (admin+)
- **Granular fake perms**: `/givepermission add @Role ban kick timeout warn purge` / `!gp @Role chatmod` — per-command grants without Discord perms (see Guides → Fake permissions)
- Jail: `/setjailrole`, `/setjailchannel`
- Greetings: `/setwelcome`, `/setgreetchannel`
- Logs: `/setup` wizard routes audit, moderation, message, member, voice and case logs per channel
- Auto-responses: `/autoresponder`

Stored atomically in `GuildConfig` (`src/database/models/guild/GuildConfig.ts`) via `src/services/core/config-service.ts` with a 5-minute cache and upsert writes. Fake perms live in `GuildConfig.fakePermissions`.
