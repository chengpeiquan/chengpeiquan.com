<template>
  <main class="page-404 prose">
    <h1>404 Not Found</h1>
    <p>如果是您以前收藏的链接被移除了，请提 <a href="https://github.com/chengpeiquan/chengpeiquan.com/issues/new" target="_blank" rel="nofollow noopener noreferrer">issue</a> 联系我。</p>
    <p>将在 {{ seconds }} 后返回首页…</p>
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { isClient } from '@vueuse/core'
import { ref } from 'vue'
import config from '/@ts/config'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

useHead({
  title: `404 - ${config.title}`,
  meta: [
    {
      property: 'og:title',
      content: config.title
    }
  ],
});

const seconds = ref<number>(5);
const router = useRouter();
if ( isClient ) {
  // 5s后返回首页
  const countdown: number | null = setInterval( () => {
    if ( seconds.value === 1 ) {
      clearInterval(countdown);
      router.push({
        name: 'index'
      });
      return false;
    }
    
    seconds.value --;
  }, 1000);

  // 提前离开路由时，需要清除定时器
  onBeforeRouteLeave( () => {
    clearInterval(countdown);
  });
}
</script>

<style lang="postcss" scoped>
.page-404 {
  @apply flex flex-col items-center container mx-auto md:mt-16 mt-4 md:px-0 px-4;
  height: 65vh;
  max-height: 65vh;
}
</style>