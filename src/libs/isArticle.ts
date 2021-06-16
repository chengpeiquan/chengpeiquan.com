/**
 * 判断是否文章页
 * @param {object} route - Vue 路由
 * @param {string} lang - 语言缩写， e.g. en, zh-CN
 */
import { RouteRecordRaw } from 'vue-router'
import config from '/@/config'

const { defaultLang } = config

const isArticle = (
  route: RouteRecordRaw,
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
