<template>
  <section class="flex flex-col">
    <!-- 列表 -->
    <ul class="article-list divide-y dark:divide-white dark:divide-opacity-5 md:mx-0 mx-4">
      <li
        class="flex flex-col md:mb-8 mb-4 md:pt-8 pt-4"
        v-for="(item, index) in articleList"
        :key="index"
      >
        <router-link
          class="md:mb-4 mb-2"
          :title="item.title"
          :to="item.path"
        >
          <h2 class="md:text-2xl text-lg line-clamp-2">
            {{ item.title }}
          </h2>
        </router-link>

        <div class="flex md:flex-row flex-col">
          <!-- 封面 -->
          <div
            v-if="item.cover"
            class="flex flex-shrink-0 md:w-40 w-full md:h-32 h-auto overflow-hidden md:mr-4 mr-0 md:mb-0 mb-2 rounded"
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
          <div class="md:flex hidden flex-col justify-between">
            <p class="md:text-base text-sm text-gray-400 md:mb-4 mb-2 md:line-clamp-3 line-clamp-2">
              {{ item.desc }}
            </p>

            <p class="md:text-sm text-xs text-gray-400">
              {{ item.date.substr(0, 10) }}
            </p>
          </div>
          <!-- 信息 -->
        </div>
      </li>
    </ul>
    <!-- 列表 -->

    <!-- 翻页 -->
    <section class="flex justify-center items-center">
      <div class="mx-4">
        <router-link
          v-if="page > 1"
          :to="{
            name: 'article-page',
            params: {
              page: page - 1
            }
          }"
        >
          Prev
        </router-link>
      </div>

      <div class="mx-4">
        <router-link
          v-if="articleList.length === pageSize"
          :to="{
            name: 'article-page',
            params: {
              page: page + 1
            }
          }"
        >
          Next
        </router-link>
      </div>
    </section>
    <!-- 翻页 -->
  </section>

  <!-- 侧边栏 -->
  <article-sidebar />
  <!-- 侧边栏 -->
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter, RouteRecordRaw, useRoute } from 'vue-router'
import { formatDate } from '/@libs/logics'
import isArticle from '/@libs/isArticle'
import { useHead } from '@vueuse/head'
import config from '/@ts/config'

interface List {
  path: string,
  title: string,
  desc: string,
  cover: string,
  date: string
}

interface Pagination {
  prev: string,
  next: string
}

export default defineComponent({
  setup () {
    const route = useRoute();
    const router = useRouter();
    const routes = ref<RouteRecordRaw[]>([]);
    const page = ref<number>(1);
    const pageSize = ref<number>(10);
    const pageTotal = ref<number>(1);
    const articleTotal = ref<number>(1);
    const articleList = ref<List[]>([]);

    /** 
     * 获取分页信息 
     */
    const getPageInfo = (): void => {
      // 提取文章详情页的路由并按日期排序
      routes.value = router.getRoutes()
        .filter( (item: RouteRecordRaw) => isArticle(item) )
        .sort( (a: RouteRecordRaw, b: RouteRecordRaw) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date) );

      // 获取文章总数
      articleTotal.value = routes.value.length;

      // 获取页码总数
      pageTotal.value = routes.value.length;

      // 获取页码信息
      if ( route.params.page && !isNaN(Number(route.params.page)) ) {
        page.value = Number(route.params.page);
      }

      // 获取列表
      getArticleList();
    }

    /** 
     * 获取文章列表
     */
    const getArticleList = (): void => {
      // 根据页码获取对应的文章
      const START: number = 0 + pageSize.value * (page.value - 1);
      const END: number = START + pageSize.value;
      const CUR_ROUTES: RouteRecordRaw[] = routes.value.slice(START, END);
      console.log('开始', START, '结束', END, '文章列表', CUR_ROUTES);

      // 提取要用到的字段
      articleList.value = CUR_ROUTES.map( (route: RouteRecordRaw) => {
        const { path } = route;
        const { frontmatter } = route.meta;
        const { title, desc, cover, date } = frontmatter;
        
        return {
          path,
          title,
          desc,
          cover,
          date
        }
      });
    }

    /** 
     * 设置页面信息
     */
    useHead({
      title: `文章列表 - ${config.title}`,
      meta: [
        { property: 'og:title', content: `文章列表 - 第${page.value}页 - ${config.title}` }
      ],
    })

    /** 
     * 要执行的函数
     */
    getPageInfo();

    return {
      page,
      pageSize,
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