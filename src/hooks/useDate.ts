import dayjs from '@libs/dayjs'

export function useDate() {
  /**
   * 计算日期的显示
   * @param date - 日期
   * @returns diffDays=距离当前的天数，dateAgo=几天前
   */
  const dateDisplay = (
    date: Date
  ): {
    diffDays: number
    dateAgo: string
  } => {
    // 计算发布日期到今天的日期差
    const nowDate = dayjs(Date.now())
    const createDate = dayjs(+new Date(date))
    const diffDays: number = nowDate.diff(createDate, 'day')

    // 计算日期是当前的X天前
    const dateAgo: string = dayjs(createDate).fromNow()

    return {
      diffDays,
      dateAgo,
    }
  }

  return {
    dateDisplay,
  }
}
