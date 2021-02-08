<template>
  <header class="flex justify-between items-center w-full sm:h-20 h-14 sm:px-4 px-2">
    <!-- 站点信息 -->
    <div class="flex justify-start items-center">
      <div
        class="
          flex flex-shrink-0
          sm:w-12 w-10
          sm:h-12 h-10
          rounded-full
          overflow-hidden
        "
      >
        <img
          class="img"
          :src="logo"
          alt="程沛权"
        >
      </div>
      <span class="sm:ml-4 ml-2 sm:text-xl text-l">程沛权</span>
    </div>
    <!-- 站点信息 -->

    <!-- 站点导航 -->
    <nav class="nav flex flex-1 justify-end items-center">
      <router-link
        v-for="(item, index) in navList"
        :key="index"
        class="sm:mr-8 mr-3"
        :to="item.path"
        exact
      >
        {{ item.text }}
      </router-link>

      <toggle-theme />
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
    path: '/',
    text: 'Home'
  },
  {
    path: '/about',
    text: 'About'
  }
];
</script>

<style lang="postcss" scoped>
.nav a {
  opacity: 0.7;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
    text-decoration-color: inherit;
  }
}
</style>