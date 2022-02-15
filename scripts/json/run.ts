import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'
import dayjs from 'dayjs'
import { outDirRoot, author } from './config'
import { writePagination, writeCategory, writePost } from './write'
import type { PostItem, PostDetail } from './types'
import type { Frontmatter } from '../../src/types'

/**
 * 运行程序
 * @param type - 写入类型， article=博客文章， cookbook=菜谱
 */
export default async function run(type: string) {
  // 提前创建文件夹
  fs.mkdirpSync(`${outDirRoot}/${type}/list/default`)
  fs.mkdirpSync(`${outDirRoot}/${type}/detail`)

  // 解析 Markdown 文件内容
  const markdown = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })

  const files = await fg(`src/views/${type}/*.md`)
  const posts: PostItem[] = (
    await Promise.all(
      files
        .filter((i) => !i.includes('index'))
        .map(async (i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)
          data.date = dayjs(data.date).format('YYYY-MM-DD HH:mm:ss')

          // 写入内容文件
          const regexp: RegExp = new RegExp(`src/views/${type}/(.*).md`)
          const id = i.replace(regexp, '$1')
          const html: string = markdown.render(content)
          const shortDate = dayjs(data.date).format('YYYY-MM-DD')

          // 写入详情内容
          const post: PostDetail = {
            id,
            author,
            shortDate,
            ...(data as PostItem),
            content: html,
          }
          await writePost({
            type,
            post,
          })

          // 返回给列表
          return {
            id,
            shortDate,
            ...(data as Frontmatter),
          }
        })
    )
  ).filter(Boolean)

  // 列表都按日期倒序排列
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  // 写入不分页的数据
  const res = {
    author,
    total: posts.length,
    page: 1,
    lastPage: 1,
    category: 'all',
    data: posts,
  }
  await fs.writeFile(
    `${outDirRoot}/${type}/list/all.json`,
    JSON.stringify(res, null, 2),
    'utf-8'
  )

  // 写入全部分页数据
  writePagination({
    type,
    category: 'default',
    posts,
  })

  // 根据分类写入分页数据
  writeCategory({
    type,
    posts,
  })
}
