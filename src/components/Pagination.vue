<template>
  <section class="flex justify-center items-center md:text-base text-sm">
    <!-- 第一页 -->
    <div class="mx-4">
      <a @click="emit('openPage', 'first')" v-if="page > 1">First</a>
      <span class="opacity-50" v-else>First</span>
    </div>
    <!-- 第一页 -->

    <!-- 上一页 -->
    <div class="mx-4">
      <a @click="emit('openPage', 'prev')" v-if="page > 1">Prev</a>
      <span class="opacity-50" v-else>Prev</span>
    </div>
    <!-- 上一页 -->

    <!-- 下一页 -->
    <div class="mx-4">
      <a @click="emit('openPage', 'next')" v-if="page < lastPage">Next</a>
      <span class="opacity-50" v-else>Next</span>
    </div>
    <!-- 下一页 -->

    <!-- 下一页 -->
    <div class="mx-4">
      <a @click="emit('openPage', 'last')" v-if="page < lastPage">Last</a>
      <span class="opacity-50" v-else>Last</span>
    </div>
    <!-- 下一页 -->
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: number
  lastPage: number
  total: number
}>()
const emit = defineEmits(['openPage'])
</script>

<style scoped></style>
