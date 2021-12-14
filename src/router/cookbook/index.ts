import type { RouteRecordRaw } from 'vue-router'
import type { CategoryConfigItem } from '@/types'

// 分类配置
export const categoryConfigList: CategoryConfigItem[] = [
  {
    path: 'thrift',
    text: {
      'zh-CN': '省钱菜谱',
      en: 'Thrift',
    },
  },
  {
    path: 'condiment',
    text: {
      'zh-CN': '调味料',
      en: 'condiment',
    },
  },
]

// 根据分类配置创建分类路由
const routes: RouteRecordRaw[] = categoryConfigList.map((item) => {
  return {
    path: `/cooking/${item.path}/:page?`,
    name: `cooking-${item.path}-page`,
    props: true,
    component: () => import('@views/cookbook/[page].vue'),
    meta: {
      frontmatter: {},
    },
  }
})

export default routes
