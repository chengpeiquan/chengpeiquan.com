import React from 'react'
import { z } from 'zod'
import { type Locale } from './locale-config'

// extname(file)
export const fileExtensions: readonly string[] = ['.md', '.mdx']

export const contentRootFolder = 'contents'

// First level folder for content
export enum ContentFolder {
  About = 'about',
  Article = 'article',
  Cookbook = 'cookbook',
  Fragment = 'fragment',
}

export const contentFolders = Object.values(ContentFolder)

// There is only one content in the folder,
// Displayed as an independent page
export const pageFolderMapping = {
  [ContentFolder.About]: ContentFolder.About,
} as const

export type PageFolder = keyof typeof pageFolderMapping

export const pageFolders = Object.keys(pageFolderMapping) as PageFolder[]

// There is a lot of content in the folder,
// It will be distributed in the form of list page and detail page
export const listFolderMapping = {
  [ContentFolder.Article]: `${ContentFolder.Article}s`,
  [ContentFolder.Cookbook]: `${ContentFolder.Cookbook}s`,
} as const

export type ListFolder = keyof typeof listFolderMapping

export const listFolders = Object.keys(listFolderMapping) as ListFolder[]

// With item's slug
export type ContentDetailsLink = `/${ContentFolder}/${string}`

// If background music is configured,
// the music player will be enabled on the article content page
const bgmSchema = z.object({
  src: z.string(),
  title: z.string(),
  albumCover: z.string(),
  musician: z.string().optional(),
})

export type BgmConfig = z.infer<typeof bgmSchema>

// Remote content from GitHub (e.g. Markdown, HTML, etc.)
// Reference `apis.gh.fetchMarkdown`
const githubContentSchema = z.object({
  type: z.literal('github'),
  owner: z.string().optional(),
  repo: z.string(),
  path: z.string(),
})

export type GitHubContentConfig = z.infer<typeof githubContentSchema>

// Combine different platforms into a discriminated union
const remoteContentSchema = z.discriminatedUnion('type', [
  githubContentSchema,
  // Placeholder: If there are more platforms in the future
])

export type RemoteContentConfig = z.infer<typeof remoteContentSchema>

export const isValidRemoteContentConfig = (
  v: unknown,
): v is RemoteContentConfig => {
  return remoteContentSchema.safeParse(v).success
}

// Define the Zod schema for `ContentMetadata`
const contentMetadataSchema = z.object({
  // Shared
  title: z.string(),
  desc: z.string(),
  keywords: z.string(),
  date: z.string(), // `yyyy/MM/dd HH:mm:ss`
  timestamp: z.number(), // The timestamp of `date`
  cover: z.string(), // Size: 500x400
  categories: z.array(z.string()).optional(),
  isDraft: z.boolean().optional(),
  bgm: bgmSchema.optional(),

  // For article
  maybeLegacy: z.boolean().optional(), // Content may be outdated
  repo: z.string().optional(),
  remote: remoteContentSchema.optional(),

  // For cookbook
  duration: z.number().optional(),
  price: z.number().optional(),
  xiaohongshuId: z.string().optional(),
})

export type ContentMetadata = z.infer<typeof contentMetadataSchema>

// Mapping to `h2` / `h3` and so on
export const headingDepths = [2, 3, 4, 5, 6] as const

export type HeadingDepth = (typeof headingDepths)[number]

export interface HeadingItem {
  depth: HeadingDepth
  value: string // e.g. `Hello World`
  id: string // e.g. `hello-world`
  children?: HeadingItem[]
}

const headingSchema: z.ZodType<HeadingItem> = z.lazy(() =>
  z.object({
    depth: z.union([z.literal(2), z.literal(3), z.literal(4)]),
    value: z.string(),
    id: z.string(),
    children: z.array(z.lazy(() => headingSchema)).optional(),
  }),
)

// To avoid using `dangerouslySetInnerHTML` property,
// and better utilize the capabilities of React components,
// Markdown will be compiled into JSX and rendered into React components.
export const jsxElementSchema = z.union([
  z.any().refine((value) => React.isValidElement(value), {
    message: 'Expected a React element',
  }),
  z.null(),
])

// Define the Zod schema for `ContentItem`
export const contentItemSchema = z.object({
  slug: z.string(),
  metadata: contentMetadataSchema,
  headings: z.array(headingSchema),
  jsxElement: jsxElementSchema,
  html: z.string(),
  bgm: bgmSchema.optional(),
})

export type ContentItem = z.infer<typeof contentItemSchema>

export const isValidContentItem = (v: unknown): v is ContentItem => !!v

