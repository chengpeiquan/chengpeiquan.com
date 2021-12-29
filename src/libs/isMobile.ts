import { ref } from 'vue'
import { isClient } from '@vueuse/core'

/**
 * 判断是否手机平台
 * @description 借用了ref生成为响应式数据，在script里记得通过 isMobile.value 去操作，template则不必
 */
const isMobile = ref<boolean>(false)

try {
  if (isClient) {
    const checkIsMobile = (): boolean =>
      /iPhone|phone|android|iPod|pad|iPad/i.test(
        window.navigator.userAgent.toLowerCase()
      )
    isMobile.value = checkIsMobile()

    window.addEventListener(
      'orientationchange' in window ? 'orientationchange' : 'resize',
      () => {
        isMobile.value = checkIsMobile()
      },
      false
    )
  }
} catch (e) {
  isMobile.value = false
}

export default isMobile
