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
