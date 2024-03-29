import type { RouteRecordRaw } from 'vue-router'
import type { CategoryConfigItem, CategoryListInfo } from '@/types'

// 分类配置
export const categoryConfigList: CategoryConfigItem[] = [
  {
    path: 'beginner',
    text: {
      zh: '新手入门',
      en: 'Beginner',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220221141035.jpg?x-oss-process=image/interlace,1',
  },
  {
    path: 'thrift',
    text: {
      zh: '省钱菜谱',
      en: 'Thrift',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200704.jpg?x-oss-process=image/interlace,1',
  },
  {
    path: 'bento',
    text: {
      zh: '上班带饭',
      en: 'Bento',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200259.jpg?x-oss-process=image/interlace,1',
  },
  {
    path: 'teochew',
    text: {
      zh: '潮汕风味',
      en: 'Teochew',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200445.jpg?x-oss-process=image/interlace,1',
  },
  {
    path: 'staple',
    text: {
      zh: '特色主食',
      en: 'Staple',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213195746.jpg?x-oss-process=image/interlace,1',
  },
  {
    path: 'soup',
    text: {
      zh: '煲个靓汤',
      en: 'Soup',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200137.jpg?x-oss-process=image/interlace,1',
  },
  {
    path: 'orthodontic',
    text: {
      zh: '正畸食谱',
      en: 'Orthodontic',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213195910.jpg?x-oss-process=image/interlace,1',
  },
  {
    path: 'condiment',
    text: {
      zh: '调味辅料',
      en: 'Condiment',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2022/02/20220213200054.jpg?x-oss-process=image/interlace,1',
  },
  {
    path: 'clever',
    text: {
      zh: '生活妙招',
      en: 'Clever',
    },
    icon: 'https://cdn.chengpeiquan.com/img/2023/03/20230312234314.jpg?x-oss-process=image/interlace,1',
  },
]

// 分类信息
export const categoryListInfo: CategoryListInfo = {
  type: 'cookbook',
  categoryPath: 'cooking',
}

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
