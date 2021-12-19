import { computed } from 'vue'
import { useRoute } from 'vue-router'
import config from '@/config'
import type { ComputedRef } from 'vue'

export function useI18n() {
  /**
   * 获取当前正在使用的语言
   * @returns 当前的语言代号， e.g. zh-CN
   */
  const getLang = (): ComputedRef<string> => {
    const route = useRoute()
    const lang: ComputedRef<string> = computed(() => {
      const { i18n, defaultLang } = config
      const langTag: string = route.path.split('/')[1]
      return Object.prototype.hasOwnProperty.call(i18n, langTag)
        ? langTag
        : defaultLang
    })

    return lang
  }

  return {
    getLang,
  }
}
