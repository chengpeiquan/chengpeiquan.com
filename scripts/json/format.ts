/**
 * APP 端不需要强制 https 等内容，格式化掉
 * @param html - 原始的内容 HTML 代码
 * @returns 格式化后的 HTML 代码
 */
export function formatContent(html: string): string {
  html = html
    .replace(/https:\/\/cdn/g, 'http://cdn')
    .replace(/image\/interlace,1/g, 'image/interlace,1/resize,w_500')
  return html
}
