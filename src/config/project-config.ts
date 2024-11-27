import { type Locale } from './locale-config'

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

export interface ProjectMetadata {
  description: string

  // Prioritize the homepage URL for the language
  homepage?: string
}

export interface ProjectConfigItem {
  name: string
  repo: string
  directory?: string
  homepage?: string
  tags: ProjectTag[]
  metadata: Record<Locale, ProjectMetadata>
}

export const getRepoUrl = (
  repo: ProjectConfigItem['repo'],
  directory?: ProjectConfigItem['directory'],
) => {
  return directory ? `${repo}/tree/main/packages/${directory}` : repo
}

export const projects: ProjectConfigItem[] = [
  {
    name: 'learning-vue3',
    repo: 'https://github.com/chengpeiquan/learning-vue3',
    tags: [ProjectTag.Tutorial],
    homepage: 'https://vue3.chengpeiquan.com',
    metadata: {
      en: {
        description:
          'Which has been read by more than 2.3 million people, provides basic knowledge points about front-end engineering development, as well as an introductory learning guide for TypeScript, Vue 3, and Pinia.',
      },
      zh: {
        description:
          '超过 230w+ 阅读人次，关于前端工程化开发的基础知识点，以及 TypeScript 、 Vue 3 、 Pinia 的入门学习指南。',
      },
    },
  },
  {
    name: '@re-dev/react-truncate',
    repo: 'https://github.com/remanufacturing/react-truncate',
    homepage: 'https://truncate.js.org',
    tags: [ProjectTag.UI],
    metadata: {
      en: {
        description:
          'Provides `Truncate`, `MiddleTruncate` and `ShowMore` React components for truncating multi-line spans and adding an ellipsis.',
      },
      zh: {
        description:
          '提供 `Truncate`、`MiddleTruncate` 和 `ShowMore` React 组件，用于截断多行跨度并添加省略号。',
        homepage: 'https://truncate.js.org/zh/',
      },
    },
  },
  {
    name: '@bassist/utils',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'utils',
    homepage: 'https://www.jsdocs.io/package/@bassist/utils',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description:
          'Opinionated collection of common JavaScript / TypeScript utils, fully tree shakeable, no bundler required, type strong, SSR friendly.',
      },
      zh: {
        description:
          '常用的 JavaScript / TypeScript 工具函数集，支持摇树优化、无需构建、类型完备、SSR 友好。',
      },
    },
  },
  {
    name: 'vite-plugin-banner',
    repo: 'https://github.com/chengpeiquan/vite-plugin-banner',
    tags: [ProjectTag.Bundling],
    metadata: {
      en: {
        description:
          'A Vite plugin that adds a banner comment to the header of each chunk file.',
      },
      zh: {
        description: '为每个 chunk 文件头部添加 banner 注释的 Vite 插件。',
      },
    },
  },
  {
    name: 'vue-picture-cropper',
    repo: 'https://github.com/chengpeiquan/vue-picture-cropper',
    homepage: 'https://cropper.chengpeiquan.com',
    tags: [ProjectTag.UI],
    metadata: {
      en: {
        description:
          'A simple and easy-to-use picture cropping component for Vue 3. ',
      },
      zh: {
        description: '一个简单易用的Vue 3图片裁剪组件。',
        homepage: 'https://cropper.chengpeiquan.com/zh/',
      },
    },
  },
  {
    name: 'create-preset',
    repo: 'https://github.com/awesome-starter/create-preset',
    homepage: 'https://preset.js.org',
    tags: [ProjectTag.Scaffold],
    metadata: {
      en: {
        description: 'Provides the ability to quickly create preset projects.',
      },
      zh: {
        description: '提供快速创建预设项目的能力。',
        homepage: 'https://preset.js.org/zh/',
      },
    },
  },
  {
    name: 'git-commit-analytics',
    repo: 'https://github.com/analyticsjs/git-commit-analytics',
    tags: [ProjectTag.Program],
    metadata: {
      en: {
        description:
          "A tool to analyze your git repository's commit log. I can help you generate daily/weekly or longer work reports.",
      },
      zh: {
        description:
          '一个可以分析你的 Git 仓库 commit 记录的工具。它可以帮你生成一份工作日报 / 周报，或者你需要的更长时间范围的工作报告。',
      },
    },
  },
  {
    name: 'blackwork',
    repo: 'https://github.com/chengpeiquan/blackwork',
    tags: [ProjectTag.UI],
    metadata: {
      en: {
        description:
          'Blackwork Tattoo style React UI layout (provides a unified interface for websites like my blog).',
      },
      zh: {
        description:
          'Blackwork 文身风格的 React UI 布局（为像我的博客这样的网站提供统一的界面）。',
      },
    },
  },
  {
    name: '@web-analytics/core',
    repo: 'https://github.com/analyticsjs/web-analytics',
    directory: 'core',
    homepage: 'https://analytics.js.org/core/',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description:
          'Website pageview analytics tool for framework-free and multi-analytics-platform support.',
      },
      zh: {
        description: '无框架、支持多分析平台的网站页面浏览分析工具。',
      },
    },
  },
  {
    name: '@web-analytics/vue',
    repo: 'https://github.com/analyticsjs/web-analytics',
    directory: 'vue',
    homepage: 'https://analytics.js.org/vue/',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description:
          'Website pageview analytics tool for Vue.js (Including VuePress , VitePress etc.) and multi-analytics-platform support.',
      },
      zh: {
        description:
          'Vue.js（包括 VuePress、VitePress 等）的网站页面浏览量分析工具并支持多分析平台。',
      },
    },
  },
  {
    name: 'vue3-ts-vite-starter',
    repo: 'https://github.com/awesome-starter/vue3-ts-vite-starter',
    tags: [ProjectTag.Template],
    metadata: {
      en: {
        description: 'A template for Vue with TypeScript, base on Vite.',
      },
      zh: {
        description:
          '这个模板应该能帮你快速创建一个基于 Vite 的 Vue 3 项目，默认使用 TypeScript 作为开发语言。',
      },
    },
  },
  {
    name: 'chengpeiquan.com',
    repo: 'https://github.com/chengpeiquan/chengpeiquan.com',
    homepage: 'https://chengpeiquan.com',
    tags: [ProjectTag.Template],
    metadata: {
      en: {
        description: 'My personal website, base on React 19 and Next.js 15.',
        homepage: 'https://chengpeiquan.com/en',
      },
      zh: {
        description: '我的个人网站，基于 React 19 和 Next.js 15。',
        homepage: 'https://chengpeiquan.com/zh',
      },
    },
  },
  {
    name: 'cert-patroller',
    repo: 'https://github.com/node-service/cert-patroller',
    tags: [ProjectTag.Server],
    metadata: {
      en: {
        description:
          'A patroller that regularly checks for expiring SSL certificates, based on Node.js and Porkbun APIs.',
      },
      zh: {
        description:
          '基于 Node.js 和 Porkbun API 的巡逻程序，定期检查是否过期的 SSL 证书。',
      },
    },
  },
  {
    name: 'language-code',
    repo: 'https://github.com/ISO-639/language-code',
    homepage: 'https://lang.js.org',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description:
          'ISO 639 Language Mapping. Contains code lists for ISO 639-1 and ISO 639-2 as well as multi-language support.',
      },
      zh: {
        description:
          'ISO 639 语言映射。包含 ISO 639-1 和 ISO 639-2 的代码列表以及多语言支持。',
      },
    },
  },
  {
    name: 'react-forage',
    repo: 'https://github.com/chengpeiquan/react-forage',
    homepage: 'https://forage.cpq.dev',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description: 'LocalForage Hooks and Providers for React.',
      },
      zh: {
        description: '用于 React 的 LocalForage Hooks 和 Providers 。',
      },
    },
  },
  {
    name: 'zhihu-collection-helper',
    repo: 'https://github.com/chengpeiquan/zhihu-collection-helper',
    tags: [ProjectTag.Program],
    metadata: {
      en: {
        description:
          'Zhihu Favorites Assistant can add articles from a column to favorites. It is suitable for situations where a large amount of content needs to be filled in the favorites at the initial stage of creation.',
      },
      zh: {
        description:
          '知乎收藏夹助手，可将专栏的文章添加到收藏夹中，适用于收藏夹在创建初期需要大量内容填充的情况。',
      },
    },
  },
  {
    name: 'group-buy-calculator',
    repo: 'https://github.com/chengpeiquan/group-buy-calculator',
    tags: [ProjectTag.OnlineTool],
    homepage: 'https://chengpeiquan.github.io/group-buy-calculator/',
    metadata: {
      en: {
        description:
          'A takeaway billing calculator, no need to worry about red envelopes, redemption coupons and other messy reductions, it will automatically calculate the discount ratio to get the final bill.',
      },
      zh: {
        description:
          '一款外卖账单计算器，不用再担心红包、优惠券等乱七八糟的折价，它会自动计算折扣比例得出最终账单。',
      },
    },
  },
  {
    name: 'refresh-token',
    repo: 'https://github.com/chengpeiquan/refresh-token',
    tags: [ProjectTag.Tutorial],
    metadata: {
      en: {
        description:
          'The refreshToken scheme and demo based on OAuth 2.0 for Front end developer.',
      },
      zh: {
        description:
          '面向前端开发的基于 OAuth 2.0 的 refreshToken 方案和演示。',
      },
    },
  },
  {
    name: '@bassist/node-utils',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'node-utils',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description: 'Opinionated collection of common Node.js utils.',
      },
      zh: {
        description: '常用的 Node.js 实用的工具集。',
      },
    },
  },
  {
    name: '@bassist/commit',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'commit',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description: 'Simple Commit Lint.',
      },
      zh: {
        description: '简单的 Commit 校验。',
      },
    },
  },
  {
    name: '@bassist/changelog',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'changelog',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description: 'Simple CHANGELOG generator.',
      },
      zh: {
        description: '简单的 CHANGELOG 生成器。',
      },
    },
  },
  {
    name: '@bassist/release',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'release',
    tags: [ProjectTag.Toolkit],
    metadata: {
      en: {
        description: 'Simple GitHub release generator.',
      },
      zh: {
        description: '简单的 GitHub Release 生成器。',
      },
    },
  },
  {
    name: '@bassist/progress',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'progress',
    tags: [ProjectTag.UI],
    metadata: {
      en: {
        description: 'Simple slim progress bars base on NProgress.',
      },
      zh: {
        description: '基于 NProgress 的简单的微型进度条。',
      },
    },
  },
  {
    name: '@bassist/eslint',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'eslint',
    tags: [ProjectTag.Configuration],
    metadata: {
      en: {
        description: 'Flat ESLint config for ESLint.',
      },
      zh: {
        description: 'ESLint 的扁平化配置。',
      },
    },
  },
  {
    name: '@bassist/tsconfig',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'tsconfig',
    tags: [ProjectTag.Configuration],
    metadata: {
      en: {
        description:
          'Some TSConfig files for working with TypeScript projects.',
      },
      zh: {
        description: '一些用于 TypeScript 项目的 TSConfig 文件。',
      },
    },
  },
  {
    name: '@bassist/uno',
    repo: 'https://github.com/chengpeiquan/bassist',
    directory: 'uno',
    tags: [ProjectTag.Configuration],
    metadata: {
      en: {
        description: 'Custom configuration for UnoCSS.',
      },
      zh: {
        description: 'UnoCSS 的自定义配置。',
      },
    },
  },
  {
    name: 'vue-baidu-analytics',
    repo: 'https://github.com/analyticsjs/vue-baidu-analytics',
    tags: [ProjectTag.EOL],
    metadata: {
      en: {
        description:
          'Only 3 kB, this plugin base on the Baidu analytics, it can help you quickly to collect the page views on your website, including single page web application.',
      },
      zh: {
        description:
          '一个只有 3 kB 大小的插件，可以帮你轻松解决 SPA 单页面项目浏览数据不准确的问题，可基于 Vue 路由访问轨迹自动向百度统计平台上报 PV / 事件数据。',
      },
    },
  },
  {
    name: 'vue-cnzz-analytics',
    repo: 'https://github.com/analyticsjs/vue-cnzz-analytics',
    tags: [ProjectTag.EOL],
    metadata: {
      en: {
        description:
          'Only 3 kB, this plugin base on the CNZZ analytics, it can help you quickly to collect the page views on your website, including single page web application.',
      },
      zh: {
        description:
          '一个只有 3 kB 大小的插件，可以帮你轻松解决 SPA 单页面项目浏览数据不准确的问题，基于 Vue 路由访问轨迹自动向友盟统计平台上报 PV / 事件数据。',
      },
    },
  },
]

export const projectTotalMap = projects.reduce(
  (acc, i) => {
    i.tags.forEach((j) => {
      if (!acc[j]) acc[j] = 0
      return (acc[j] += 1)
    })
    return acc
  },
  { [ExtraTag.All]: projects.length } as Record<ExtraTag | ProjectTag, number>,
)
