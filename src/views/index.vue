<template>
  <main>
    <!-- 头图 -->
    <section class="banner">
      <img
        class="img"
        width="1920"
        height="1080"
        src="https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210214152623.jpg"
        alt="花臂当仔"
      >
    </section>
    <!-- 头图 -->

    <!-- 主体 -->
    <!-- <section class="container mx-auto mb-6">
    </section> -->
    <!-- 主体 -->

  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import config from '/@ts/config'

useHead({
  title: config.title,
  meta: [
    {
      property: 'og:title',
      content: config.title
    }
  ],
});
</script>

<style lang="postcss" scoped>
.banner {
  @apply w-full overflow-hidden mb-6 border-b-4 dark:border-white dark:border-opacity-5 bg-white bg-opacity-5;
  height: 80vh;
  max-height: 80vh;
  filter: brightness(0.5) blur(2px);
}
</style>