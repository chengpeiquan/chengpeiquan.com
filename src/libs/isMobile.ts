/**
 * 判断是否手机平台
 * @description 借用了ref生成为响应式数据，在script里记得通过 isMobile.value 去操作，template则不必
 */
import { ref } from 'vue'

const isMobile = ref<boolean>(true)
const checkIsMobile = (): boolean =>
  /iPhone|phone|android|iPod|pad|iPad/i.test(navigator.userAgent.toLowerCase())

try {
  isMobile.value = checkIsMobile()

  window.addEventListener(
    'orientationchange' in window ? 'orientationchange' : 'resize',
    () => {
      isMobile.value = checkIsMobile()
    },
    false
  )
} catch (e) {
  isMobile.value = true
}

export default isMobile
