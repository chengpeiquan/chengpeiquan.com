import { getContentCache } from '@/cache/content-cache'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('-----')
    console.log(body)
    console.log('-----')

    const { folder, locale } = body

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
