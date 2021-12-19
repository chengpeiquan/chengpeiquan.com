import type { RouteMeta as DefaultRouteMeta } from 'vue-router'

/**
 * 路由的前端选项
 */
export interface Frontmatter {
  title: string
  desc: string
  cover: string
  date: string
  categories?: string[]
  isHot?: boolean
  repo?: string
}

/**
 * 路由的 Meta 信息
 */
export interface RouteMeta extends DefaultRouteMeta {
  frontmatter: Frontmatter
}

/**
 * 分类配置的项目类型
 * @description 用在路由里定义分类配置
 */
export interface CategoryConfigItem {
  path: string
  text: {
    'zh-CN': string
    en: string
  }
}

/**
 * 分类的项目类型
 */
export interface CategoryItem {
  routeName: string
  path: string
  text: string
}

/**
 * 文章的项目类型
 */
export interface ArticleItem {
  path: string
  title: string
  desc: string
  cover: string
  date: string
  isHot: boolean
  repo: string
  diffDays: number
  dateAgo: string
}
