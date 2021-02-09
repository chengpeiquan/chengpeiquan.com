<template>
  <div>
    Article List
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'
import { formatDate } from '/@libs/logics'

export default defineComponent({
  setup () {
    const router = useRouter();
    const articleList = ref<any[]>([]);

    /** 
     * 判断是否文章页
     */
    const isArticle = (route: RouteRecordRaw): boolean => {
      return route.path.startsWith('/article') && route.path.endsWith('.html');
    }

    /** 
     * 获取文章列表
     */
    const getArticleList = (): void => {
      const routes = router.getRoutes();
      const articleRoutes: RouteRecordRaw[] = routes.filter( (route: RouteRecordRaw) => isArticle(route) && route.meta.frontmatter.date);

      articleList.value = articleRoutes.sort( (a, b) => {
        return +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
      });

      console.log(articleList.value);
      

    }

    onMounted(getArticleList);

    return {}
  }
})
</script>

<style scoped>

</style>