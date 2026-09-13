import { Link } from 'react-router';

import { cn } from '../ui/utils';

const INVITE_URL =
  (import.meta.env.VITE_DISCORD_INVITE_URL as string | undefined) ??
  'https://discord.com/api/oauth2/authorize?client_id=1424440972758220800&permissions=1101017476118&scope=bot%20applications.commands';

function VerifiedAppBadge(): React.JSX.Element {
  return (
    <span className="inline-flex shrink-0 items-center" role="img" aria-label="Verified app">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#80848e" />
        <path
          d="m8.2 12.4 2.5 2.5 5.1-5.3"
          stroke="#1e1f22"
          strokeWidth={2.4}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function DiscordMark(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 13.78 13.78 0 0 0-.64-1.28c-1.71.29-3.37.8-4.93 1.51A20.3 20.3 0 0 0 .1 18.06a19.9 19.9 0 0 0 6.07 3.03c.49-.66.93-1.37 1.3-2.1a12.9 12.9 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.16 0c.16.13.33.26.5.38-.65.38-1.34.72-2.05.98.37.73.81 1.44 1.3 2.1a19.84 19.84 0 0 0 6.07-3.03 20.26 20.26 0 0 0-3.58-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.95-2.42 2.16-2.42 2.18 1.09 2.16 2.42c0 1.34-.95 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.16-1.08-2.16-2.42s.95-2.42 2.16-2.42 2.18 1.09 2.16 2.42c0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}

export function DiscordProfileCard({ className }: { className?: string }): React.JSX.Element {
  return (
    <aside
      aria-label="Bolt Discord profile preview"
      className={cn(
        'bolt-enter w-full max-w-[360px] overflow-hidden rounded-[12px] bg-(--discord-outer) text-left shadow-xl',
        className
      )}
    >
      <div className="relative">
        <img
          src="/bolt_banner.png"
          alt=""
          aria-hidden="true"
          width={720}
          height={240}
          loading="eager"
          className="block h-[120px] w-full object-cover object-center"
        />
        <div className="px-4">
          <div className="relative -mt-10 inline-block">
            <img
              src="/bolt_pfp.webp"
              alt="Bolt bot avatar"
              width={80}
              height={80}
              className="size-20 rounded-full border-[6px] border-(--discord-outer) bg-(--discord-outer) object-cover"
            />
            <span
              className="absolute right-1 bottom-1 size-5 rounded-full border-4 border-(--discord-outer) bg-(--discord-green)"
              role="img"
              aria-label="Online"
            />
          </div>
        </div>
      </div>

      <div className="px-4 pt-2 pb-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-[20px] leading-6 font-semibold text-white">Bolt</p>
          <VerifiedAppBadge />
          <span className="rounded-[4px] bg-(--discord-blurple) px-1.5 py-0.5 text-[10px] leading-4 font-semibold tracking-wide text-white uppercase">
            Bot
          </span>
        </div>
        <p className="mt-0.5 text-[14px] leading-5 font-medium text-(--discord-muted)">bolt</p>
      </div>

      <div className="p-2">
        <div className="space-y-3 rounded-[8px] bg-(--discord-inner) p-3">
          <section aria-label="About me">
            <h3 className="text-[11px] leading-4 font-bold tracking-wider text-(--discord-muted) uppercase">
              About me
            </h3>
            <p className="mt-1 max-w-[52ch] text-[14px] leading-[1.5] text-(--discord-text)">
              I keep servers calm — warnings, timeouts and bans, every one logged with evidence.
            </p>
          </section>

          <section aria-label="Role">
            <h3 className="text-[11px] leading-4 font-bold tracking-wider text-(--discord-muted) uppercase">Role</h3>
            <p className="mt-1.5">
              <span className="inline-flex min-h-[32px] items-center gap-2 rounded-md bg-(--discord-panel) px-2.5 py-1.5 text-[13px] font-medium text-(--discord-text)">
                <span className="size-3 shrink-0 rounded-full bg-(--discord-blurple)" aria-hidden="true" />
                Bolt
              </span>
            </p>
          </section>

          <div className="grid gap-2 pt-1">
            <a
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[4px] bg-(--discord-blurple) px-4 text-[14px] font-semibold text-white transition-colors hover:bg-(--discord-blurple-hover)"
            >
              <DiscordMark />
              Add to Server
            </a>
            <Link
              to="/commands"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[4px] bg-(--discord-btn-gray) px-4 text-[14px] font-semibold text-white transition-colors hover:bg-(--discord-btn-gray-hover)"
            >
              View Commands
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
