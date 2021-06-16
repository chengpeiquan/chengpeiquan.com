<template>
  <hr />

  <p v-if="childrenList.length === 0">寻人信息加载中…</p>

  <section
    v-if="childrenList.length > 0 && !isMobile"
    class="children-list md:w-2/4 w-full mt-8"
  >
    <ul class="flex flex-wrap flex-col justify-between w-full">
      <li
        class="
          flex
          w-full
          h-60
          border-b
          dark:border-white dark:border-opacity-5
        "
        v-for="(item, index) in childrenList"
        :key="index"
      >
        <!-- 照片 -->
        <div class="w-44 h-full mr-4">
          <img
            class="w-full h-full object-cover"
            :src="item.photo"
            :alt="item.name"
          />
        </div>
        <!-- 照片 -->

        <!-- 孩子信息 -->
        <div class="flex flex-1 flex-col justify-between">
          <p class="flex w-full">
            <span class="flex w-6/12">
              <strong class="flex flex-shrink-0">姓名：</strong>
              <span
                class="overflow-hidden overflow-ellipsis whitespace-nowrap"
                >{{ item.name }}</span
              >
            </span>

            <span class="flex flex-shrink-0 w-3/12">
              <strong class="flex flex-shrink-0">性别：</strong>
              <span>{{ item.gender }}</span>
            </span>

            <span class="flex flex-shrink-0 justify-end w-3/12">
              <a :href="item.url" target="_blank">查看详情</a>
            </span>
          </p>
          <p class="w-full">
            <span class="mr-16"
              ><strong>出生日期：</strong>{{ item.birthday }}</span
            >
          </p>
          <p class="w-full">
            <span class="mr-16"
              ><strong>失踪时间：</strong>{{ item.missingDate }}</span
            >
          </p>
          <p class="w-full">
            <span class="mr-16"
              ><strong>失踪地点：</strong>{{ item.missingPlace }}</span
            >
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
import isDev from '/@libs/isDev'
import isMobile from '/@libs/isMobile'

interface Children {
  id?: number
  name: string
  gender: string
  birthday: string
  missingDate: string
  missingPlace: string
  photo: string
  feature: string
  url: string
}

const childrenList = ref<Children[]>([])

const getChildrenList = (): void => {
  // https://chengpeiquan.com/api/searchChildren
  fetch(`/api/searchChildren?time=${Date.now()}`)
    .then((res) => res.json())
    .then((data) => (childrenList.value = data.slice(0, 3)))
    .catch((err) => console.log(err))
}

onMounted(() => {
  if (isDev) {
    childrenList.value = [
      {
        photo: 'https://www.baobeihuijia.com/photo/water/water_528467.jpg',
        name: '王小妹（照片是家人）（送养）',
        gender: '女',
        birthday: '1991年04月18日',
        missingDate: '1991年04月30日',
        missingPlace: '河南省,鹤壁市,上城区西爻头村',
        feature: '出生十几天就被抱走了，很瘦小',
        url: 'https://www.baobeihuijia.com/view.aspx?type=1&id=528467',
      },
      {
        photo: 'https://www.baobeihuijia.com/photo/water/water_526589.jpg',
        name: '彭家琪（珠珠）',
        gender: '女',
        birthday: '1953年07月01日',
        missingDate: '1962年06月01日',
        missingPlace: '江西省,南昌市,南昌县向塘火车站',
        feature: '不详',
        url: 'https://www.baobeihuijia.com/view.aspx?type=1&id=526589',
      },
      {
        photo: 'https://www.baobeihuijia.com/photo/water/water_530083.jpg',
        name: '胡鑫灵',
        gender: '男',
        birthday: '2008年03月29日',
        missingDate: '2021年01月22日',
        missingPlace: '河南省,周口市,河南省郸城县钱店镇',
        feature: '右手第二三四根手指一样齐而且没有指甲盖',
        url: 'https://www.baobeihuijia.com/view.aspx?type=1&id=530083',
      },
    ]
  } else {
    getChildrenList()
  }
})
</script>

<style lang="postcss" scoped>
hr {
  margin: 2em auto;
}
.children-list {
  ul {
    margin: 0;
  }

  li {
    padding-left: 0;
    padding-bottom: 1.5em;
    margin-top: 0;
    margin-bottom: 1.5em;

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
