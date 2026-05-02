import { type Locale } from '../locale-config'

// Applies only to filter bars
export enum ExtraTag {
  All = 'all',
}

export const extraTagNameMapping: Record<Locale, Record<ExtraTag, string>> = {
  en: {
    [ExtraTag.All]: 'All',
  },
  zh: {
    [ExtraTag.All]: '全部',
  },
}

export const isExtraTag = (i: unknown): i is ExtraTag => i === ExtraTag.All

export enum ProjectTag {
  Tutorial = 'tutorial',
  Toolkit = 'toolkit',
  UI = 'ui',
  Bundling = 'bundling',
  Configuration = 'configuration',
  Template = 'template',
  Program = 'program',
  OnlineTool = 'online-tool',
  Scaffold = 'scaffold',
  Server = 'server',
  EOL = 'end-of-life',
}

export const projectTagNameMapping: Record<
  Locale,
  Record<ProjectTag, string>
> = {
  en: {
    [ProjectTag.Tutorial]: 'Tutorial',
    [ProjectTag.Toolkit]: 'Toolkit',
    [ProjectTag.UI]: 'UI',
    [ProjectTag.Bundling]: 'Bundling',
    [ProjectTag.Configuration]: 'Configuration',
    [ProjectTag.Template]: 'Template',
    [ProjectTag.Program]: 'Program',
    [ProjectTag.OnlineTool]: 'Online Tool',
    [ProjectTag.Scaffold]: 'Scaffold',
    [ProjectTag.Server]: 'Server',
    [ProjectTag.EOL]: 'End of Life',
  },
  zh: {
    [ProjectTag.Tutorial]: '教程',
    [ProjectTag.Toolkit]: '工具',
    [ProjectTag.UI]: 'UI',
    [ProjectTag.Bundling]: '捆绑',
    [ProjectTag.Configuration]: '配置',
    [ProjectTag.Template]: '模板',
    [ProjectTag.Program]: '软件',
    [ProjectTag.OnlineTool]: '在线工具',
    [ProjectTag.Scaffold]: '脚手架',
    [ProjectTag.Server]: '服务端',
    [ProjectTag.EOL]: '停止维护',
  },
}
