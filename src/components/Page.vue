<template>
  <!-- 目录 -->
  <TOC />
  <!-- 目录 -->

  <section
    class="
      page-detail
      flex
      justify-start
      flex-col flex-1
      md:w-auto
      w-full
      overflow-hidden
    "
  >
    <!-- 页头信息 -->
    <div v-if="title" class="prose m-auto mb-8">
      <h1 class="md:text-3xl text-xl mb-0">
        {{ title }}
      </h1>

      <p v-if="desc" class="opacity-50 mt-1 italic">
        {{ desc }}
      </p>
    </div>
    <!-- 页头信息 -->

    <!-- 内容插槽 -->
    <slot />
    <!-- 内容插槽 -->
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from '@/hooks'
import type { Frontmatter } from '@/types'

const props = defineProps<{
  frontmatter: Frontmatter
}>()
const { getText } = useI18n()
const title = computed(() => props.frontmatter.title)
const desc = computed(() => props.frontmatter.desc)
const keywords = computed(() => props.frontmatter.keywords)
const meta = [
  {
    property: 'og:title',
    content: `${title.value} - ${getText('title')}`,
  },
  { name: 'description', content: desc.value },
]

if (keywords.value) {
  meta.push({ name: 'keywords', content: keywords.value })
}

useHead({
  title: `${title.value} - ${getText('title')}`,
  meta,
})
</script>

<style lang="postcss">
.page-detail {
  .article-toc {
    li {
      margin-left: 1em !important;
      padding-left: 0 !important;
    }
  }
}
@media (min-width: 1280px) {
  .page-detail {
    img {
      max-width: 1000px;
    }
  }
}
</style>
