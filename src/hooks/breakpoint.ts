import { useMediaQuery } from 'blackwork'

// Breakpoint value is referenced from tailwind configuration
export const useBreakpoint = () => {
  const is2Xs = useMediaQuery('(min-width: 320px)')
  const isXs = useMediaQuery('(min-width: 480px)')
  const isSm = useMediaQuery('(min-width: 640px)')
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const is2Xl = useMediaQuery('(min-width: 1536px)')

  return {
    is2Xs,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
  }
}
