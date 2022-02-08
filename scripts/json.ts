import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'
import toc from 'markdown-it-table-of-contents'
import dayjs from 'dayjs'
import { categoryConfigList } from '../src/router/cookbook'
import type { Frontmatter } from '../src/types'

interface PostItem extends Frontmatter {
  id: string
}

const outDir = './dist/assets/json/cookbook'
fs.mkdirpSync(`${outDir}/list/all`)
fs.mkdirpSync(`${outDir}/detail`)

const author = {
  name: 'chengpeiquan',
  email: 'chengpeiquan@chengpeiquan.com',
  link: 'https://chengpeiquan.com',
}

/**
 * 写入分类信息
 */
async function writeCategory(posts: PostItem[]) {
  const res = categoryConfigList.map((i) => {
    // 创建存放分类分页数据的文件夹
    fs.mkdirpSync(`${outDir}/list/${i.path}`)

    // 筛选分类下的内容，写入分类的分页列表
    const _posts = posts.filter((p) => p.categories.includes(i.path))
    writePagination(i.path, _posts)

    return {
      id: i.path,
      name: i.text.zh,
    }
  })

  res.unshift({
    id: 'all',
    name: '全部',
  })

  // 生成分类JSON
  await fs.writeFile(
    `${outDir}/list/category.json`,
    JSON.stringify(res, null, 2),
    'utf-8'
  )
}

/**
 * 写入分页列表
 */
async function writePagination(category: string, posts: PostItem[]) {
  const pageSize = 10
  let page = 1
  let lastPage = Math.round(posts.length / pageSize)
  let start = 0
  let end = start + pageSize
  async function write() {
    const data = []
    for (let i = start; i < end; i++) {
      posts[i] && data.push(posts[i])
    }

    // 分页内容
    const res = {
      author,
      total: posts.length,
      page,
      lastPage,
      category,
      data,
    }

    // 写入分页数据
    await fs.writeFile(
      `${outDir}/list/${category}/${page}.json`,
      JSON.stringify(res, null, 2),
      'utf-8'
    )

    // 存储下一个分页
    if (end < posts.length) {
      start = end
      end = start + pageSize
      page++
      write()
    }
  }
  write()
}

/**
 * 运行程序
 */
async function run() {
  const markdown = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
  markdown.use(toc, {
    includeLevel: [2, 3, 4],
    containerClass: 'article-toc prose',
    slugify: (s: string) =>
      encodeURIComponent(
        String(s)
          .trim()
          .toLowerCase()
          .replace(/\s+|\.+/g, '-')
      ),
  })

  const files = await fg('src/views/cookbook/*.md')

  const posts: PostItem[] = (
    await Promise.all(
      files
        .filter((i) => !i.includes('index'))
        .map(async (i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)
          data.date = dayjs(data.date).format('YYYY-MM-DD HH:mm:ss')

          // 写入内容文件
          const id = i.replace(/src\/views\/cookbook\/(.*)\.md/, '$1')
          const html: string = markdown.render(content)
          const res = {
            id,
            author,
            ...data,
            content: html,
          }
          await fs.writeFile(
            `${outDir}/detail/${id}.json`,
            JSON.stringify(res, null, 2),
            'utf-8'
          )

          // 返回给列表
          return {
            id,
            ...(data as Frontmatter),
          }
        })
    )
  ).filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  // 写入全部分页数据
  writePagination('all', posts)

  // 根据分类写入分页数据
  writeCategory(posts)
}
run()
