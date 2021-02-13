<template>
  <header class="flex justify-between items-center w-full md:h-24 h-14 md:px-4 px-2 border-b-4 dark:border-white dark:border-opacity-5 bg-white bg-opacity-5">
    <!-- 站点信息 -->
    <div class="flex justify-start items-center">
      <div class="flex flex-shrink-0 md:w-14 w-8 md:h-14 h-8 rounded-full overflow-hidden" >
        <img
          class="img"
          :src="logo"
          alt="程沛权"
        >
      </div>
      <span
        class="
          md:ml-4 ml-2
          md:text-2xl text-l
        "
      >程沛权</span>
    </div>
    <!-- 站点信息 -->

    <!-- 站点导航 -->
    <nav class="nav flex flex-1">
      <ul class="flex justify-end items-center w-full">
        <li
          v-for="(item, index) in navList"
          :key="index"
          class="md:mr-8 mr-3 md:text-xl text-sm"
        >
          <router-link
            v-if="item.isRoute"
            :to="item.target"
            :title="item.text"
            exact
          >
            {{ item.text }}
          </router-link>

          <a
            v-else
            :href="item.target"
            :title="item.text"
            target="_blank"
          >
            {{ item.text }}
          </a>
        </li>
        <li>
          <toggle-theme />
        </li>
      </ul>
    </nav>
    <!-- 站点导航 -->
  </header>
</template>

<script setup lang="ts">
import { isDark } from '/@libs/logics'
import logo from '/@img/logo-min.jpg'

interface NavList {
  path: string,
  text: string
}

const navList: NavList = [
  {
    isRoute: true,
    target: '/',
    text: 'Home'
  },
  {
    isRoute: true,
    target: '/article',
    text: 'Article'
  },
  {
    isRoute: true,
    target: '/about',
    text: 'About'
  },
  {
    isRoute: false,
    target: 'https://github.com/chengpeiquan',
    text: 'GitHub'
  }
];
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