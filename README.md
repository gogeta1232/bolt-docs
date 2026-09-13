<p align="center">
  <img src="public/bolt_banner.png" width="920" alt="Bolt — stamped brass">
</p>

<p align="center">
  <img src="public/bolt_pfp.webp" width="64" height="64" alt="bolt-docs"><br>
  <strong>bolt-docs</strong><br>
  Vite + React · Bolt registry · auto-synced · MIT<br>
  <a href="#license"><img alt="MIT" src="https://img.shields.io/badge/MIT-f7b626?style=flat-square&labelColor=0c0c0d&color=f7b626"></a>
  <a href="#what-lives-here"><img alt="vite 8 · react 19" src="https://img.shields.io/badge/vite%208%20%C2%B7%20react%2019-2a2a2a?style=flat-square&labelColor=0c0c0d&color=2a2a2a"></a><br>
  <sub>44 commands · 11 guides · synced from <a href="https://github.com/gogeta1232/Bolt">Bolt</a> · live at <a href="https://boltdoc.vercel.app">boltdoc.vercel.app</a></sub>
</p>

<p align="center">
  <a href="https://boltdoc.vercel.app"><img alt="Live" src="https://img.shields.io/badge/LIVE-boltdoc.vercel.app-ff482c?style=for-the-badge&labelColor=%230c0c0d&color=%23ff482c"></a>&nbsp;
  <a href="https://github.com/gogeta1232/bolt-docs/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/badge/CI-passing-2ea043?style=for-the-badge&labelColor=%230c0c0d&color=%232ea043"></a>&nbsp;
  <a href="https://github.com/gogeta1232/Bolt"><img alt="Bolt" src="https://img.shields.io/badge/Bolt-source-1f2328?style=for-the-badge&labelColor=%230c0c0d&color=%231f2328"></a>
</p>

<p align="center">
  <em>One registry, never hand-edited.</em> <code>commands.json</code> is generated from <code>Bolt/src/commands</code> and pulled nightly — docs never drift.
</p>

---

### Inventory at a glance

| COMMANDS | GUIDES | SYNC | STACK |
|---|---|---|---|
| **44**<br><sub>searchable · slash + prefix</sub> | **11**<br><sub>markdown · from source</sub> | **nightly**<br><sub>+ on push dispatch</sub> | **vite 8**<br><sub>react 19 · ts 6</sub> |

> Isolated `Vite` site — no bot runtime inside. Reads `src/data/commands.json` only.

## Open it

```bash
git clone https://github.com/gogeta1232/bolt-docs.git
cd bolt-docs
npm ci
npm run dev
# http://localhost:5173
```

No secrets. Static build. Override invite or GitHub link locally:

```bash
cp .env.example .env.local
# VITE_DISCORD_INVITE_URL=https://discord.com/api/oauth2/authorize?client_id=1424440972758220800&permissions=1101017476118&scope=bot%20applications.commands
# VITE_GITHUB_URL=https://github.com/gogeta1232/Bolt
npm run dev
```

## What lives here

```
src/
  components/layout/   Rail (glow) · Topbar · CommandPalette · ThemeToggle
  components/profile/  DiscordProfileCard — Add to Server via VITE_DISCORD_INVITE_URL
  components/ui/       badge · button · card · input
  features/commands/   Card · Grid · Detail · FilterBar · CopyButton
  pages/               Home · Commands · Guides · Guide · HowItWorks · NotFound
  content/             11 markdown guides
  data/                commands.json — generated, never hand-edit
  lib/                 guides · taxonomy · search · rail · theme
public/                bolt_banner.png · bolt_pfp.webp — local art, not CDN
vercel.json            CSP · HSTS · SPA fallback → /index.html
```

Hardened: no `rehypeRaw`, `ReactMarkdown` `urlTransform` blocks `javascript:`/`data:`/`vbscript:`, `rel="noopener noreferrer"` on externals, `allowedMentions` safe, CSP meta + headers.

## Sync — how it stays fresh

```
Bolt  push src/commands/** ──► npm run docs:export ──► site/src/data/commands.json ──► dispatch
                                                      │
bolt-docs  ◄──────── fetch https://raw.githubusercontent.com/gogeta1232/Bolt/main/site/src/data/commands.json ── nightly 03:17 UTC + on dispatch
          └─ commit if changed ──► Vercel auto-deploys main → https://boltdoc.vercel.app
```

Manual:

```bash
npm run sync:commands
# or
COMMANDS_URL=https://raw.githubusercontent.com/gogeta1232/Bolt/main/site/src/data/commands.json npm run sync:commands
```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Vite dev — `localhost:5173` |
| `npm run build` | `tsc -b && vite build && copy dist/index.html → dist/404.html` |
| `npm run preview` | Preview `dist/` |
| `npm run lint` | `oxlint` |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm run format` | `prettier --write .` |
| `npm run sync:commands` | Pull `commands.json` from `Bolt` |

## Deploy — Vercel

`vercel.json` already sets:

- `rewrites: /→/index.html` (SPA)
- `headers:` `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Cache-Control: immutable` for `/assets/`

No extra dashboard work — pushes to `main` deploy automatically.

## Environment

| Var | Purpose | Default |
|-----|---------|---------|
| `VITE_DISCORD_INVITE_URL` | Profile card **Add to Server** | `https://discord.com/api/oauth2/authorize?client_id=1424440972758220800&permissions=1101017476118&scope=bot%20applications.commands` |
| `VITE_GITHUB_URL` | Topbar GitHub icon | `https://github.com/gogeta1232/Bolt` |
| `VITE_GITHUB_DOCS_URL` | Footer link | `https://github.com/gogeta1232/bolt-docs` |
| `VITE_SITE_URL` | Canonical URL | `https://boltdoc.vercel.app` |

See `.env.example`. Do not commit `.env.local`.

## Security

- Markdown never renders raw HTML — `remarkGfm` only.
- `urlTransform` allow-lists `https://`, `/`, `#`, `mailto:` → `#`.
- `vercel.json` + `index.html` CSP `default-src 'self'`; `style-src 'self' 'unsafe-inline'` for Tailwind; `img-src 'self' data: https:`; `frame-ancestors 'none'`.
- `npm audit --omit=dev --audit-level=high` in CI.

## License

MIT — [LICENSE.md](LICENSE.md).  
Bolt bot itself is [Elastic License 2.0](https://github.com/gogeta1232/Bolt/blob/main/LICENSE.md) — source-available, not OSI open source.

<p align="center">
<sub>bolt-docs — Vite · React · Tailwind · <a href="https://github.com/gogeta1232/Bolt">Bolt</a> · MIT</sub>
</p>
