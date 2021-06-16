<template>
  <header
    class="
      flex
      justify-between
      items-center
      w-full
      md:h-24
      h-14
      px-4
      border-b-4
      dark:border-white dark:border-opacity-5 dark:bg-white
      bg-gray-50
      dark:bg-opacity-5
    "
  >
    <!-- 站点信息 -->
    <div class="flex justify-start items-center">
      <div
        class="
          flex flex-shrink-0
          md:w-14
          w-8
          md:h-14
          h-8
          rounded-full
          overflow-hidden
        "
      >
        <img
          class="img"
          width="56"
          height="56"
          src="https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/avatar-60x60.jpg"
          :alt="name"
        />
      </div>
      <span class="md:ml-4 ml-2 md:text-2xl text-l dark:text-white text-black">
        {{ name }}
      </span>
    </div>
    <!-- 站点信息 -->

    <!-- 站点导航 - 移动端 -->
    <nav
      v-if="isMobile"
      class="nav flex flex-1 justify-end items-center text-xl"
    >
      <!-- 主导航按钮 -->
      <a class="select-none mr-4" @click="toggleMenu">
        <ri-menu-fill v-show="!isShowMenu" />
        <ri-close-fill v-show="isShowMenu" />
      </a>

      <ToggleLang />

      <ToggleTheme />
      <!-- 主导航按钮 -->

      <!-- 下拉菜单 -->
      <ul
        class="
          absolute
          top-14
          left-0
          flex flex-wrap
          w-full
          bg-gray-50
          dark:bg-black
          border-b-4
          dark:border-white dark:border-opacity-5
          box-border
          px-4
          z-10
        "
        v-if="isShowMenu"
      >
        <li
          v-for="(item, index) in navList"
          :key="index"
          class="flex items-center w-1/3 h-14 text-base"
        >
          <router-link :to="item.target" :title="item.text" exact>
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <!-- 下拉菜单 -->
    </nav>
    <!-- 站点导航 - 移动端 -->

    <!-- 站点导航 - 电脑版 -->
    <nav v-else class="nav flex flex-1">
      <ul class="flex justify-end items-center w-full">
        <li v-for="(item, index) in navList" :key="index" class="mr-8 text-xl">
          <router-link :to="item.target" :title="item.text" exact>
            {{ item.text }}
          </router-link>
        </li>
        <li>
          <a
            class="select-none mr-4 text-xl"
            href="https://github.com/chengpeiquan"
            target="_blank"
            title="GitHub"
            rel="nofollow noopener noreferrer"
          >
            <ri-github-fill />
          </a>
        </li>
        <li v-if="lang === defaultLang">
          <a
            class="select-none mr-4 text-xl"
            href="https://www.zhihu.com/people/basss"
            target="_blank"
            title="知乎"
            rel="nofollow noopener noreferrer"
          >
            <ri-zhihu-fill />
          </a>
        </li>
        <li v-else>
          <a
            class="select-none mr-4 text-xl"
            href="https://twitter.com/chengpeiquan"
            target="_blank"
            title="Twitter"
            rel="nofollow noopener noreferrer"
          >
            <ri-twitter-fill />
          </a>
        </li>
        <li>
          <a
            class="select-none mr-4 text-xl"
            href="/feed.xml"
            target="_blank"
            title="RSS"
            rel="nofollow noopener noreferrer"
          >
            <ri-rss-fill />
          </a>
        </li>
        <li>
          <ToggleLang />
        </li>
        <li>
          <ToggleTheme />
        </li>
      </ul>
    </nav>
    <!-- 站点导航 - 电脑版 -->
  </header>
</template>

<script setup lang="ts">
import { ref, inject, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import isDark from '/@libs/isDark'
import isMobile from '/@libs/isMobile'
import config from '/@/config'

interface NavList {
  path: string
  text: string
}
const navList = ref<NavList>([])

// 获取多语言内容
const { defaultLang } = config
const name = ref<string>('')
const lang: string = inject('lang') || ''

const getI18n = (): void => {
  const key: string = lang.value

  name.value = config.i18n[key].name

  navList.value = [
    {
      target: key === defaultLang ? '/' : `/${key}`,
      text: 'Home',
    },
    {
      target: key === defaultLang ? '/article' : `/${key}/article`,
      text: 'Article',
    },
    {
      target: key === defaultLang ? '/about' : `/${key}/about`,
      text: 'About',
    },
  ]
}
watchEffect(getI18n)

// 移动端菜单开关
const isShowMenu = ref<boolean>(false)
const toggleMenu = (): void => {
  isShowMenu.value = !isShowMenu.value
}

// 移动端切换路由后关闭菜单
const router = useRouter()
router.afterEach(() => {
  isShowMenu.value = false
})
</script>

<style lang="postcss" scoped>
.nav a {
  display: flex;
  align-items: center;
  opacity: 0.7;
  text-decoration: none;
  transition: opacity 0.2s ease;

  svg {
    margin-right: calc(var(--margin) / 4);
  }

  &.router-link-active,
  &:hover {
    opacity: 1;
    text-decoration-color: inherit;
  }
}
</style>
