<template>
  <hr v-if="childrenList.length > 0 && !isMobile">

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
import isDev from '/@libs/isDev'
import isMobile from '/@libs/isMobile'

interface Children {
  id?: number;
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
  fetch(`/api/searchChildren?time=${Date.now()}`)
    .then( res => res.json() )
    .then( data => childrenList.value = data.slice(0, 3) )
    .catch( err => console.log(err) );
}

onMounted(() => {
  if ( isDev ) {
    childrenList.value = [{ "id": 464495, "name": "李一征", "gender": "女", "birthday": "2005年03月27日", "missingDate": "2020年03月03日", "missingPlace": "山西省阳泉市城区南外环路义北小区", "photo": "https://qzonestyle.gtimg.cn/qzone/v6/portal/gy/404/upload/20200521/0_fa3dddbf2771e868016586e4e98112ba.jpg", "feature": "性格内向，微胖。上身穿黑色长褂牛仔衣，下身穿黑色长牛子裤，口戴绿色口罩，口罩上带有爱心，白色鞋子上有英文字母。", "url": "https://bbs.baobeihuijia.com/forum.php?mod=viewthread&tid=477907&extra=page=12&filter=author&orderby=dateline" }, { "id": 471694, "name": "肖坤", "gender": "男", "birthday": "2005年06月08日", "missingDate": "2020年03月27日", "missingPlace": "湖南省衡阳市祁东县马杜桥乡", "photo": "https://qzonestyle.gtimg.cn/qzone/v6/portal/gy/404/upload/20200521/0_33e5ab57eae7bfb8b0e398d64bea36c4.jpg", "feature": "脸部位有少许的白斑、脸上有青春痘、大眼睛、2个头旋、内向性格不善与人沟通。湖南祁东方言、略带有长沙口音的普通话。身穿蓝色棉衣、黑色校服裤子（外侧带有白色条纹）黑色运动鞋", "url": "https://bbs.baobeihuijia.com/forum.php?mod=viewthread&tid=480758&extra=page=7&filter=author&orderby=dateline" }, { "id": 443318, "name": "陈若雯", "gender": "女", "birthday": "2007年02月02日", "missingDate": "2019年11月22日", "missingPlace": "山东省枣庄市", "photo": "https://qzonestyle.gtimg.cn/qzone/v6/portal/gy/404/upload/20200521/0_f5909df034c4987879358924db369d15.jpg", "feature": "体型偏胖、脖子有两三道颈纹、披肩长发。枣庄市地方口音。身穿豹纹外套（下面图片中的衣服）、蓝色校裤、豹纹布鞋、黑色书包。", "url": "https://bbs.baobeihuijia.com/forum.php?mod=viewthread&tid=481373&extra=page=6&filter=author&orderby=dateline" }];
  }
  else {
    getChildrenList();
  }
});
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