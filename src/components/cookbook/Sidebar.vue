<template>
  <section class="article-sidebar lg:flex hidden flex-col flex-shrink-0 ml-16">
    <!-- 猜你喜欢 -->
    <section class="mb-8">
      <div class="flex justify-between items-center block-title">
        <h2>猜你喜欢</h2>
        <span
          class="dark:text-gray-400 text-gray-500 text-base font-normal cursor-pointer select-none"
          @click="getGuessList()"
        >
          换一换
        </span>
      </div>
      <ul>
        <li class="flex mb-8" v-for="(item, index) in guessList" :key="index">
          <!-- 封面 -->
          <div
            v-if="item.cover"
            class="flex flex-shrink-0 w-16 h-12 overflow-hidden mr-4 rounded"
          >
            <router-link :title="item.title" :to="item.path">
              <img class="img" :src="item.cover" :alt="item.title" />
            </router-link>
          </div>
          <!-- 封面 -->

          <!-- 标题 -->
          <router-link
            class="flex flex-1 line-clamp-2"
            :title="item.title"
            :to="item.path"
          >
            <h2 class="article-title text-base">{{ item.title }}</h2>
          </router-link>
          <!-- 标题 -->
        </li>
      </ul>
    </section>
    <!-- 猜你喜欢 -->

    <!-- 小程序码 -->
    <section class="mb-16">
      <h2 class="block-title">菜谱专栏 · 小程序版本</h2>
      <div class="flex flex-col w-full">
        <img
          class="w-full"
          src="https://cdn.chengpeiquan.com/img/2022/02/20220221111852.jpg?x-oss-process=image/interlace,1"
          alt="扫码关注本菜谱的小程序版"
        />
      </div>
    </section>
    <!-- 小程序码 -->

    <!-- 在线互动 -->
    <section class="mb-16">
      <h2 class="block-title">在线互动</h2>
      <div class="flex flex-col w-full">
        <a href="https://vue3.chengpeiquan.com/" target="_blank">
          <img
            class="w-full"
            src="https://cdn.chengpeiquan.com/img/2021/12/20211227005610.jpg?x-oss-process=image/interlace,1"
            alt="扫码关注我的小红书"
          />
        </a>
      </div>
    </section>
    <!-- 在线互动 -->

    <!-- 友情链接 -->
    <FriendlyLinks />
    <!-- 友情链接 -->
  </section>
</template>

<script setup lang="ts">
import { useList } from '@/hooks'
const { guessList, getGuessList } = useList('cookbook')
getGuessList()
</script>

<style lang="postcss" scoped>
.article-sidebar {
  width: 340px;
}
.block-title {
  @apply text-xl font-bold mb-4 pb-4 border-b dark:border-white dark:border-opacity-5;
}
.article-title {
  text-align: justify;
}
.article-toc-container {
  :deep(.article-toc) {
    li {
      margin-left: 0;
    }
  }
}
</style>
