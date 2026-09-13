export interface CommandOption {
  name: string;
  description: string;
  type: string;
  required: boolean;
}

export interface DocCommand {
  name: string;
  description: string;
  module: string;
  aliases: string[];
  adminOnly: boolean;
  supportsSlash: boolean;
  supportsPrefix: boolean;
  prefixUsage: string;
  slashOptions: CommandOption[];
  requiredClientPermissions: string[];
  file: string;
}

export interface CommandData {
  generatedAt: string;
  source: string;
  count: number;
  defaultPrefix: string;
  commands: DocCommand[];
}

export type ModuleFilter = 'all' | 'moderation' | 'utility' | 'admin' | 'permissions';
