import { computed } from 'vue'
import { useRoute } from 'vue-router'
import config from '@/config'

export function useI18n() {
  const route = useRoute()

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
   * 空提示
   */
  const emptyTips = computed(() => config.i18n[lang.value].emptyTips)

  /**
   * 网页标题
   */
  // const pageTitle = computed(() => {})

  return {
    lang,
    emptyTips,
    // pageTitle,
  }
}
