Yes — Bolt has two independent permission systems, and they stack.

## Key 1: real Discord permissions

Each moderation action maps to the Discord permission that genuinely owns it
(`src/lib/utils/moderation-permission-checker.ts`):

- `ban`, `unban`, `softban` → `BanMembers`
- `kick` → `KickMembers`
- `timeout` → `ModerateMembers`
- `mute` → `ManageRoles`
- `purge` → `ManageMessages`

Role hierarchy is rechecked live at execution (`target.member.bannable`), so a
mid-flow promotion cannot be bypassed. Failing this check denies the command —
no silent fallback.

## Key II — Bolt admin roles

`GuildConfig.adminRoleIds` stores plain Discord role IDs in MongoDB. Those
roles need **zero** Discord permissions — a role with nothing ticked still
grants full Bolt authority to its holders. The bot knows; Discord doesn't.

Grant with `/fadmin @role` (server-owner only, alias `/setadminrole`).
Admins get everything: moderation, admin surface, and the right to hand out
the mod keys below.

## Key IIb — Bolt mod roles (blanket)

`GuildConfig.modRoleIds` is the junior blanket key: all moderation commands —
no admin surface, no grants, ever. Hand it out with `/fmod @role`, runnable by
the owner **and** by admin-key holders.

## Key IIc — Granular fake permissions (per-command)

`GuildConfig.fakePermissions` (`Record<roleId, PermissionFlag[]>`) lets an
admin grant only some powers — e.g. a role that can `kick` + `timeout` + `purge`
but not `ban` or `role`. Zero Discord permissions on the role, just like the
keys above.

```
Slash:  /givepermission add role:@Trial permissions: kick timeout warn purge
Prefix: !gp @Trial kick timeout warn purge
        !gp @Trial chatmod          // preset
        !gp @Trial all              // every choice
```

Choices: `ban`, `unban`, `softban`, `kick`, `timeout`, `untimeout`, `warn`,
`mute`, `unmute`, `jail`, `unjail`, `purge`, `slowmode`, `nick`, `role`,
`voice`, `hide`, `unhide`, `cases`.

Presets: `chatmod`, `mod`, `seniormod`, `full`/`all`.

Full guide with slash + prefix examples: **Guides → Fake permissions — granular setup**.

Checked in three places, always after owner / `Administrator` /
`ManageGuild` / admin roles:

- `src/lib/utils/moderation-permission-checker.ts` (`adminRole` → `fakePerms` → `modRole`)
- `src/preconditions/ModerationPermission.ts`
- `src/lib/permissions.ts` (`hasAdminAccess` — admin key only, mods/fake excluded)

Granular checks use `src/lib/fake-permissions.ts` (`normalizePermissionToken`,
`parsePermissionTokens`, `getMemberFakePermissions`).

## See it live

Run `/permissions` (alias `/access`) in Discord: it resolves your own access
into Key I vs Key II with the current prefix and the exact setup step for your
server. Admins can inspect anyone with `/permissions @member`.

## Which to use

Real Discord permissions when the role should be powerful everywhere (other
bots respect them too). Bot-side admin roles when you want moderators who can
only act through Bolt — least privilege, no stray `Administrator` grants.
