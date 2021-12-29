import config from '@/config'
import { useI18n } from '@/hooks'
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'

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

  return route.name !== routeName && route.path.startsWith(startPath)
}

export default isArticle
