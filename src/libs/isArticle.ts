import isDev from './isDev'
import config from '@/config'
import { useI18n } from '@/hooks'
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import type { RouteMeta } from '@/types'

/**
 * 判断是否文章页
 * @param route - Vue 路由
 */
const isArticle = (
  route: RouteRecordRaw | RouteLocationNormalizedLoaded
): boolean => {
  if (!route.path || typeof route.path !== 'string') {
    return false
  }

  let routeName: string = 'article-page'
  let startPath: string = '/article/'

  const { lang } = useI18n()
  const { defaultLang } = config
  if (lang.value !== defaultLang) {
    routeName = `${lang.value}-article-page`
    startPath = `/${lang.value}/article/`
  }

  // 开发环境显示草稿，生产部署隐藏
  const isDraft = isDev
    ? false
    : Boolean((route.meta as RouteMeta).frontmatter.isDraft)

  return (
    route.name !== routeName && route.path.startsWith(startPath) && !isDraft
  )
}

export default isArticle
