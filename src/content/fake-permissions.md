# Fake permissions — give Discord powers without Discord permissions

Give a role the ability to use Bolt moderation commands without ticking any Discord permission. The role has **zero** Discord powers — the bot alone enforces the grant.

## How it works

Bolt checks in this order for every moderation command (`src/lib/utils/moderation-permission-checker.ts`):

1. Server owner
2. Real `Administrator` or **fake `Administrator`** (`admin` via `/givepermission` — owner only, treated as admin for every check)
3. Real Discord permission for that command (`ban` → `BanMembers`, `kick` → `KickMembers`, `timeout` → `ModerateMembers`, `mute/jail/role` → `ManageRoles`, `purge` → `ManageMessages`, `slowmode/hide/unhide` → `ManageChannels`, `nick` → `ManageNicknames`, `voice` → `MoveMembers`, `cases` → `ViewAuditLog`)
4. Bolt admin role (`/fadmin`) — full access
5. **Fake permission** for that specific command — granted via `/givepermission` (fake `admin` can grant these)
6. Legacy Bolt mod role (`/fmod`) — all moderation

`Administrator` can never be faked. Use `/fadmin` for that.

Stored in `GuildConfig.fakePermissions` (`Record<roleId, PermissionFlag[]>`) via `src/services/core/config-service.ts`, cached 5 minutes. Owner can also fake `Administrator`.

## What you can grant

| Choice            | What it unlocks                                         | Discord flag                      |
| ----------------- | ------------------------------------------------------- | --------------------------------- |
| `admin`           | **fake Administrator** — full + grant mods (owner only) | `Administrator`                   |
| `ban`             | `!ban`, `/ban`                                          | `BanMembers`                      |
| `unban`           | `!unban`, `/unban`                                      | `BanMembers`                      |
| `softban`         | `!softban`                                              | `BanMembers`                      |
| `kick`            | `!kick`                                                 | `KickMembers`                     |
| `timeout`         | `!timeout`, `/timeout`                                  | `ModerateMembers`                 |
| `untimeout`       | remove timeout                                          | `ModerateMembers`                 |
| `warn`            | `!warn`                                                 | `ModerateMembers`                 |
| `mute`            | `!mute`                                                 | `ManageRoles`                     |
| `unmute`          | unmute                                                  | `ManageRoles`                     |
| `jail` / `unjail` | `!jail` / `!unjail`                                     | `ManageRoles` + `ModerateMembers` |
| `purge` / `clear` | `!purge`                                                | `ManageMessages`                  |
| `slowmode`        | `!slowmode`                                             | `ManageChannels`                  |
| `nick`            | `!nick`                                                 | `ManageNicknames`                 |
| `role`            | `!role`                                                 | `ManageRoles`                     |
| `voice`           | `!voice` move/mute/deafen                               | `MoveMembers`                     |
| `hide` / `unhide` | `!hide` / `!unhide`                                     | `ManageChannels`                  |
| `cases`           | `!cases`                                                | `ViewAuditLog`                    |

Also accepts raw flags like `BanMembers`, `KickMembers`.

## Presets — bundles

- `chatmod` → `purge, slowmode, timeout, untimeout, warn`
- `mod` → `kick, timeout, untimeout, warn, mute, unmute, purge, slowmode, nick`
- `seniormod` → `ban, unban, softban, kick, timeout, untimeout, warn, mute, unmute, jail, unjail, purge, slowmode, nick, role, hide, unhide, voice`
- `full` / `all` → every choice above

Use them like any other permission: `moderator kick` or just `chatmod`.

## Setup — step by step

### 0. Create empty Discord roles

In Server Settings → Roles, create `Trial Mod` etc with **no permissions** ticked.

### 1. Make sure you are admin

You need to be server owner, have `Administrator` / `ManageGuild`, or hold a Bolt admin role (`/fadmin @Role` — owner only). See `/permissions` to verify.

### 2. Grant with slash or prefix — same result

**Slash (recommended):**

```
/givepermission add role:@Trial permissions: kick, timeout, warn, purge
/givepermission add role:@Trial permissions: chatmod
/givepermission add role:@Helper permissions: ban, unban, kick
```

**Prefix:**

```
!gp @Trial kick timeout warn purge
!gp add @Trial chatmod
!gp @Trial ban, kick
!givepermission add @Helper mute unmute jail
```

Quick shorthands all work: `!gp @Role <perms>` defaults to add.

### 3. Manage

```
/givepermission remove role:@Trial permissions: kick
!gp remove @Trial kick
/givepermission list role:@Trial    // or !gp list @Trial
/givepermission list                // all roles
!gp list
/givepermission clear role:@Trial   // wipe
!gp clear @Trial
/givepermission show member:@User   // effective perms for a user
!gp show @User
/givepermission guide               // in-Discord guide with all choices
!gp guide
```

Changes apply instantly, survive restarts, and are audit-logged.

### 4. Verify

```
/permissions @User
!permissions @User
```

Shows `Key I — Discord` vs `Key II — Fake perms` with `via @Role`.

## Examples

- Trial helper who can only purge and timeout: `!gp @Trial purge timeout warn`
- Chat mod bundle: `!gp @ChatMod chatmod`
- Senior who can ban but not touch roles: `!gp @Senior ban, unban, kick, timeout, warn, purge`
- Fake admin (owner only) who can manage mods: `!gp @Trusted admin` then that role can `!gp @Helper kick`
- Give everything except admin: `!gp @Mod all` — add `admin` only via owner: `!gp @Lead admin`

## Tips

- Grant least privilege — add `kick` first, extend later.
- `admin` (fake `Administrator`) is **owner only**; fake admins can grant/revoke mod perms, only owner can grant/revoke fake admins.
- Legacy `/fmod` still works as “all moderation” for a role; prefer granular `gp` for new setups.
- Removing a Discord role from a member instantly drops the fake powers.
