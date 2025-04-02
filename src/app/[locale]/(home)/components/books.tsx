import { Card } from 'blackwork'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { type PropsWithLocale } from '@/config/route-config'
import { SectionContainer, SectionTitle } from './shared-widgets'

interface Book {
  id: string
  cover: string
  title: string
  description: string
  buyLinks: {
    title: string
    url: string
  }[]
}

type BooksProps = PropsWithLocale

export const Books = async ({ locale }: BooksProps) => {
  const t = await getTranslations({
    locale,
    namespace: 'projectConfig',
  })

  const books: Book[] = [
    {
      id: 'book-1',
      cover: '/images/books/book1.jpg',
      title: t('book1.title'),
      description: t('book1.description'),
      buyLinks: [
        {
          title: '京东',
          url: 'https://example.com/jd',
        },
        {
          title: '当当',
          url: 'https://example.com/dangdang',
        },
      ],
    },
    // 可以添加更多书籍
  ]

  return (
    <SectionContainer>
      <SectionTitle title={t('title')} description={t('description')} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {books.map((book) => (
          <Card key={book.id} className="p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              {/* 书籍封面 */}
              <div className="relative h-64 w-48">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* 书籍信息 */}
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-bold">{book.title}</h3>
                <p className="text-muted-foreground mb-4">{book.description}</p>

                {/* 购买链接 */}
                <div className="flex gap-4">
                  {book.buyLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionContainer>
  )
}
