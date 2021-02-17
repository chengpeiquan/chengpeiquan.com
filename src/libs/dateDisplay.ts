/** 
 * 计算一些日期的显示
 */
import dayjs from 'dayjs'

interface Data {
  [key: string]: unknown
}

const dateDisplay = (date: Date): Data => {
  // 计算发布日期到今天的日期差
  const nowDate = dayjs(Date.now());
  const createDate = dayjs(+new Date(date));
  const diffDays: number = nowDate.diff(createDate, 'day');
  
  // 计算日期是当前的X天前
  const dateAgo: string = dayjs(createDate).fromNow();

  return {
    diffDays,
    dateAgo
  }
}

export default dateDisplay;