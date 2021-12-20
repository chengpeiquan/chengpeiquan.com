import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useList } from '@/hooks'
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryListInfo } from '@/types'

export function usePagination({ type, categoryPath }: CategoryListInfo) {
  const route = useRoute()
  const router = useRouter()
  const { getRouteList } = useList({
    type,
    categoryPath,
  })
  const state = reactive({
    page: 1,
    pageSize: 1,
    lastPage: 1,
    total: 0,
  })
  const routeList: RouteRecordRaw[] = getRouteList()

  /**
   * 初始化翻页数据
   */
  const init = (): void => {
    state.total = routeList.length
    state.lastPage = Math.ceil(state.total / state.pageSize)

    // 获取页码信息
    if (route.params.page && !isNaN(Number(route.params.page))) {
      state.page = Number(route.params.page)
      if (state.page > state.lastPage) {
        router.replace({
          path: '/404',
        })
      }
    }
    console.log('init', state)
  }
  init()

  /**
   * 打开页面
   */
  const openPage = (target: string): void => {
    const opt: {
      name: string
      params?: {
        page?: number
      }
    } = {
      name: String(route.name),
    }

    // 根据跳转目标传参
    switch (target) {
      // 上一页
      case 'prev': {
        if (state.page > 2) {
          opt['params'] = {
            page: state.page - 1,
          }
        }
        break
      }
      // 下一页
      case 'next': {
        opt['params'] = {
          page: state.page + 1,
        }
        break
      }
      // 末页
      case 'last': {
        opt['params'] = {
          page: state.lastPage,
        }
        break
      }
    }
    console.log('open', state)

    try {
      router.push(opt)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    ...toRefs(state),
    openPage,
  }
}
