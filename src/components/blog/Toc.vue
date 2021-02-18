<template>
  <div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";


const toc: any = reactive([]);
const nodeNames: string[] = [ 'H2', 'H3' ];

const getToc = (): void | boolean => {
  // 重置目录
  toc.length = 0;

  const nodeList: any = [];

  // 获取h2
  const article: HTMLElement = document.querySelector('.article-detail');
  const children: HTMLElement[] = [...article.children];
  console.log(children);

  children.forEach( (child: HTMLElement) => {
    // 过滤非白名单标签
    if ( !nodeNames.includes(child.nodeName) ) {
      return false;
    }

    const item: any = {
      id: child.getAttribute('id'),
      tag: child.nodeName
    };

    nodeList.push(item);

  })
  console.log(nodeList);
  
  // const h2List: HTMLElement[] = article.querySelectorAll('h2');

  // // 拿不到就结束了
  // if ( h2List.length === 0 ) {
  //   return false;
  // }

  // // 提取需要的信息
  // h2List.forEach( (h2: HTMLElement) => {
  //   const item = {};

  //   const text: string = h2.getAttribute('id') || h2.getAttribute('name');
  //   item['text'] = text;
    
  //   console.log(item);
  // })
}

onMounted(getToc);
</script>

<style scoped>
</style>