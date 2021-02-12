<template>
  <main class="flex justify-between container box-border max-w-full md:mx-auto mx-4 md:mt-16 mt-4">
    <!-- 文章内容 -->
    <section class="flex justify-between flex-col max-w-prose">
      <h1 class="line text-3xl mb-4">
        {{ title }}
      </h1>

      <p class="line text-sm text-gray-400 mb-4 pb-4 border-b dark:border-white dark:border-opacity-5">
        <span class="mr-8">作者：程沛权</span>
        <span>{{ date }}</span>
      </p>

      <slot v-bind="attrs" />
    </section>
    <!-- 文章内容 -->

    <!-- 侧边栏 -->
    <article-sidebar />
    <!-- 侧边栏 -->

  </main>
</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup (props, { attrs }) {
    const route = useRoute();
    console.log(route);
    console.log(attrs);
    
    const { frontmatter } = attrs;
    console.log(frontmatter);
    
    const title: string = frontmatter.title;
    const date: string = frontmatter.date.substr(0, 10).replace(/T/, ' ');

    
    

    return {
      attrs,
      title,
      date
    }
  }
})
</script>

<style lang="postcss">
.line {
  @apply flex items-center w-full
}
.prose {
  width: 100%;
  max-width: 100%;

  img {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>