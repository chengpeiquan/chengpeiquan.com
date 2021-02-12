<template>
  <section class="flex justify-between flex-col">
    <ul class="article-list divide-y dark:divide-white dark:divide-opacity-5 md:mx-0 mx-4">
      <li
        class="flex flex-col mb-8 pt-8"
        v-for="(item, index) in articleList"
        :key="index"
      >
        <router-link
          class="mb-4"
          :title="item.title"
          :to="item.path"
        >
          <h2 class="text-2xl">{{ item.title }}</h2>
        </router-link>

        <div class="flex">
          <!-- 封面 -->
          <div
            v-if="item.cover"
            class="flex flex-shrink-0 w-40 h-32 overflow-hidden mr-4 rounded"
          >
            <router-link
              :title="item.title"
              :to="item.path"
            >
              <img
                class="img"
                :src="item.cover"
                :alt="item.title"
              >
            </router-link>
          </div>
          <!-- 封面 -->

          <!-- 信息 -->
          <div class="flex flex-col justify-between">
            <p class="text-base text-gray-400 mb-4">
              {{ item.description }}
            </p>

            <p class="text-sm text-gray-400">
              {{ item.date.substr(0, 10) }}
            </p>
          </div>
          <!-- 信息 -->
        </div>
      </li>
    </ul>
  </section>

  <!-- 侧边栏 -->
  <article-sidebar />
  <!-- 侧边栏 -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'
import { formatDate } from '/@libs/logics'
import isArticle from '/@libs/isArticle'

interface List {
  path: string,
  title: string,
  description: string,
  cover: string,
  date: string
}

export default defineComponent({
  setup () {
    const router = useRouter();
    const articleList = ref<List[]>([]);

    /** 
     * 获取文章列表
     */
    const getArticleList = (): void => {
      // 提取文章详情页的路由并按日期排序
      const routes = router.getRoutes()
        .filter( (route: RouteRecordRaw) => isArticle(route) )
        .sort( (a: RouteRecordRaw, b: RouteRecordRaw) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date) );

      // 提取要用到的字段
      articleList.value = routes.map( (route: RouteRecordRaw) => {
        const { path } = route;
        const { frontmatter } = route.meta;
        const { title, description, cover, date } = frontmatter;
        
        return {
          path,
          title,
          description,
          cover,
          date
        }
      });

      console.log(articleList.value);
      
    }

    onMounted(getArticleList);

    return {
      articleList
    }
  }
})
</script>

<style scoped>
.article-list li:first-child {
  padding-top: 0;
}
</style>