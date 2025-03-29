import React from 'react'
import { Background } from './background'
import { Features } from './features'
import { LeftPattern, RightPattern } from './pattern'
import { ScrollIndicator } from './scroll-indicator'

export const Hero: React.FC = () => {
  return (
    <div className="dark relative flex min-h-[95vh] w-full items-center justify-center bg-[#050505]">
      <LeftPattern />
      <RightPattern />
      <Features />
      <Background />
      <ScrollIndicator />
    </div>
  )
}
