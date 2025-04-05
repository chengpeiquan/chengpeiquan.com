import React from 'react'
import { type PropsWithDevice } from '@/config/route-config'
import { Background } from './background'
import { Features } from './features'
import { LeftPattern, RightPattern } from './pattern'
import { ScrollIndicator } from './scroll-indicator'

export const Hero: React.FC<PropsWithDevice> = ({ isMobile }) => {
  return (
    <div className="dark relative flex min-h-[95vh] w-full items-center justify-center bg-[#050505]">
      {!isMobile && (
        <>
          <LeftPattern />
          <RightPattern />
        </>
      )}

      <Features />
      <Background />
      <ScrollIndicator />
    </div>
  )
}
