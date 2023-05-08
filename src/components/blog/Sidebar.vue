<template>
  <section class="article-sidebar lg:flex hidden flex-col flex-shrink-0 ml-16">
    <!-- 热门栏目 -->
    <section class="mb-16">
      <h2 class="block-title">我出版的书</h2>
      <div class="flex flex-col w-full">
        <a href="./the-story-of-the-book-learning-vue3" target="_blank">
          <img
            class="w-full"
            src="https://cdn.chengpeiquan.com/img/2023/05/20230508232214.jpg?x-oss-process=image/interlace,1"
            alt="前端工程化：基于 Vue.js 3.0 的设计与实践"
          />
        </a>

        <div class="flex justify-center items-center w-full mt-3">
          <span>点击购买 ☞ </span>
          <a
            class="!no-underline !hover:text-pink-400 ml-3"
            href="https://union-click.jd.com/jdc?e=jdext-1638352360249409536-0-1&p=JF8BARkJK1olXwQBUVpdAE8SAF8IGVMRXgICV24ZVxNJXF9RXh5UHw0cSgYYXBcIWDoXSQVJQwYAXFpeDEsUHDZNRwYlX1JEIQg5XCt0ZAlqUiVNX0FQACsWTkcbM28BG1kdXAcCU11tCEoWA2sNGFgTXDYyVFttWiXPtdnQvuoJiayNgdbKOEonA2gBGVkdXwEHVFdeAXsXC2s4zfWBiI69je743uG51uK4ztK-ibiEZG5tC3tMVjtBXkcVWgQLVlpeCkwWAGoAHlodWQQFSF9BCHsXAm4KE1gWWgQGOltdCUoVAGoBElh7XwcDVltdDksXAV8IK1glA2gDB1heWkweVgFVQgkdX00BHTBdDUgXAW4OHF8lXwcDVlxtOA"
            target="_blank"
            >【京东商城】</a
          >
          <a
            class="!no-underline !hover:text-pink-400 ml-3"
            href="https://s.click.taobao.com/t?e=m%3D2%26s%3D7eZPjJt7QJNw4vFB6t2Z2ueEDrYVVa64yK8Cckff7TVRAdhuF14FMXonIcf4DInoMMgx22UI05ZRvxcz%2FoTyBGNojKDSmWQhTIZbYI9jayp8PNk4B98QhUVUjoeWqzb%2B5mzd0fxoCIaFpjofm3hpRhwogYNSK3IrQPZdAhulFAULZMqoQW%2BfuB6GmlJyRiVTGSs8kMDMeyhHJZaVw28y8Wrk5fXXieVy6a%2F%2FENJP36wMyM3sDoIE3myjwLjQ1DptJJn7FkCnT%2F5j0n6UXAgF3v2%2BtTfElYb8RFDRgzhUg%2BSjJnAf507Uv%2BiK7LcQp3KospWd4zfY8zqcEdwGxwkp5JaYzSMEwlxThakdowOjbI2OmjxjH%2BEyQGTWRvaaxnzAXJHdUWjDlfMDnfwHPQnOXiGFCzYOOqAQ&unid=1X3aISuD7B60&union_lens=lensId:TAPI@1683471818@2103de44_0d37_187f6bd6062_8bdf@01"
            target="_blank"
            >【天猫商城】</a
          >
        </div>
      </div>
    </section>
    <!-- 热门栏目 -->

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

    <!-- 在线吸猫 -->
    <section class="mb-16">
      <h2 class="block-title">在线吸猫</h2>
      <div class="flex flex-col w-full">
        <a href="https://vue3.chengpeiquan.com/" target="_blank">
          <img
            class="w-full"
            src="https://cdn.chengpeiquan.com/img/2021/07/20210703235057.jpg?x-oss-process=image/interlace,1"
            alt="扫码关注我的抖音号"
          />
        </a>
      </div>
    </section>
    <!-- 在线吸猫 -->

    <!-- 友情链接 -->
    <FriendlyLinks />
    <!-- 友情链接 -->
  </section>
</template>

<script setup lang="ts">
import { useList } from '@/hooks'
const { guessList, getGuessList } = useList('article')
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
