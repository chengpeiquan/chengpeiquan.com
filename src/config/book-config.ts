import { type linkItem } from './route-config'

export interface BookPurchaseInfo {
  title: string
  description: string
  author: string
  publisher: string
  cover: string
  articleSlug: string
  introSlug: string // Read markdown file from `@/contents/fragment`
  authorRecommendationSlug: string // Same as above
  purchaseLinks: linkItem[]
}

export const learningVue3: Record<'zh', BookPurchaseInfo> = {
  zh: {
    title: '前端工程化 基于 Vue.js 3.0 的设计与实践',
    description:
      '本书以 Vue.js 的 3.0 版本为核心技术栈，围绕 “前端工程化” 和 TypeScript 的知识点展开讲解，根据笔者多年的前端开发和一线团队管理经验，将 Vue 3 的知识点按照工程师做项目的实施顺序梳理成章，一步一步帮助读者进行前端工程化和 Vue 3 的开发。从前端工程化开始到 TypeScript 语言的学习，再到使用 TypeScript 开发 Vue 3 项目，通过循序渐进的学习过程提升读者在前端工程化领域的实战能力。',
    author: '程沛权',
    publisher: '机械工业出版社',
    cover:
      'https://cdn.chengpeiquan.com/img/2023/05/20230508232214.jpg?x-oss-process=image/interlace,1',
    articleSlug: 'the-story-of-the-book-learning-vue3',
    introSlug: 'published-book-introduction',
    authorRecommendationSlug: 'published-book-author-recommendation',
    purchaseLinks: [
      {
        title: '京东商城',
        href: 'https://item.jd.com/10074250819730.html',
      },
      {
        title: '天猫商城',
        href: 'https://detail.tmall.com/item.htm?id=715323739623',
      },
      {
        title: '当当网',
        href: 'https://product.dangdang.com/29566355.html',
      },
    ],
  },
}
