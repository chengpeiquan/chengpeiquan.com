<template>
  <section class="flex flex-1 flex-col">
    <!-- 列表 -->
    <ul class="article-list md:mx-0 mx-4">
      <li
        class="flex flex-col md:pb-8 pb-4 md:mb-8 mb-4 border-b dark:border-white dark:border-opacity-5"
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
          <div class="flex flex-col justify-between">
            <p class="md:h-auto h-0 md:text-base text-sm text-gray-400 md:mb-4 mb-0 md:line-clamp-3 line-clamp-2">
              {{ item.desc }}
            </p>

            <p class="md:text-sm text-xs text-gray-400" :title="item.date.substr(0, 10)">
              {{ item.diffDays > 7 ? item.date.substr(0, 10) : item.dateAgo }}
            </p>
          </div>
          <!-- 信息 -->
        </div>
      </li>
    </ul>
    <!-- 列表 -->

    <!-- 翻页 -->
    <Pagination
      :routeName="articleRouteName"
      :page="page"
      :pageTotal="pageTotal"
    />
    <!-- 翻页 -->
  </section>

  <!-- 侧边栏 -->
  <Sidebar v-if="lang === 'zh-CN'" />
  <!-- 侧边栏 -->
</template>

<script setup lang="ts">
import { reactive, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import isArticle from '/@libs/isArticle'
import { useHead } from '@vueuse/head'
import config from '/@ts/config'
import dateDisplay from '/@libs/dateDisplay'
import isDev from '/@libs/isDev'
import Pagination from '/@cp/blog/Pagination.vue'

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

const route = useRoute();
const router = useRouter();
const routes = ref<unknown[]>([]);
const page = ref<number>(1);
const pageSize = ref<number>(10);
const pageTotal = ref<number>(1);
const articleTotal = ref<number>(1);
const articleList = ref<List[]>([]);
const articleRouteName = ref<string>();
const lang: string = inject('lang') || '';
console.log(route);


/** 
 * 获取文章列表的路由名称
 */
articleRouteName.value = lang.value === 'zh-CN' ? 'article-page' : `${lang.value}-article-page`;

/** 
 * 获取分页信息 
 */
const getPageInfo = (): void => {
  // 提取文章详情页的路由并按日期排序
  routes.value = router.getRoutes()
    .filter( item => {
      // 生产环境用html文件后缀
      const IS_VALID_SUFFIX: boolean = isDev ? !item.path.endsWith('.html') : item.path.endsWith('.html');

      // 获取文章的所属分类
      const { categories } = item.meta.frontmatter;
      console.log(item.name, categories, Array.isArray(categories));
      
      // 判断当前是否分类列表
      const IS_CATEGORY: boolean = route.path.startsWith('/category');

      // 判断文章是否在当前的分类里
      const CATE_NAME = 'aaa'
      const IS_IN_CATEGORY: boolean = Array.isArray(categories) && categories.includes(CATE_NAME);
      // console.log(item.name, IS_CATEGORY, IS_IN_CATEGORY);
      

      // 只提取有效的文章详情页
      return isArticle(item, lang.value) && IS_VALID_SUFFIX;
    })
    .sort( (a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date) );

  // 获取文章总数
  const ROUTES_COUNT: number = routes.value.length;
  articleTotal.value = ROUTES_COUNT;

  // 获取页码总数
  pageTotal.value = Math.ceil( ROUTES_COUNT / pageSize.value);

  // 获取页码信息
  if ( route.params.page && !isNaN(Number(route.params.page)) ) {
    page.value = Number(route.params.page);
    if ( page.value > pageTotal.value ) {
      router.replace({
        path: '/404'
      })
    }
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

  // 提取要用到的字段
  articleList.value = CUR_ROUTES.map( (route: RouteRecordRaw) => {
    const { path } = route;
    const { frontmatter } = route.meta;
    const { title, desc, cover, date } = frontmatter;
    const { diffDays, dateAgo } = dateDisplay(date);
    
    return {
      path,
      title,
      desc,
      cover,
      date,
      diffDays,
      dateAgo
    }
  });
}

/** 
 * 设置页面信息
 */
const { defaultLang } = config;
const WEB_SITE_TITLE: string = lang.value === defaultLang ? '文章列表' : 'Article List';
useHead({
  title: `${WEB_SITE_TITLE} - ${config.i18n[lang.value].title}`,
  meta: [
    { property: 'og:title', content: `${WEB_SITE_TITLE} - 第${page.value}页 - ${config.i18n[lang.value].title}` }
  ],
})

/** 
 * 要执行的函数
 */
getPageInfo();
</script>