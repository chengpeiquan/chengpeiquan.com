import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { Feed } from 'feed'

async function run() {
  const markdown = MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  const files = await fg('src/views/article/*.md');

  const posts: any[] = (
    await Promise.all(
      files.filter(i => !i.includes('index'))
        .map(async(i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)
          const html = markdown.render(content);

          return {
            ...data,
            content: html,
            author: [
              {
                name: 'chengpeiquan',
                email: 'chengpeiquan@chengpeiquan.com',
                link: 'https://chengpeiquan.com',
              },
            ],
          }
        }),
    ))
    .filter(Boolean);

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const feed = new Feed({
    title: '程沛权 - 养了三只猫',
    description: '一个养了三只猫的花臂男。',
    id: 'https://chengpeiquan.com/',
    link: 'https://chengpeiquan.com/',
    image: 'https://chengpeiquan.com/avatar-256x256.png',
    favicon: 'https://chengpeiquan.com/favicon.ico',
    copyright: '© 2021 程沛权',
    feedLinks: {
      json: 'https://chengpeiquan.com/feed.json',
      atom: 'https://chengpeiquan.com/feed.atom',
      rss: 'https://chengpeiquan.com/feed.xml',
    },
    author: {
      name: 'chengpeiquan',
      email: 'chengpeiquan@chengpeiquan.com',
      link: 'https://chengpeiquan.com',
    },
  })

  posts.forEach(i => feed.addItem(i))

  await fs.writeFile('./dist/feed.xml', feed.rss2(), 'utf-8')
  await fs.writeFile('./dist/feed.atom', feed.atom1(), 'utf-8')
  await fs.writeFile('./dist/feed.json', feed.json1(), 'utf-8')
}

run();