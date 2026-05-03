import { describe, expect, test } from 'vitest'
import { getExternalForwardedHeaders } from '@/utils/forwarded-headers'

describe('getExternalForwardedHeaders', () => {
  test('drops an internal forwarded port when the forwarded host has no port', () => {
    const headers = new Headers({
      'x-forwarded-host': 'chengpeiquan.com',
      'x-forwarded-port': '4936',
      'x-forwarded-proto': 'https',
    })

    const forwardedHeaders = getExternalForwardedHeaders(headers)

    expect(forwardedHeaders.get('x-forwarded-host')).toBe('chengpeiquan.com')
    expect(forwardedHeaders.has('x-forwarded-port')).toBe(false)
    expect(forwardedHeaders.get('x-forwarded-proto')).toBe('https')
  })
})
