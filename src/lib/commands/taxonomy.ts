import data from '../../data/commands.json';
import type { CommandData, DocCommand, ModuleFilter } from './types';

export const commandData = data as CommandData;

export const MODULES: { id: Exclude<ModuleFilter, 'all'>; label: string; blurb: string }[] = [
  { id: 'moderation', label: 'Moderation', blurb: 'Bans, mutes, cases and cleanup' },
  { id: 'utility', label: 'Utility', blurb: 'Info, recovery and helpers' },
  { id: 'admin', label: 'Admin', blurb: 'Setup, prefixes and automation' },
  { id: 'permissions', label: 'Permissions', blurb: 'Discord keys and Bolt roles' }
];

/** Docs-side grouping. Bot code has no subcategories; this overlay is the taxonomy. */
const SUBCATEGORY: Record<string, string> = {
  ban: 'Safety',
  unban: 'Safety',
  kick: 'Safety',
  softban: 'Safety',
  mute: 'Restraint',
  timeout: 'Restraint',
  warn: 'Restraint',
  jail: 'Containment',
  unjail: 'Containment',
  hide: 'Containment',
  unhide: 'Containment',
  purge: 'Chat',
  slowmode: 'Chat',
  nick: 'Identity',
  role: 'Identity',
  voice: 'Identity',
  cases: 'Records',
  ping: 'Core',
  help: 'Core',
  steal: 'Core',
  afk: 'Presence',
  greet: 'Presence',
  snipe: 'Recovery',
  editsnipe: 'Recovery',
  avatar: 'Info',
  userinfo: 'Info',
  userbanner: 'Info',
  serverinfo: 'Info',
  serverbanner: 'Info',
  roleinfo: 'Info',
  membercount: 'Counts',
  boostcount: 'Counts',
  setup: 'Setup',
  setprefix: 'Setup',
  setadminrole: 'Setup',
  setjailrole: 'Jail',
  setjailchannel: 'Jail',
  setwelcome: 'Greet',
  setgreetchannel: 'Greet',
  autoresponder: 'Automation',
  clearsnipe: 'Automation',
  givepermission: 'Setup',
  fadmin: 'Setup',
  fmod: 'Setup',
  permissions: 'Setup'
};

export function subOf(cmd: DocCommand): string {
  return SUBCATEGORY[cmd.name] ?? 'Other';
}

export interface CommandGroup {
  module: string;
  sub: string;
  commands: DocCommand[];
}

/** Group commands by module, then subcategory. Used for the default browse view. */
export function groupCommands(commands: DocCommand[]): CommandGroup[] {
  const order = new Map<string, CommandGroup>();
  const sorted = [...commands].sort((a, b) => a.name.localeCompare(b.name));
  for (const cmd of sorted) {
    const key = `${cmd.module} / ${subOf(cmd)}`;
    const existing = order.get(key);
    if (existing) {
      existing.commands.push(cmd);
    } else {
      order.set(key, { module: cmd.module, sub: subOf(cmd), commands: [cmd] });
    }
  }
  return [...order.values()].sort((a, b) => a.module.localeCompare(b.module) || a.sub.localeCompare(b.sub));
}

export function getCommand(name: string): DocCommand | undefined {
  return commandData.commands.find((c) => c.name.toLowerCase() === name.toLowerCase());
}
