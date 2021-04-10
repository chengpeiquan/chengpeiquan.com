<template>
  <section
    v-if="childrenList.length > 0 && !isMobile"
    class="children-list md:w-2/4 w-full mt-8"
  >
    <ul class="flex flex-wrap flex-col justify-between w-full">
      <li
        class="flex w-full h-60 border-b dark:border-white dark:border-opacity-5"
        v-for="(item, index) in childrenList"
        :key="index"
      >
        <!-- 照片 -->
        <div class="w-3/12 h-full mr-4">
          <img
            class="w-full h-full object-cover"
            :src="item.photo"
            :alt="item.name"
          >
        </div>
        <!-- 照片 -->

        <!-- 孩子信息 -->
        <div class="flex flex-1 flex-col justify-between">
          <p class="flex w-full">
            <span class="flex w-2/6"><strong>姓名：</strong>{{ item.name }}</span>
            <span class="flex w-2/6"><strong>性别：</strong>{{ item.gender }}</span>
            <span class="flex justify-end w-2/6">
              <a :href="item.url" target="_blank">查看详情</a>
            </span>
          </p>
          <p class="w-full">
            <span class="mr-16"><strong>出生日期：</strong>{{ item.birthday }}</span>
          </p>
          <p class="w-full">
            <span class="mr-16"><strong>失踪时间：</strong>{{ item.missingDate }}</span>
          </p>
          <p class="w-full">
            <span class="mr-16"><strong>失踪地点：</strong>{{ item.missingPlace }}</span>
          </p>
          <p class="w-full line-clamp-2">
            <span class="mr-16"><strong>特征：</strong>{{ item.feature }}</span>
          </p>
        </div>
        <!-- 孩子信息 -->
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import isMobile from '/@libs/isMobile'

interface Children {
  id: number;
  name: string;
  gender: string;
  birthday: string;
  missingDate: string;
  missingPlace: string;
  photo: string;
  feature: string;
  url: string;
}

const childrenList = ref<Children[]>([]);

const getChildrenList = (): void => {
  // https://chengpeiquan.com/api/searchChildren
  fetch('/api/searchChildren')
    .then( res => res.json() )
    .then( data => childrenList.value = data.slice(0, 3) )
    .catch( err => console.log(err) );
}

onMounted(getChildrenList);
</script>

<style lang="postcss" scoped>
.children-list {
  ul {
    margin: 0;
  }
  
  li {
    padding-left: 0;
    padding-bottom: 1.5em;
    margin-bottom: 1em;

    &::before {
      display: none;
    }

    &:last-child {
      border: 0;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    img {
      margin: 0;
    }

    p {
      margin: 0;
    }
  }
}
</style>