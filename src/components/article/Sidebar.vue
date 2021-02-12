<template>
  <section class="article-sidebar lg:flex hidden flex-col flex-shrink-0 ml-16">
    <!-- 热门栏目 -->
    <section class="mb-8">
      <h2 class="block-title">热门栏目</h2>
      <div class="flex flex-col w-full">
        <a
          href="https://vue3.chengpeiquan.com/"
          target="_blank"
        >
          <img
            class="w-full"
            src="https://chengpeiquan.com/wp-content/uploads/2021/01/1-1.jpg"
            alt="Vue3.0学习教程与实战案例"
          >
        </a>
      </div>
    </section>
    <!-- 热门栏目 -->

    <!-- 猜你喜欢 -->
    <section class="mb-8">
      <div class="flex justify-between items-center block-title">
        <h2>猜你喜欢</h2>
        <span class="text-base font-normal cursor-pointer select-none" @click="getArticleList">换一换</span>
      </div>
      <ul>
        <li
          class="flex mb-4"
          v-for="(item, index) in articleList"
          :key="index"
        >
          <!-- 封面 -->
          <div
            v-if="item.cover"
            class="flex flex-shrink-0 w-16 h-12 overflow-hidden mr-4 rounded"
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

          <!-- 标题 -->
          <router-link
            class="flex flex-1 line-clamp-2"
            :title="item.title"
            :to="item.path"
          >
            <h2 class="text-base">{{ item.title }}</h2>
          </router-link>
          <!-- 标题 -->
        </li>
      </ul>
    </section>
    <!-- 猜你喜欢 -->
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, RouteRecordRaw, useRoute } from 'vue-router'
import isArticle from '/@libs/isArticle'
import shuffle from '/@libs/shuffle'

interface List {
  path: string,
  title: string,
  cover: string
}

export default defineComponent({
  setup () {
    const activeRoute = useRoute();
    const router = useRouter();
    const articleList = ref<List[]>([]);
    const count: number = 10;

    /** 
     * 获取文章列表
     */
    const getArticleList = (): void => {
      // 提取文章详情页的路由并按日期排序，同时不能和当前文章重复
      const routes = router.getRoutes()
        .filter( (route: RouteRecordRaw) => isArticle(route) && route.path !== activeRoute.path );

      // 提取要用到的字段
      articleList.value = shuffle(routes).map( (route: RouteRecordRaw) => {
        const { path } = route;
        const { frontmatter } = route.meta;
        const { title, description, cover, date } = frontmatter;
        
        return {
          path,
          title,
          cover
        }
      });

      // 不超过渲染上限
      if ( articleList.value.length > count ) {
        articleList.value.length = count;
      }
      
    }

    onMounted(getArticleList);
    
    return {
      // 数据
      articleList,

      // 方法
      getArticleList
    }
  }
})
</script>

<style lang="postcss" scoped>
.article-sidebar {
  width: 340px;
}
.block-title {
  @apply text-xl font-bold mb-4 pb-4 border-b dark:border-white dark:border-opacity-5;
}
</style>