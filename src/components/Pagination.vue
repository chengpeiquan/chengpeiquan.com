<template>
  <section
    class="flex justify-center items-center md:text-base text-sm select-none"
  >
    <!-- 第一页 -->
    <div class="mx-4">
      <a @click="emit('openPage', 'first')" v-if="page > 1">
        {{ first }}
      </a>
      <span class="opacity-50 cursor-not-allowed" v-else>
        {{ first }}
      </span>
    </div>
    <!-- 第一页 -->

    <!-- 上一页 -->
    <div class="mx-4">
      <a @click="emit('openPage', 'prev')" v-if="page > 1">
        {{ prev }}
      </a>
      <span class="opacity-50 cursor-not-allowed" v-else>
        {{ prev }}
      </span>
    </div>
    <!-- 上一页 -->

    <!-- 下一页 -->
    <div class="mx-4">
      <a @click="emit('openPage', 'next')" v-if="page < lastPage">
        {{ next }}
      </a>
      <span class="opacity-50 cursor-not-allowed" v-else>
        {{ next }}
      </span>
    </div>
    <!-- 下一页 -->

    <!-- 下一页 -->
    <div class="mx-4">
      <a @click="emit('openPage', 'last')" v-if="page < lastPage">
        {{ last }}
      </a>
      <span class="opacity-50 cursor-not-allowed" v-else>
        {{ last }}
      </span>
    </div>
    <!-- 下一页 -->
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/hooks'

defineProps<{
  page: number
  lastPage: number
  total: number
}>()
const emit = defineEmits(['openPage'])
const { getText } = useI18n()

const first = getText({
  zh: '首页',
  en: 'First',
})

const prev = getText({
  zh: '上一页',
  en: 'Prev',
})

const next = getText({
  zh: '下一页',
  en: 'Next',
})

const last = getText({
  zh: '末页',
  en: 'Last',
})
</script>

<style scoped></style>
