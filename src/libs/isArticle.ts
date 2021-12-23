import config from '@/config'
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'

const { defaultLang } = config

/**
 * 判断是否文章页
 * @param route - Vue 路由
 * @param lang - 语言缩写， e.g. en, zh-CN
 */
const isArticle = (
  route: RouteRecordRaw | RouteLocationNormalizedLoaded,
  lang: string = defaultLang
): boolean => {
  if (!route.path || typeof route.path !== 'string') {
    return false
  }

  let routeName: string = 'article-page'
  let startPath: string = '/article/'

  if (lang !== defaultLang) {
    routeName = `${lang}-article-page`
    startPath = `/${lang}/article/`
  }

  return route.name !== routeName && route.path.startsWith(startPath)
}

export default isArticle
