<template>
  <main class="page-404 prose">
    <h1>404 Not Found</h1>
    <p>
      If your previously favorite link has been removed，Please contact me with
      an
      <a
        href="https://github.com/chengpeiquan/chengpeiquan.com/issues/new"
        target="_blank"
        rel="nofollow noopener noreferrer"
        >issue</a
      >
      .
    </p>
    <p>Will return to the homepage in {{ seconds }} seconds...</p>
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { isClient } from '@vueuse/core'
import { ref } from 'vue'
import { useI18n } from '@/hooks'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

const router = useRouter()
const seconds = ref<number>(5)
const { getPath, getText } = useI18n()

if (isClient) {
  // 5s后返回首页
  const countdown = setInterval(() => {
    if (seconds.value === 1) {
      clearInterval(countdown)
      router.push({
        path: getPath('/'),
      })
      return false
    }

    seconds.value--
  }, 1000)

  // 提前离开路由时，需要清除定时器
  onBeforeRouteLeave(() => {
    clearInterval(countdown)
  })
}

useHead({
  title: `404 - ${getText('title')}`,
})
</script>

<style lang="postcss" scoped>
.page-404 {
  @apply flex flex-col items-center container mx-auto md:mt-16 mt-4 md:px-0 px-4;
  height: 65vh;
  max-height: 65vh;
}
</style>
