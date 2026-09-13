Bolt's moderation follows one pipeline: check authority, act on Discord, record a case, notify, log. Every step rechecks the current state — never the state from when a menu was opened.

## Escalation ladder

1. **Warn** (`/warn issue`) — stored with reason, evidence attachments and optional expiry. History per user via `/warn history`.
2. **Mute / timeout** (`/mute`, `/timeout`) — role-based mute with `MuteSchedule` persistence, or native Discord timeout. Schedules survive restarts: timers re-arm on boot (`src/services/moderation/mute-scheduler-service.ts`).
3. **Kick** (`/kick`) — removes the member; they can rejoin with a new invite.
4. **Ban / softban** (`/ban`, `/softban`) — ban blocks rejoin; softban bans then immediately unbans to purge recent messages.
5. **Jail** (`/jail`) — restricts a member to one channel via `setjailrole` + `setjailchannel` instead of removing them.

## Authority checks on every action

`src/lib/utils/moderation-permission-checker.ts` resolves in order: server owner, `Administrator`, the real Discord permission for that action (`ban` needs `BanMembers`, `timeout` needs `ModerateMembers`, `mute` needs `ManageRoles`), then configured admin roles, then **granular fake permissions** (`/givepermission` per-role grants from `src/lib/fake-permissions.ts`), then legacy mod roles. Role hierarchy is rechecked at execution (`target.member.bannable`) so a promotion mid-flow can't be bypassed. Slash and prefix share the same checker.

## Cases and evidence

Each action creates a numbered `Case` (`src/services/moderation/case-service.ts`) with moderator, reason and evidence (attachments or URLs from the reason text). Browse them with `/cases`, inspect one with `/cases view #ID`. Mod-log and case-log channels are routed per type in `/setup`.
