import { useMediaQuery } from 'react-responsive'

export type Breakpoints = {
  isMobile: boolean // < 640px
  isTablet: boolean // < 1024px
  isDesktop: boolean // < 1280px
  isLargeDesktop: boolean // < 1536px
}

export function useBreakpoints(): Breakpoints {
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' })
  const isDesktop = useMediaQuery({ query: '(max-width: 1279px)' })
  const isLargeDesktop = useMediaQuery({ query: '(max-width: 1535px)' })

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  }
}
