import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'
import toc from 'markdown-it-table-of-contents'
import dayjs from 'dayjs'
import { categoryConfigList } from '../src/router/cookbook'

const outDir = './dist/assets/json/cookbook'
fs.mkdirpSync(`${outDir}/page`)
fs.mkdirpSync(`${outDir}/common`)
fs.mkdirpSync(`${outDir}/detail`)

const author = {
  name: 'chengpeiquan',
  email: 'chengpeiquan@chengpeiquan.com',
  link: 'https://chengpeiquan.com',
}

async function writeCategory() {
  const res = categoryConfigList.map((i) => {
    return {
      id: i.path,
      text: i.text.zh,
    }
  })

  await fs.writeFile(
    `${outDir}/common/category.json`,
    JSON.stringify(res, null, 2),
    'utf-8'
  )
}
writeCategory()

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

  const posts: any[] = (
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
            ...data,
          }
        })
    )
  ).filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  /**
   * 分页存储列表
   */
  const pageSize = 10
  let page = 1
  let lastPage = Math.round(posts.length / pageSize)
  let start = 0
  let end = start + pageSize
  async function writePage() {
    const data = []
    for (let i = start; i < end; i++) {
      posts[i] && data.push(posts[i])
    }

    const res = {
      author,
      total: posts.length,
      page,
      lastPage,
      data,
    }

    await fs.writeFile(
      `${outDir}/page/${page}.json`,
      JSON.stringify(res, null, 2),
      'utf-8'
    )

    // 存储下一个分页
    if (end < posts.length) {
      start = end
      end = start + pageSize
      page++
      writePage()
    }
  }
  writePage()
}

run()
