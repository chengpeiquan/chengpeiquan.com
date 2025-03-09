import { type ButtonProps } from 'blackwork'
import type React from 'react'

// The units are all pixels
const styleConfig = {
  gap: 12,
  width: 40,
  height: 40,
} as const

/**
 * Get bottom-right button's style
 *
 * @param index - Order from bottom to top, counting starts from 0
 */
export const getBrbStyle = (
  index: number,
  isMobile: boolean,
): React.CSSProperties => {
  const right = isMobile ? 20 : 12

  const bottom = (() => {
    const firstBottomValue = isMobile ? 20 : 12
    const gapAcc = styleConfig.gap * index
    const heightAcc = styleConfig.height * index
    return firstBottomValue + gapAcc + heightAcc
  })()

  return {
    position: 'fixed',
    zIndex: 10,
    width: styleConfig.width,
    height: styleConfig.height,
    right,
    bottom,
  }
}

export const getBrbVariant = (isMobile: boolean): ButtonProps['variant'] => {
  return isMobile ? 'outline' : 'ghost'
}
