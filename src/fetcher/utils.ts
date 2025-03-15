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

const cleanupMarkdown = (markdown: string) => {
  return (
    markdown
      // Remove the first level title
      // Because metadata has already configured the first-level title,
      // the original first-level title is not needed
      .replace(/^# .*\n/, '')

      // Remove characters like `[English](...) | 简体中文` or `English | [简体中文](...)`
      .replace(
        /^(?:\[[^\]]+\]\([^)]+\)|[A-Za-z]+)\s*\|\s*(?:\[[^\]]+\]\([^)]+\)|[^\n]+)\n+/m,
        '',
      )

      // Remove the License section
      // Simply delete everything starting from "## 📜 License" and so on
      // Because it is at the end of the document
      .replace(/^\s*##\s*.*License\b[\s\S]*/im, '')
  )
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
      const cleanedMarkdown = cleanupMarkdown(markdown)
      return decodeEmoji(cleanedMarkdown)
    }

    return ''
  } catch (error) {
    console.error('Decode Markdown Failed:', error)
    return ''
  }
}
