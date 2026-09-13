import gettingStarted from '../content/getting-started.md?raw';
import invitePermissions from '../content/invite-permissions.md?raw';
import configuration from '../content/configuration.md?raw';
import moderationWorkflow from '../content/moderation-workflow.md?raw';
import prefixVsSlash from '../content/prefix-vs-slash.md?raw';
import prefixes from '../content/prefixes.md?raw';
import troubleshooting from '../content/troubleshooting.md?raw';
import twoKeys from '../content/two-keys-permissions.md?raw';
import fakePermissions from '../content/fake-permissions.md?raw';
import startup from '../content/startup-and-registration.md?raw';
import casesLogging from '../content/cases-and-logging.md?raw';

export interface Guide {
  slug: string;
  title: string;
  description: string;
  section: 'Start here' | 'Guides' | 'How Bolt works';
  body: string;
}

export interface GuideHeading {
  level: 2 | 3;
  text: string;
  id: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Extract ## / ### headings for the reader TOC. */
export function headingsOf(body: string): GuideHeading[] {
  const out: GuideHeading[] = [];
  for (const line of body.split('\n')) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match?.[1] || !match[2]) continue;
    const text = match[2].replace(/[*_`]/g, '');
    out.push({ level: match[1].length === 2 ? 2 : 3, text, id: slugify(text) });
  }
  return out;
}

export const GUIDES: Guide[] = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    description: 'Install Bolt locally with Node.js, MongoDB and a Discord application.',
    section: 'Start here',
    body: gettingStarted
  },
  {
    slug: 'invite-permissions',
    title: 'Invite and permissions',
    description: 'Minimum Discord permissions and how access control works.',
    section: 'Start here',
    body: invitePermissions
  },
  {
    slug: 'prefixes',
    title: 'Prefixes, properly',
    description: 'Default prefix, per-server prefixes and when to use slash.',
    section: 'Guides',
    body: prefixes
  },
  {
    slug: 'moderation-workflow',
    title: 'Moderation workflow',
    description: 'Escalation ladder, authority checks, cases and evidence.',
    section: 'Guides',
    body: moderationWorkflow
  },
  {
    slug: 'prefix-vs-slash',
    title: 'Prefix vs slash internals',
    description: 'How Bolt handles both invocation styles in code.',
    section: 'Guides',
    body: prefixVsSlash
  },
  {
    slug: 'configuration',
    title: 'Configuration',
    description: 'Prefixes, admin roles, jail, greetings and log routing.',
    section: 'Guides',
    body: configuration
  },
  {
    slug: 'two-keys-permissions',
    title: 'Two keys: real vs bot permissions',
    description: 'Discord permissions and bot-side admin roles, verified in source.',
    section: 'Guides',
    body: twoKeys
  },
  {
    slug: 'fake-permissions',
    title: 'Fake permissions — granular setup',
    description: 'Grant ban, kick, timeout, mute and more per-role without Discord perms.',
    section: 'Guides',
    body: fakePermissions
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common setup failures and how to fix them.',
    section: 'Guides',
    body: troubleshooting
  },
  {
    slug: 'startup-and-registration',
    title: 'Startup and registration',
    description: 'Boot order, global command registration and health checks.',
    section: 'How Bolt works',
    body: startup
  },
  {
    slug: 'cases-and-logging',
    title: 'Cases and logging',
    description: 'How cases, warnings and log delivery work.',
    section: 'How Bolt works',
    body: casesLogging
  }
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
