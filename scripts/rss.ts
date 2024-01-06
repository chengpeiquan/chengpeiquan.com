import fg from 'fast-glob'
import fs from '@withtypes/fs-extra'
import matter from 'gray-matter'
import markdownIt from '@withtypes/markdown-it'
import { Feed } from 'feed'
import { author } from './json/config'

const isExist: boolean = fs.existsSync('dist')
if (!isExist) {
  fs.mkdirSync('dist')
}

function getLink(file: string) {
  return file.replace('src/views', author.link).replace('.md', '.html')
}

async function run() {
  const markdown = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })

  const files = [
    ...(await fg('src/views/article/*.md')),
    ...(await fg('src/views/en/article/*.md')),
  ]

  const posts: any[] = (
    await Promise.all(
      files
        .filter((i) => !i.includes('index'))
        .map(async (i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)
          const html = markdown.render(content)
          const link = getLink(i)

          return {
            ...data,
            link,
            content: html,
            author: [{ ...author }],
          }
        })
    )
  ).filter((i) => !(i as any).isDraft)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const feed = new Feed({
    title: '程沛权 - 养了三只猫',
    description: '一个养了三只猫的花臂男。',
    id: `${author.link}/`,
    link: `${author.link}/`,
    image: `${author.link}/avatar-256x256.png`,
    favicon: `${author.link}/favicon.ico`,
    copyright: '© 2021-PRESENT 程沛权',
    feedLinks: {
      json: `${author.link}/feed.json`,
      atom: `${author.link}/feed.atom`,
      rss: `${author.link}/feed.xml`,
    },
    author,
  })

  posts.forEach((i) => feed.addItem(i))

  await fs.writeFile('./dist/feed.xml', feed.rss2(), 'utf-8')
  await fs.writeFile('./dist/feed.atom', feed.atom1(), 'utf-8')
  await fs.writeFile('./dist/feed.json', feed.json1(), 'utf-8')
}

run()
