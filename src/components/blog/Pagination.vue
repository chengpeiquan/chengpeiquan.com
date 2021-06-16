<template>
  <section class="flex justify-center items-center md:text-base text-sm">
    <!-- 第一页 -->
    <div class="mx-4">
      <router-link
        v-if="page > 1"
        :to="{
          name: routeName,
        }"
      >
        First
      </router-link>
      <span class="opacity-50" v-else>First</span>
    </div>
    <!-- 第一页 -->

    <!-- 上一页 -->
    <div class="mx-4">
      <router-link
        v-if="page === 2"
        :to="{
          name: routeName,
        }"
      >
        Prev
      </router-link>
      <router-link
        v-else-if="page > 2"
        :to="{
          name: routeName,
          params: {
            page: page - 1,
          },
        }"
      >
        Prev
      </router-link>
      <span class="opacity-50" v-else>Prev</span>
    </div>
    <!-- 上一页 -->

    <!-- 下一页 -->
    <div class="mx-4">
      <router-link
        v-if="page < pageTotal"
        :to="{
          name: routeName,
          params: {
            page: page + 1,
          },
        }"
      >
        Next
      </router-link>
      <span class="opacity-50" v-else>Next</span>
    </div>
    <!-- 下一页 -->

    <!-- 下一页 -->
    <div class="mx-4">
      <router-link
        v-if="page < pageTotal"
        :to="{
          name: routeName,
          params: {
            page: pageTotal,
          },
        }"
      >
        Last
      </router-link>
      <span class="opacity-50" v-else>Last</span>
    </div>
    <!-- 下一页 -->
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  routeName: String,
  page: Number,
  pageTotal: Number,
})
</script>

<style scoped></style>
