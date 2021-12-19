import { reactive, ref, toRefs } from 'vue'
import { useList } from '@/hooks'
import type { RouteRecordRaw } from 'vue-router'

export function usePagination({
  type,
  categoryPath,
  lang,
}: {
  type: string
  categoryPath: string
  lang: string
}) {
  const { getRouteList, getCategoryList, getArticleList } = useList({
    type,
    categoryPath,
  })

  const state = reactive({
    page: 1,
    pageSize: 10,
    lastPage: 1,
    total: 0,
  })

  const routeList: RouteRecordRaw[] = getRouteList()
  state.total = routeList.length
  state.lastPage = Math.ceil(state.total / state.pageSize)

  return {
    ...toRefs(state),
  }
}
