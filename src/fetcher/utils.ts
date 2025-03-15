import { type ApiBaseResponse } from './types'

export const toJSON = async <T>(promise: Promise<Response>) => {
  try {
    const response = await promise
    const result: ApiBaseResponse<T> = await response.json()
    return result.data
  } catch (error) {
    console.error(error)
  }
}

// Because metadata has already configured the first-level title,
// the original first-level title is not needed
const removeFirstHeading = (markdown: string) => {
  return markdown.replace(/^# .*\n/, '')
}

const decodeEmoji = (text: string) => {
  try {
    const decoder = new TextDecoder('utf-8')
    const encoded = new Uint8Array([...text].map((char) => char.charCodeAt(0)))
    return decoder.decode(encoded)
  } catch {
    return text
  }
}

export const toDecodedMarkdown = async (promise: Promise<Response>) => {
  try {
    const response = await promise
    const result = await response.json()

    if (result?.content) {
      const markdown = atob(result.content)
      const cleanedMarkdown = removeFirstHeading(markdown)
      return decodeEmoji(cleanedMarkdown)
    }

    return ''
  } catch (error) {
    console.error('Decode Markdown Failed:', error)
    return ''
  }
}
