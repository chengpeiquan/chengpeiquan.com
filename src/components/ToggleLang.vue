<template>
  <a
    class="select-none mr-4 text-xl"
    :title="lang === 'en' ? 'Switch to Chinese' : '切换为英文'"
    @click="toggleLang"
  >
    <uil-letter-chinese-a v-show="lang === 'en'" />
    <ri-english-input v-show="lang === 'zh-CN'" />
  </a>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const lang: string = inject('lang') || ''
const path = ref<string>('/')

const toggleLang = (): void => {
  // 英文转中文
  if (lang.value === 'en') {
    path.value = route.path === '/en' ? `/` : route.path.replace(/\/en/, '')
  }
  // 中文转英文
  else {
    path.value = route.path === '/' ? `/en` : `/en${route.path}`
  }

  router.replace({
    path: path.value,
  })
}
</script>
