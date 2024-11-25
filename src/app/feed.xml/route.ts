import message from '@/i18n/messages/zh.json'
import { type Author, Feed, type Item as FeedItem } from 'feed'
import { siteConfig } from '@/config/site-config'
import { ContentFolder } from '@/config/content-config'
import { getContents } from '@/core/io'
import { ContentProcessorMode } from '@/core/types'

const folder = ContentFolder.Article

const author: Author = {
  name: message.siteConfig.name,
  email: siteConfig.email,
  link: siteConfig.author.url as string,
}

export async function GET() {
  const feed = new Feed({
    title: message.siteConfig.title,
    description: message.siteConfig.description,
    id: `${author.link}/`,
    link: `${author.link}/`,
    image: `${author.link}/avatar-256x256.png`,
    favicon: `${author.link}/favicon.ico`,
    copyright: `© 2014-PRESENT ${author.name}`,
    feedLinks: {
      rss: `${author.link}/feed.xml`,
    },
    author,
  })

  const articles = await getContents(folder, {
    locale: 'zh',
    page: 1,
    pageSize: 20,
    ignoreDetails: false,
    mode: ContentProcessorMode.HtmlOnly,
  })

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

  return new Response(feed.rss2(), {
    headers: {
      'content-type': 'application/xml',
    },
  })
}
