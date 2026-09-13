<div align="center">

<img src="public/bolt_banner.png" alt="Bolt banner" width="920" />

<br />

<img src="public/bolt_pfp.webp" alt="Bolt" width="96" style="border-radius: 16px;" />

<h1>bolt-docs</h1>

<p>Documentation site for <a href="https://github.com/gogeta1232/Bolt-OS">Bolt-OS</a> — Discord moderation bot.</p>

<p>
  <a href="https://github.com/gogeta1232/bolt-docs/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/gogeta1232/bolt-docs/actions/workflows/ci.yml/badge.svg" /></a>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img alt="MIT" src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
</p>

<p>
  <a href="https://bolt-docs.vercel.app"><img alt="Live site" src="https://img.shields.io/badge/live-bolt--docs.vercel.app-ff482c?style=for-the-badge" /></a>
</p>

</div>

> Docs are generated from `Bolt-OS` source. Star [`gogeta1232/Bolt-OS`](https://github.com/gogeta1232/Bolt-OS) for the bot.

## What is this?

`bolt-docs` is the standalone Vite + React docs for Bolt. It used to live as `Bolt/site/` and is now its own repo for clean Vercel deploys and auto-sync with `Bolt-OS`.

- **44 commands** across 4 modules, searchable registry
- **11 guides** (getting started, permissions, moderation workflow, fake perms, etc.) rendered from markdown
- **Auto-sync** — `commands.json` pulls from `Bolt-OS` so docs never drift
- **Hardened** — CSP headers, no `dangerouslySetInnerHTML`, link sanitization, `noopener noreferrer` everywhere

## Quick start

```bash
git clone https://github.com/gogeta1232/bolt-docs.git
cd bolt-docs
npm ci
npm run dev
```

Open `http://localhost:5173`. No secrets needed — docs are static.

To use a custom invite/GitHub link locally:

```bash
cp .env.example .env.local
# edit VITE_DISCORD_INVITE_URL, VITE_GITHUB_URL
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b && vite build` + `404.html` fallback |
| `npm run preview` | Preview production build |
| `npm run lint` | `oxlint` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run sync:commands` | Fetch latest `commands.json` from `Bolt-OS` |

## Environment

| Var | Description | Default |
|-----|-------------|---------|
| `VITE_DISCORD_INVITE_URL` | OAuth2 invite for **Add to Server** | `https://discord.com/api/oauth2/authorize?client_id=1424440972758220800&permissions=1101017476118&scope=bot%20applications.commands` |
| `VITE_GITHUB_URL` | GitHub icon link | `https://github.com/gogeta1232/Bolt-OS` |
| `VITE_GITHUB_DOCS_URL` | Footer link | `https://github.com/gogeta1232/bolt-docs` |

See `.env.example`. Never commit `.env.local`.

## Sync with Bolt-OS

Docs stay fresh without manual copy:

1. **On `Bolt-OS` push** (`src/commands/**`): `Bolt-OS/.github/workflows/sync-docs.yml` runs `npm run docs:export` and dispatches `repository_dispatch` to `bolt-docs`
2. **On `bolt-docs`**: `.github/workflows/sync-from-os.yml` fetches `https://raw.githubusercontent.com/gogeta1232/Bolt-OS/main/site/src/data/commands.json` (fallback nightly cron) and commits if changed
3. **Vercel** auto-deploys `main` to `https://bolt-docs.vercel.app`

Run manually: `npm run sync:commands`

## Project map

```
src/
  components/layout/  Rail, Topbar, CommandPalette, ThemeToggle
  components/profile/ DiscordProfileCard (invite link via env)
  components/ui/      shadcn-style primitives
  features/commands/  Registry grid, detail, filters
  pages/              Home, Commands, Guides, HowItWorks, NotFound
  content/            Markdown guides (11 files)
  data/               commands.json (generated, never hand-edit)
  lib/                guides, theme, taxonomy, search
public/               bolt_pfp.webp, bolt_banner.png
vercel.json           Headers + SPA rewrites
```

## Deploy (Vercel free)

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output:** `dist`
- **Env:** set `VITE_DISCORD_INVITE_URL`, `VITE_GITHUB_URL` in Vercel dashboard
- **Domain:** `bolt-docs.vercel.app` (or custom). `vercel.json` handles SPA fallback and security headers:
  `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.

## Security

- No `rehypeRaw`/`allowDangerousHtml` — raw HTML in markdown is escaped
- `ReactMarkdown` `urlTransform` blocks `javascript:`/`data:`/`vbscript:` and custom `a` adds `rel="noopener noreferrer"` for externals
- CSP meta in `index.html` + `vercel.json` headers
- `npm audit --audit-level=high` in CI

## Contributing

PRs welcome. Keep changes focused, run `npm run typecheck && npm run lint && npm run build` before pushing. Do not hand-edit `src/data/commands.json`.

## License

MIT — see [LICENSE.md](LICENSE.md). Bolt-OS itself is [Elastic License 2.0](https://github.com/gogeta1232/Bolt-OS/blob/main/LICENSE.md).
