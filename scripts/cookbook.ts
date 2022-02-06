import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'
import toc from 'markdown-it-table-of-contents'
import implicitFigures from 'markdown-it-implicit-figures'
import dayjs from 'dayjs'

const isExist: boolean = fs.existsSync('dist')
if (!isExist) {
  fs.mkdirSync('dist')
}

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
  markdown.use(implicitFigures, {
    figcaption: true,
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
          const html = markdown.render(content)

          return {
            ...data,
            content: html,
          }
        })
    )
  ).filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const res = {
    author: {
      name: 'chengpeiquan',
      email: 'chengpeiquan@chengpeiquan.com',
      link: 'https://chengpeiquan.com',
    },
    data: posts,
  }

  await fs.writeFile(
    './dist/cookbook.json',
    JSON.stringify(res, null, 2),
    'utf-8'
  )
}

run()
