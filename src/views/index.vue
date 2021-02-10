<template>
  <main>
    <!-- 头图 -->
    <section class="w-full h-60 overflow-hidden mb-6">
      <img
        class="img"
        :src="banner"
        alt="花臂当仔"
      >
    </section>
    <!-- 头图 -->

    <!-- 主体 -->
    <section class="container mx-auto mb-6">

    </section>
    <!-- 主体 -->

  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import banner from '/@img/banner.jpg'

useHead({
  title: '程沛权 - 养了三只猫',
  meta: [
    { property: 'og:title', content: 'Anthony Fu' },
    { property: 'og:image', content: 'https://antfu.me/avatar.png' },
    { name: 'description', content: 'Anthony Fu\'s Portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@antfu7' },
  ],
})
</script>

<style scoped>

</style>