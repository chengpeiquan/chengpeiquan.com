import type { RouteMeta as DefaultRouteMeta } from 'vue-router'

/**
 * 国际化的语言选项
 * @description 用在 useI18n 的 getText 方法及相关地方
 */
export interface i18nTextConfig {
  zh: string
  en: string
}

/**
 * 路由的前端选项
 */
export interface Frontmatter {
  title: string
  desc: string
  keywords: string
  cover: string
  date: string
  categories?: string[]
  isHot?: boolean
  repo?: string
  xiaohongshuId?: string
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
  text: i18nTextConfig
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
 * 分类的列表信息类型
 */
export interface CategoryListInfo {
  type: string
  categoryPath: string
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