export interface GetListResponse<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  lastPage: number
  category?: string
  isEmpty: boolean
}

export const getPagination = <T>(
  contents: T[],
  page: number,
  pageSize: number,
) => {
  const start = 0 + pageSize * (page - 1)
  const end = start + pageSize
  const items = contents.slice(start, end)
  const total = contents.length
  const lastPage = Math.ceil(total / pageSize)
  const isEmpty = items.length === 0

  return {
    items,
    total,
    lastPage,
    isEmpty,
  }
}

export const pageSizeConfig: Record<ListFolder, number> = {
  article: 10,
  cookbook: 20,
}

export interface ContentPaginationData {
  page: number
  pageSize: number
  total: number
  lastPage: number
  items: ContentItem[]
}

export interface CategoryConfigItem {
  slug: string
  label: Record<Locale, string>
  icon?: string
}

export const allCategory: CategoryConfigItem = {
  slug: '',
  label: {
    zh: '全部',
    en: 'All',
  },
}

export const articleCategories: CategoryConfigItem[] = [
  {
    slug: 'tech',
    label: {
      zh: '技术',
      en: 'Technology',
    },
  },
  {
    slug: 'open-source',
    label: {
      zh: '开源',
      en: 'Open Source',
    },
  },
  {
    slug: 'design',
    label: {
      zh: '设计',
      en: 'Design',
    },
  },
  {
    slug: 'prose',
    label: {
      zh: '随笔',
      en: 'Prose',
    },
  },
]

export const cookbookCategories: CategoryConfigItem[] = [
  {
    slug: 'beginner',
    label: {
      zh: '新手入门',
      en: 'Beginner',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220221141035.jpg?x-oss-process=image/interlace,1',
  },
  {
    slug: 'thrift',
    label: {
      zh: '省钱菜谱',
      en: 'Thrift',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200704.jpg?x-oss-process=image/interlace,1',
  },
  {
    slug: 'bento',
    label: {
      zh: '上班带饭',
      en: 'Bento',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200259.jpg?x-oss-process=image/interlace,1',
  },
  {
    slug: 'teochew',
    label: {
      zh: '潮汕风味',
      en: 'Teochew',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200445.jpg?x-oss-process=image/interlace,1',
  },
  {
    slug: 'staple',
    label: {
      zh: '特色主食',
      en: 'Staple',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213195746.jpg?x-oss-process=image/interlace,1',
  },
  {
    slug: 'soup',
    label: {
      zh: '煲个靓汤',
      en: 'Soup',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200137.jpg?x-oss-process=image/interlace,1',
  },
  {
    slug: 'orthodontic',
    label: {
      zh: '正畸食谱',
      en: 'Orthodontic',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213195910.jpg?x-oss-process=image/interlace,1',
  },
  {
    slug: 'condiment',
    label: {
      zh: '调味辅料',
      en: 'Condiment',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200054.jpg?x-oss-process=image/interlace,1',
  },
  {
    slug: 'clever',
    label: {
      zh: '生活妙招',
      en: 'Clever',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2023/03/20230312234314.jpg?x-oss-process=image/interlace,1',
  },
]

export type CategoryGroup = 'articles' | 'cookbooks'

export interface CategoryConfigItemWithGroup extends CategoryConfigItem {
  group: CategoryGroup
}

const withGroup = (arr: CategoryConfigItem[], group: CategoryGroup) => {
  return arr.map<CategoryConfigItemWithGroup>((i) => ({ ...i, group }))
}

export const categoryMapping = [
  ...withGroup(articleCategories, 'articles'),
  ...withGroup(cookbookCategories, 'cookbooks'),
].reduce(
  (acc, category) => {
    acc[category.slug] = category
    return acc
  },
  {} as Record<string, CategoryConfigItemWithGroup>,
)

// Some long English words can be converted into
// more concise expressions in scenarios such as button text.
export const shortNameMapping: Record<CategoryConfigItem['slug'], string> = {
  tech: 'Tech',
  'open-source': 'OSS', // Open Source Software
}

// If there are many categories in the list,
// It will be presented in a collapsed form on the mobile,
// Here is the title of the collapsed panel
export const categoryGroupTitleConfig: Record<
  CategoryGroup,
  Record<Locale, string>
> = {
  articles: {
    zh: '文章分类',
    en: 'Article Categories',
  },
  cookbooks: {
    zh: '菜谱分类',
    en: 'Cookbook Categories',
  },
}

// When the difference between the release date
// and the reading date exceeds this value,
// legacy tips will be displayed when browsing the content.
export const legacyThresholdDays = 730
