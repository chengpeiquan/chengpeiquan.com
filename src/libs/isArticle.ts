/** 
 * 判断是否文章页
 */
import { RouteRecordRaw } from 'vue-router'

const isArticle = (route: RouteRecordRaw): boolean => {
  if ( !route.path || typeof route.path !== 'string' ) {
    return false;
  }

  return route.name !== 'article-page' && route.path.startsWith('/article/');
}

export default isArticle;