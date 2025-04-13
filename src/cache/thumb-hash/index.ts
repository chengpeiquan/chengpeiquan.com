import { type ThumbHashFileName, type ThumbHashMapping } from "@/config/cache-config"

export const getThumbHashMapping = async (
  fileName: ThumbHashFileName,
): Promise<ThumbHashMapping> => {
  try {
    return (await import(`./${fileName}.json`)).default || {}
  } catch (e) {
    console.error('[getThumbHashMapping]', e)
    return {}
  }
}
