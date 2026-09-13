`ban` performs the Discord action first, replies immediately with a toast (`src/lib/respond.ts`), then in the background creates a `Case` with an atomic counter (`src/services/moderation/case-service.ts`), attempts a user DM and fans out to moderation + case log channels (`src/services/core/logging-service.ts` + `src/config/logging.ts`).

Mute schedules persist in MongoDB and re-arm timers after restarts (`setTimeout(min(delay, 2^31-1)).unref()`).
