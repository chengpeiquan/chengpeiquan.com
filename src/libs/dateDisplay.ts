/**
 * 计算一些日期的显示
 */
import dayjs from '/@libs/dayjs'

interface DateInfo {
  diffDays: number
  dateAgo: string
}

const dateDisplay = (date: Date): DateInfo => {
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

export default dateDisplay
