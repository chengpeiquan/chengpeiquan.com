import { z } from 'zod'
import { type Locale } from './locale-config'

// extname(file)
export const fileExtensions: readonly string[] = ['.md', '.mdx']

export const contentRootFolder = 'contents'

export const contentFolders = ['about', 'article', 'cookbook'] as const

export type ContentFolder = (typeof contentFolders)[number]

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
  repo: z.string().optional(),
  isDraft: z.boolean().optional(),

  // For cookbook
  duration: z.number().optional(),
  price: z.number().optional(),
  xiaohongshuId: z.string().optional(),
})

// Define the Zod schema for `ContentItem`
export const contentItemSchema = z.object({
  metadata: contentMetadataSchema,
  content: z.string(),
})

export type ContentMetadata = z.infer<typeof contentMetadataSchema>

export type ContentItem = z.infer<typeof contentItemSchema>

export const isValidContentItem = (v: unknown): v is ContentItem => !!v

export const PAGE_SIZE = 10

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

export const articleCategories: CategoryConfigItem[] = [
  {
    slug: 'tech',
    label: {
      zh: '技术',
      en: 'Technology',
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
