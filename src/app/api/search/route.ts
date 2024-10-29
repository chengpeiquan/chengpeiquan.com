import { getContentCache } from '@/cache/content-cache'
import { type ListFolder } from '@/config/content-config'
import { type Locale } from '@/config/locale-config'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)

    console.log('-----')
    console.log(params)
    console.log('-----')

    const folder = params.get('folder') as ListFolder
    const locale = params.get('locale') as Locale

    const data = await getContentCache(folder, locale)
    console.log('-----')
    console.log(data)
    console.log('-----')

    return Response.json({
      code: 0,
      data,
    })
  } catch (e) {
    console.error(e)

    return Response.json({
      code: 1,
    })
  }
}
