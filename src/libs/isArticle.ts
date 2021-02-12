import { type } from 'os';
import { RouteRecordRaw } from 'vue-router'

/** 
 * 判断是否文章页
 */
const isArticle = (route: RouteRecordRaw): boolean => {
  if ( !route.path || typeof route.path !== 'string' ) {
    return false;
  }

  return route.path.startsWith('/article/') && !route.path.endsWith('.html');
}

export default isArticle;