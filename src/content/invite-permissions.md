Give Bolt only what it needs. Every command declares `requiredClientPermissions` (for example `ban` needs `BanMembers` and `SendMessages`), checked at execution time in `src/preconditions/UserPermissions.ts`.

Access control has three layers:

1. Discord channel permissions for the bot.
2. Moderation gate: owner, `Administrator`, `ManageGuild`, or a configured admin role (`src/preconditions/ModerationPermission.ts`).
3. In-command check plus hierarchy recheck (for example `target.member.bannable` in `src/commands/moderation/ban.ts`).

Configure access with `/setup` and `/setadminrole`. Owner-only commands (for example `/setadminrole`) require `guild.ownerId`.
