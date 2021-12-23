import { computed } from 'vue'
import { useRoute } from 'vue-router'
import config from '@/config'
import type { i18nTextConfig } from '@/types'

export function useI18n() {
  const route = useRoute()
  const { i18n, defaultLang } = config

  /**
   * 获取当前正在使用的语言
   * @returns 当前的语言代号， e.g. zh-CN
   */
  const lang = computed(() => {
    const { i18n, defaultLang } = config
    const langTag: string = route.path.split('/')[1]
    return Object.prototype.hasOwnProperty.call(i18n, langTag)
      ? langTag
      : defaultLang
  })

  /**
   * 是否默认语言
   */
  const isDefaultLang = computed(() => lang.value === defaultLang)

  /**
   * 导航
   */
  const navList = computed(() => {
    return [
      {
        target: getPath('/'),
        text: getText({
          zh: '首页',
          en: 'Home',
        }),
      },
      {
        target: getPath('/article'),
        text: getText({
          zh: '文章',
          en: 'Article',
        }),
      },
      {
        target: getPath('/cookbook'),
        text: getText({
          zh: '菜谱',
          en: 'Cookbook',
        }),
      },
      {
        target: getPath('/about'),
        text: getText({
          zh: '关于',
          en: 'About',
        }),
      },
    ]
  })

  /**
   * 空提示
   */
  const emptyTips = computed(() => config.i18n[lang.value].emptyTips)

  /**
   * 获取路径
   * @param path - 以 / 开头的相对地址
   * @returns 根据当前语言返回需要的国际化路径
   */
  const getPath = (path: string): string => {
    return isDefaultLang.value
      ? path
      : `/${lang.value}${path === '/' ? '' : path}`
  }

  /**
   * 获取文本
   * @param target - string类型时是config.i18n里，语言分支里的的key
   * @returns 根据当前语言返回需要的国际化文本
   */
  const getText = (target: string | i18nTextConfig): string => {
    const type = Object.prototype.toString.call(target)
    const isString = type === '[object String]'
    const isObject = type === '[object Object]'

    // 读配置
    if (
      isString &&
      target &&
      Object.prototype.hasOwnProperty.call(i18n[lang.value], target)
    ) {
      return i18n[lang.value][target]
    }

    // 转多语言
    if (isObject) {
      const { zh, en } = target as i18nTextConfig
      return isDefaultLang.value ? zh : en
    }

    return ''
  }

  return {
    lang,
    isDefaultLang,
    navList,
    emptyTips,

    getPath,
    getText,
  }
}
