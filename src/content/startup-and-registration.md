Order in `src/index.ts`: validate env (`src/config/env.ts`), build `BotClient` (`src/config/bot.ts`), `configureContainer` (`src/setup/container.ts`), `database.connect` + `muteScheduler.initialize`, `client.login`, then on ready initialize reactions, snipes and cases.

Slash commands register globally via `registerApplicationCommands` with `Overwrite` behavior. Health is checked by `src/lib/command-registration.ts` and served at `GET /health` from `src/server/express.ts` with MongoDB readiness.
