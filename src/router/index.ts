import { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import autoRoutes from 'virtual:generated-pages'
import articleRoutes, {
  categoryListInfo as articleCategoryListInfo,
} from './article'
import cookbookRoutes, {
  categoryListInfo as cookbookCategoryListInfo,
} from './cookbook'
import type { CategoryListInfo } from '@/types'

/**
 * 获取路由信息
 * @param pageType - 页面类型，article=博客路由，cookbook=菜谱路由
 * @returns 对应的路由信息
 */
export const getRouteInfo = (pageType: string): CategoryListInfo => {
  switch (pageType) {
    case 'article':
      return { ...articleCategoryListInfo }
    case 'cookbook':
      return { ...cookbookCategoryListInfo }
    default:
      return {
        type: '',
        categoryPath: '',
      }
  }
}

/**
 * 定义路由
 */
export const routes: Array<RouteRecordRaw> = [
  ...autoRoutes,
  ...articleRoutes,
  ...cookbookRoutes,
].map((route: RouteRecordRaw) => {
  if (
    (String(route.name).endsWith('article-page') ||
      String(route.name).endsWith('cookbook-page')) &&
    !route.path.endsWith('?')
  ) {
    route.path += '?'
  }

  return {
    ...route,
    alias: route.path.endsWith('/')
      ? `${route.path}index.html`
      : `${route.path}.html`,
  }
})

/**
 * 路由切换后的页面定位
 */
export const scrollBehavior: RouterScrollBehavior = (
  to,
  from,
  savedPosition
) => {
  return savedPosition
    ? savedPosition
    : {
        top: 0,
        left: 0,
      }
}
