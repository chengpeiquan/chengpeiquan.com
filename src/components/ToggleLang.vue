<template>
  <a
    class="select-none mr-4 text-xl"
    :title="lang === 'en' ? 'Switch to Chinese' : '切换为英文'"
    @click="toggleLang"
  >
    <uil-letter-chinese-a v-show="lang === 'en'" />
    <ri-english-input v-show="lang === 'zh'" />
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '@/hooks'

const { lang } = useI18n()
const route = useRoute()
const router = useRouter()
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
