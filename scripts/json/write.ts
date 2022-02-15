import fs from 'fs-extra'
import { categoryConfigList } from '../../src/router/cookbook'
import { outDirRoot, author } from './config'
import {
  WritePaginationOptions,
  WriteCategoryOptions,
  WritePostOptions,
} from './types'

/**
 * 写入分页列表
 */
export async function writePagination({
  type,
  category,
  posts,
}: WritePaginationOptions) {
  const pageSize = 10
  let page = 1
  let lastPage = Math.round(posts.length / pageSize)
  let start = 0
  let end = start + pageSize
  async function write() {
    try {
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
        `${outDirRoot}/${type}/list/${category}/${page}.json`,
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
    } catch (e) {
      console.log(e)
    }
  }
  write()
}

/**
 * 写入分类信息
 */
export async function writeCategory({ type, posts }: WriteCategoryOptions) {
  try {
    const res = categoryConfigList.map((i) => {
      // 创建存放分类分页数据的文件夹
      fs.mkdirpSync(`${outDirRoot}/${type}/list/${i.path}`)

      // 筛选分类下的内容，写入分类的分页列表
      const _posts = posts.filter((p) => p.categories.includes(i.path))
      writePagination({
        type,
        category: i.path,
        posts: _posts,
      })

      return {
        id: i.path,
        name: i.text.zh,
        icon: i.icon || '',
      }
    })

    // 生成分类JSON
    await fs.writeFile(
      `${outDirRoot}/${type}/list/category.json`,
      JSON.stringify(res, null, 2),
      'utf-8'
    )
  } catch (e) {
    console.log(e)
  }
}

/**
 * 写入帖子详情
 */
export async function writePost({ type, post }: WritePostOptions) {
  try {
    await fs.writeFile(
      `${outDirRoot}/${type}/detail/${post.id}.json`,
      JSON.stringify(post, null, 2),
      'utf-8'
    )
  } catch (e) {
    console.log(e)
  }
}
