/**
 * 格式化图片链接
 * @description APP 端不需要 https ，所以过滤成 http
 * @param html - 原始的内容 HTML 代码
 * @returns 格式化后的 HTML 代码
 */
export function formatImgUrl(html: string): string {
  html = html.replace(/https:\/\/cdn/g, 'http://cdn')
  return html
}

/**
 * 格式化内容
 * @description 内容添加一些显示参数
 * @param html - 原始的内容 HTML 代码
 * @returns 格式化后的 HTML 代码
 */
export function formatContent(html: string): string {
  html = formatImgUrl(html)
  html = html.replace(/image\/interlace,1/g, 'image/interlace,1/resize,w_750')
  return html
}
