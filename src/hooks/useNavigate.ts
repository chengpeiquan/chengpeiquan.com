import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isClient } from '@vueuse/core'
import { useI18n } from '@/hooks'
import isMobile from '@libs/isMobile'
import isArticle from '@libs/isArticle'
import isCookbook from '@libs/isCookbook'
import type { Ref } from 'vue'

export function useNavigate() {
  const route = useRoute()
  const isShowTOC = ref<boolean>(false)

  /**
   * 目录标题
   */
  const tocTitle = computed(() => {
    const { getText } = useI18n()

    if (isArticle(route)) {
      return getText({
        zh: '文章目录',
        en: 'The Article TOC',
      })
    }

    if (isCookbook(route)) {
      return getText({
        zh: '菜谱目录',
        en: 'The Cookbook TOC',
      })
    }

    return getText({
      zh: '目录',
      en: 'Table Of Contents',
    })
  })

  /**
   * 定位到链接对应的锚点
   */
  const navigateToId = (id?: string, callback?: () => void): void => {
    if (!isClient) return
    const { hash } = window.location
    if (hash.length > 1) {
      const target: string = id || decodeURIComponent(hash.substring(1))
      const el: HTMLElement | null = document.getElementById(target)
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
        })
      }

      if (typeof callback === 'function') {
        callback()
      }
    }
  }

  /**
   * 提取目录生成到侧边栏
   */
  const initTOC = (tocHTML: Ref<string>): void => {
    if (!isClient || isMobile.value) return

    // 优先读取本地记录
    const key = `toc-${String(route.name)}`
    const record: string | null = window.sessionStorage.getItem(key)
    if (record) {
      tocHTML.value = record
      isShowTOC.value = true
    }

    // 更新目录
    const updateTOC = (): void => {
      // 获取文章内的目录
      const toc: HTMLElement | null = document.querySelector('.article-toc')
      if (!toc || isMobile.value) return

      // 显示目录并更新为最新目录内容
      isShowTOC.value = true
      if (toc && toc.outerHTML !== tocHTML.value) {
        tocHTML.value = toc.outerHTML
        window.sessionStorage.setItem(key, toc.outerHTML)
      }

      // 把文章内的目录移除
      const content: HTMLElement | null =
        document.querySelector('.article-content')
      if (!isMobile.value && content && content.childNodes[0]) {
        content.childNodes[0].remove()
      }
    }

    // 先执行定位，再去更新目录，避免定位不准
    const { hash } = window.location
    if (hash.length > 1) {
      navigateToId('', updateTOC)
    } else {
      onMounted(updateTOC)
    }
  }

  return {
    isShowTOC,
    tocTitle,

    navigateToId,
    initTOC,
  }
}
