import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import 'dayjs/locale/zh-cn.js'

dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default dayjs
