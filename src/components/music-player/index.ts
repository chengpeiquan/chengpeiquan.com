'use client'

import dynamic from 'next/dynamic'

// https://stackoverflow.com/a/66490267/15117507
// https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
export const MusicPlayer = dynamic(() => import('./music-player'), {
  ssr: false,
})
