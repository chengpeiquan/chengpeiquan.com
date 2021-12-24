import type { RouteRecordRaw } from 'vue-router'
import type { CategoryConfigItem } from '@/types'

// 分类配置
export const categoryConfigList: CategoryConfigItem[] = [
  {
    path: 'thrift',
    text: {
      zh: '省钱菜谱',
      en: 'Thrift',
    },
  },
  {
    path: 'bento',
    text: {
      zh: '上班带饭',
      en: 'Bento',
    },
  },
  {
    path: 'staple',
    text: {
      zh: '特色主食',
      en: 'Staple',
    },
  },
  {
    path: 'condiment',
    text: {
      zh: '调味辅料',
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
