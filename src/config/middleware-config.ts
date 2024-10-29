import { headers } from 'next/headers'

export const headerFields = {
  device: 'x-device-type',
} as const

export const defaultHeaderValue = {
  device: 'unknown',
} as const

export const isMobileDevice = async () => {
  const device = (await headers()).get(headerFields.device)
  return device === 'mobile'
}
