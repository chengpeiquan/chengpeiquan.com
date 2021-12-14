/**
 * 列表的项目类型
 */
export interface ListItem {
  path: string
  title: string
  desc: string
  cover: string
  date: string
}

/**
 * 分类配置的项目类型
 * @description 用在路由里定义分类配置
 */
export interface CategoryConfigItem {
  path: string
  text: {
    'zh-CN': string
    en: string
  }
}

/**
 * 分类的项目类型
 */
export interface CategoryItem {
  routeName: string
  path: string
  text: string
}
