<template>
  <!-- 目录 -->
  <TOC />
  <!-- 目录 -->

  <!-- 文章 -->
  <div class="flex flex-1 md:pl-10 overflow-hidden">
    <section class="article-detail flex justify-start flex-col w-full">
      <!-- 标题 -->
      <h1 class="flex items-center w-full md:text-3xl text-xl md:mb-4 mb-2">
        {{ title }}
      </h1>
      <!-- 标题 -->

      <!-- 发布信息 -->
      <div
        class="
          flex
          justify-between
          items-center
          w-full
          text-sm text-gray-400
          md:mb-8
          mb-4
          md:pb-8
          pb-4
          border-b
          dark:border-white dark:border-opacity-5
        "
      >
        <div class="flex items-center">
          <span class="md:mr-8 mr-4">作者：程沛权</span>
          <span :title="date.substr(0, 10)">
            {{ diffDays > 7 ? date.substr(0, 10) : dateAgo }}
          </span>
        </div>
      </div>
      <!-- 发布信息 -->

      <!-- 内容插槽 -->
      <slot />
      <!-- 内容插槽 -->

      <div
        v-if="xiaohongshuId && isMobile"
        class="btn-open-xiaohongshu"
        :title="
          getText({
            zh: '打开小红书与我互动',
            en: 'Open the Xiaohongshu and interact with me',
          })
        "
        @click="openXHS"
      />
    </section>
  </div>
  <!-- 文章 -->

  <!-- 侧边栏 -->
  <CookbookSidebar />
  <!-- 侧边栏 -->
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useDate, useI18n } from '@/hooks'
import isMobile from '@libs/isMobile'
import type { Frontmatter } from '@/types'

const props = defineProps<{
  frontmatter: Frontmatter
}>()
const { dateDisplay } = useDate()
const { getText } = useI18n()
const title = computed(() => props.frontmatter.title)
const desc = computed(() => props.frontmatter.desc)
const keywords = computed(() => props.frontmatter.keywords)
const date = computed(() => props.frontmatter.date)
const xiaohongshuId = computed(() => props.frontmatter.xiaohongshuId)
const { diffDays, dateAgo } = dateDisplay(
  +new Date(date.value) - 8 * 60 * 60 * 1000
)

/**
 * 打开小红书
 */
const openXHS = (): void => {
  if (!xiaohongshuId.value) return
  window.open(
    `https://oia.xiaohongshu.com/oia?deeplink=xhsdiscover://item/${xiaohongshuId.value}?open_url=%2Fdiscovery%2Fitem%2F${xiaohongshuId.value}%3Fshare_from_user_hidden%3Dtrue%26xhsshare%3DWeixinSession%26appuid%3D5c6cf700000000001003f7f6%26apptime%3D1641575893&position=to_note-nav-btn&browser=safari&exp_groups=commentshow_clt1%2Cgif_clt1%2Cques_clt2&url=noteDetail&xhsshare=WeixinSession&downloadLink=https://itunes.apple.com/us/app/xiao-hong-shu-quan-shi-jie/id741292507`
  )
}

/**
 * 设置页面信息
 */
useHead({
  title: isMobile.value ? title.value : `${title.value} - ${getText('title')}`,
  meta: [
    {
      property: 'og:title',
      content: `${title.value} - ${getText('title')}`,
    },
    { name: 'description', content: desc.value },
    { name: 'keywords', content: keywords.value },
  ],
})
</script>

<style lang="postcss">
.btn-open-xiaohongshu {
  background-image: url('https://cdn.chengpeiquan.com/img/2022/01/20220108012511.png');
  @apply w-9rem h-2.7rem bg-center bg-no-repeat bg-cover mt-8 mx-auto;
}
.article-detail {
  .header-anchor {
    opacity: 0.5;
  }
}
@media (max-width: 1280px) {
  .article-detail {
    .article-toc {
      li {
        margin-left: 1em !important;
        padding-left: 0 !important;
      }
    }
  }
}
@media (min-width: 1280px) {
  .article-detail {
    .article-toc {
      display: none;
    }
  }
}
</style>
