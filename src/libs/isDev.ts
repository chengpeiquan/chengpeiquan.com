/**
 * 判断是否开发环境
 */
const isDev: boolean = process.env.NODE_ENV === 'development' ? true : false
export default isDev
