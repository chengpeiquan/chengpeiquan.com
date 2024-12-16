import React from 'react'
import Image from 'next/image'
import { Button } from 'blackwork'
import { ExternalLink, Link } from '@/navigation'
import { type linkItem } from '@/config/route-config'
import { SidebarBlock } from '../shared/sidebar-block'

const links: readonly linkItem[] = [
  {
    title: '京东商城',
    href: 'https://union-click.jd.com/jdc?e=jdext-1638352360249409536-0-1&p=JF8BARkJK1olXwQBUVpdAE8SAF8IGVMRXgICV24ZVxNJXF9RXh5UHw0cSgYYXBcIWDoXSQVJQwYAXFpeDEsUHDZNRwYlX1JEIQg5XCt0ZAlqUiVNX0FQACsWTkcbM28BG1kdXAcCU11tCEoWA2sNGFgTXDYyVFttWiXPtdnQvuoJiayNgdbKOEonA2gBGVkdXwEHVFdeAXsXC2s4zfWBiI69je743uG51uK4ztK-ibiEZG5tC3tMVjtBXkcVWgQLVlpeCkwWAGoAHlodWQQFSF9BCHsXAm4KE1gWWgQGOltdCUoVAGoBElh7XwcDVltdDksXAV8IK1glA2gDB1heWkweVgFVQgkdX00BHTBdDUgXAW4OHF8lXwcDVlxtOA',
  },
  {
    title: '天猫商城',
    href: 'https://s.click.taobao.com/t?e=m%3D2%26s%3D7eZPjJt7QJNw4vFB6t2Z2ueEDrYVVa64yK8Cckff7TVRAdhuF14FMXonIcf4DInoMMgx22UI05ZRvxcz%2FoTyBGNojKDSmWQhTIZbYI9jayp8PNk4B98QhUVUjoeWqzb%2B5mzd0fxoCIaFpjofm3hpRhwogYNSK3IrQPZdAhulFAULZMqoQW%2BfuB6GmlJyRiVTGSs8kMDMeyhHJZaVw28y8Wrk5fXXieVy6a%2F%2FENJP36wMyM3sDoIE3myjwLjQ1DptJJn7FkCnT%2F5j0n6UXAgF3v2%2BtTfElYb8RFDRgzhUg%2BSjJnAf507Uv%2BiK7LcQp3KospWd4zfY8zqcEdwGxwkp5JaYzSMEwlxThakdowOjbI2OmjxjH%2BEyQGTWRvaaxnzAXJHdUWjDlfMDnfwHPQnOXiGFCzYOOqAQ&unid=1X3aISuD7B60&union_lens=lensId:TAPI@1683471818@2103de44_0d37_187f6bd6062_8bdf@01',
  },
]

const title = '我出版的书'

export const PublishedBooks: React.FC = () => {
  return (
    <SidebarBlock title={title}>
      <div className="flex flex-col w-full">
        <Link
          href="/article/the-story-of-the-book-learning-vue3"
          target="_blank"
          variant="image"
        >
          <div className="relative w-full aspect-[500/740] rounded-lg overflow-hidden">
            <Image
              src="https://cdn.chengpeiquan.com/img/2023/05/20230508232214.jpg?x-oss-process=image/interlace,1"
              alt={title}
              fill
              sizes="(max-width: 1024px) 256px, (max-width: 1280px) 320px, 384px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Link>

        <div className="flex items-center justify-center w-full">
          {links.map((i) => {
            return (
              <Button key={i.href} variant="link">
                <ExternalLink href={i.href}>{i.title}购买</ExternalLink>
              </Button>
            )
          })}
        </div>
      </div>
    </SidebarBlock>
  )
}
