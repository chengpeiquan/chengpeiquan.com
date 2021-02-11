<template>
  <main class="flex justify-between container mx-auto mt-16">
    <!-- 文章内容 -->
    <section class="flex justify-between flex-col">
      <h1 class="line text-3xl mb-4">
        {{ title }}
      </h1>

      <p class="line text-sm text-gray-400 mb-8 pb-8 border-b dark:border-white dark:border-opacity-5">
        {{ date }}
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
    const date: string = frontmatter.date.substr(0, 19).replace(/T/, ' ');

    
    

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