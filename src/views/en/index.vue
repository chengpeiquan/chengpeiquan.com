<template>
  <main>
    <!-- 头图 -->
    <section class="banner">
      <img
        class="img"
        width="400"
        height="225"
        src="https://cdn.chengpeiquan.com/img/2021/01/20210222114425.jpg?x-oss-process=image/interlace,1"
        alt="chengpeiquan"
      />
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
import { useI18n } from '@/hooks'

const { getText } = useI18n()

useHead({
  title: getText('title'),
  meta: [
    {
      property: 'og:title',
      content: getText('title'),
    },
  ],
})
</script>

<style lang="postcss" scoped>
.banner {
  @apply w-full overflow-hidden mb-6 border-b-4 dark:border-white dark:border-opacity-5 bg-white bg-opacity-5;
  height: 80vh;
  max-height: 80vh;
  filter: brightness(0.5) blur(2px);
}
</style>
