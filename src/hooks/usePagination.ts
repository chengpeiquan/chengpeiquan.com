import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useList } from '@/hooks'

export function usePagination({
  pageType,
  pageSize,
}: {
  pageType: string
  pageSize?: number
}) {
  const route = useRoute()
  const router = useRouter()
  const { routeList } = useList(pageType)
  const state = reactive({
    page: 1,
    pageSize: typeof pageSize === 'number' ? pageSize : 10,
    lastPage: 1,
    total: 0,
  })

  /**
   * 初始化翻页数据
   */
  const init = (): void => {
    state.total = routeList.value.length
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
            page: --state.page,
          }
        }
        break
      }
      // 下一页
      case 'next': {
        opt['params'] = {
          page: ++state.page,
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
