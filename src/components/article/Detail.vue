<template>
  <main class="flex justify-between container md:mx-auto box-border px-4 md:mt-16 mt-4">
    <!-- 文章内容 -->
    <section class="flex justify-between flex-col w-full">
      <h1 class="line md:text-3xl text-xl md:mb-4 mb-2">
        {{ title }}
      </h1>

      <p class="line text-sm text-gray-400 mb-4 pb-4 border-b dark:border-white dark:border-opacity-5">
        <span class="mr-8">作者：程沛权</span>
        <span>{{ date.substr(0, 10) }}</span>
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
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isClient } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import config from '/@ts/config'

export default defineComponent({
  setup (props, { attrs }) {
    const route = useRoute();
    const router = useRouter();
    const { frontmatter } = attrs;
    const { title, desc, keywords, date } = frontmatter;

    /** 
     * 设置页面信息
     */
    useHead({
      title: `${title} - ${config.title}`,
      meta: [
        { property: 'og:title', content: `${title} - ${config.title}` },
        { name: 'description', content: desc },
        { name: 'keywords', content: keywords }
      ],
    })
    
    /** 
     * 页面加载时定位到链接对应的锚点
     */
    const navigateToId = (): void => {
      if ( isClient ) {
        router.isReady()
          .then( () => {
            setTimeout(() => {
              const { hash } = document.location;
              if ( hash.length > 1 ) {
                const id: string = decodeURIComponent(hash.substring(1));
                const element: HTMLElement | null = document.getElementById(id);
                if ( element ) {
                  element.scrollIntoView({
                    behavior: 'smooth'
                  });
                }
              }
            }, 500);
          })
          .catch( (e) => {
            console.log(e);
          });
      }
    }

    onMounted(() => {
      navigateToId();
    })

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