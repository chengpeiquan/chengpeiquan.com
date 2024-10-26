import { resolve } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { type Author, Feed, type Item as FeedItem } from 'feed'
import { checkTargetDirExists, getPosts, publicDirs } from './shared'
import { sideConfig } from '@/config/site-config'
import { ContentFolder } from '@/config/content-config'
import message from '@/i18n/messages/zh.json'

const folder = ContentFolder.Article

const author: Author = {
  name: message.siteConfig.name,
  email: sideConfig.email,
  link: sideConfig.author.url as string,
}

const run = async () => {
  const feed = new Feed({
    title: message.siteConfig.title,
    description: message.siteConfig.description,
    id: `${author.link}/`,
    link: `${author.link}/`,
    image: `${author.link}/avatar-256x256.png`,
    favicon: `${author.link}/favicon.ico`,
    copyright: `© 2014-PRESENT ${author.name}`,
    feedLinks: {
      json: `${author.link}/feed.json`,
      atom: `${author.link}/feed.atom`,
      rss: `${author.link}/feed.xml`,
    },
    author,
  })

  const articles = await getPosts(folder)
  const posts = articles.items.map<FeedItem>((i) => {
    return {
      title: i.metadata.title,
      content: i.html,
      link: `${author.link}/${folder}/${i.slug}`,
      date: new Date(i.metadata.timestamp),
      author: [author],
    }
  })

  posts.forEach((i) => feed.addItem(i))

  await checkTargetDirExists()

  const artifacts = {
    xml: feed.rss2,
    atom: feed.atom1,
    json: feed.json1,
  } as const

  await Promise.all(
    Object.entries(artifacts).map(async ([ext, fn]) => {
      await writeFile(
        resolve(publicDirs.target, `./feed.${ext}`),
        fn(),
        'utf-8',
      )
    }),
  )
}

run().catch((e) => {
  console.log(e)
})
