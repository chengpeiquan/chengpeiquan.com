import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fs } from '@bassist/node-utils'
import sharp from 'sharp'
import { rgbaToThumbHash } from 'thumbhash'
import {
  CacheFolder,
  type ThumbHashFileName,
  cacheRootFolder,
  getThumbHashCacheMapKey,
} from '@/config/cache-config'
import { tattooImages } from '@/config/tattoo-config'

const cacheRootPath = join(process.cwd(), 'src', cacheRootFolder)
const thumbHashCacheRootPath = join(cacheRootPath, CacheFolder.ThumbHash)

interface TaskOptions {
  fileName: ThumbHashFileName
  images: string[]
}

class CacheTask {
  constructor(private opts: TaskOptions) {}

  public async run() {
    const mapping: Record<string, string> = {}

    // Prevent async map from causing order changes,
    // resulting in git diff for each build
    const keys = this.opts.images
      .map(getThumbHashCacheMapKey)
      .filter(Boolean)
      .sort()

    for (const key of keys) {
      const image = this.opts.images.find(
        (img) => getThumbHashCacheMapKey(img) === key,
      )

      if (image) {
        const hash = await this.imgUrlToThumbHash(image)
        if (hash) {
          mapping[key] = hash
        }
      }
    }

    const data = JSON.stringify(mapping, null, 2)
    await this.writeCache(thumbHashCacheRootPath, data)
  }

  private async imgUrlToThumbHash(imageUrl: string) {
    try {
      // All CDN images, no local images
      const res = await fetch(imageUrl)
      const arrayBuffer = await res.arrayBuffer()
      const imageBuffer = Buffer.from(arrayBuffer)

      // ThumbHash recommends that images should not exceed 100x100
      const { data, info } = await sharp(imageBuffer)
        .resize(100, 100, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

      const thumbHashUint8Array = rgbaToThumbHash(info.width, info.height, data)
      return Buffer.from(thumbHashUint8Array).toString('base64')
    } catch (err) {
      console.error(`Error generating ThumbHash for ${imageUrl}:`, err)
      return ''
    }
  }

  private async writeCache(rootPath: string, data: string) {
    const fileName = `${this.opts.fileName}.json`
    const filePath = join(rootPath, fileName)

    const isExist = await fs.exists(rootPath)
    if (!isExist) {
      await fs.mkdirp(rootPath)
    }

    await writeFile(filePath, data)
  }
}

const run = async () => {
  const options: TaskOptions = {
    fileName: 'tattoo',
    images: tattooImages,
  }
  const task = new CacheTask(options)
  await task.run()
}

run().catch(console.error)
