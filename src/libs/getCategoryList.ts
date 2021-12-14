import config from '@/config'
import type { CategoryConfigItem, CategoryItem } from '@/types'

interface Options {
  categoryConfigList: CategoryConfigItem[]
  categoryTag: string
  allCategoryTag: string
  lang: string
}

/**
 * 获取分类菜单
 * @param categoryConfigList - 路由里的分类配置信息
 * @param lang - i18n 语言类型
 * @returns 分类列表
 */
const getCategoryList = ({
  categoryConfigList,
  categoryTag,
  allCategoryTag,
  lang,
}: Options): CategoryItem[] => {
  const { defaultLang } = config

  // 提取分类
  const categoryList: CategoryItem[] = categoryConfigList.map(
    (item: CategoryConfigItem) => {
      return {
        routeName:
          lang === defaultLang
            ? `${categoryTag}-${item.path}-page`
            : `${lang}-${categoryTag}-${item.path}-page`,
        path:
          lang === defaultLang
            ? `/${categoryTag}/${item.path}`
            : `/${lang}/${categoryTag}/${item.path}`,
        text: item.text[lang],
      }
    }
  )

  // 补充一个所有文章到最前面
  categoryList.unshift({
    routeName:
      lang === defaultLang
        ? `${allCategoryTag}-page`
        : `${lang}-${allCategoryTag}-page`,
    path:
      lang === defaultLang
        ? `/${allCategoryTag}`
        : `/${lang}/${allCategoryTag}`,
    text: lang === defaultLang ? '全部' : 'All',
  })

  return categoryList
}

export default getCategoryList
