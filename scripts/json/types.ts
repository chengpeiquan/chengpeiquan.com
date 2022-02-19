import type { Frontmatter } from '../../src/types'

/**
 * 作者信息
 */
export interface Author {
  name: string
  email: string
  link: string
}

/**
 * 帖子的 Matter 信息
 * @param id - 帖子 id ，由文件名决定
 * @param shortDate - 简短的日期，YYYY-MM-DD
 */
export interface PostItem extends Frontmatter {
  id: string
  type: string
  shortDate: string
}

/**
 * 帖子详情
 * @param author - 作者信息
 * @param content - 帖子的 HTML 内容
 */
export interface PostDetail extends PostItem {
  author: Author
  content: string
}

/**
 * 写入分类的选项
 * @param type - 类型， article=博客文章， cookbook=菜谱
 * @param posts - 帖子列表
 */
export interface WriteCategoryOptions {
  type: string
  posts: PostItem[]
}

/**
 * 写入分页的选项
 * @param category - 分类的 path 选项，详见 src/router 里的配置
 */
export interface WritePaginationOptions extends WriteCategoryOptions {
  category: string
}

/**
 * 写入帖子的选项
 * @param type - 类型， article=博客文章， cookbook=菜谱
 * @param post - 帖子详情数据
 */
export interface WritePostOptions {
  type: string
  post: PostDetail
}
