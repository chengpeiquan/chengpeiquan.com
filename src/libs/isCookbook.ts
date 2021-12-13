import type { RouteRecordRaw } from 'vue-router'

/**
 * 判断是否菜谱页
 * @param route - Vue 路由
 */
const isCookbook = (route: RouteRecordRaw): boolean => {
  if (!route.path || typeof route.path !== 'string') {
    return false
  }

  const routeName = 'cookbook-page'
  const startPath = '/cookbook/'

  return route.name !== routeName && route.path.startsWith(startPath)
}

export default isCookbook
