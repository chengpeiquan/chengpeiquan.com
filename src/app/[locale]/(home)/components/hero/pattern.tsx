import React from 'react'
import { cn } from '@/utils'

const rootCls = cn(
  'pointer-events-none absolute z-[2] size-full overflow-visible',
)
const svgCls = cn(
  'size-full origin-center scale-150 opacity-15',
  'will-change-transform',
  '[backface-visibility:hidden]',
  '[transform:translateZ(0)]',
)

export const LeftPattern: React.FC = () => {
  return (
    <div className={cn(rootCls, 'left-0 top-0 translate-x-[-20%]')}>
      <svg
        className={svgCls}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="-200 -200 1400 1400"
      >
        <g
          stroke="currentColor"
          strokeWidth="0.8"
          className="mix-blend-soft-light [transform-origin:center]"
        >
          {/* Dense rings on the left */}
          <circle
            cx="500"
            cy="500"
            r="380"
            className="animate-[spin_65s_linear_infinite] opacity-80"
          />
          <circle
            cx="500"
            cy="500"
            r="220"
            className="animate-[spin_50s_linear_infinite_reverse] opacity-70"
          />
          <circle
            cx="500"
            cy="500"
            r="140"
            className="animate-[spin_35s_linear_infinite] opacity-60"
          />

          {/* Small rings in the upper left corner */}
          <circle
            cx="300"
            cy="300"
            r="180"
            className="animate-[spin_40s_linear_infinite] opacity-70"
          />
          <circle
            cx="300"
            cy="300"
            r="80"
            className="animate-[spin_30s_linear_infinite_reverse] opacity-60"
          />
        </g>
      </svg>
    </div>
  )
}

export const RightPattern: React.FC = () => {
  return (
    <div className={cn(rootCls, 'right-0 top-1/4 translate-x-[40%]')}>
      <svg
        className={svgCls}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="-200 -200 1400 1400"
      >
        <g
          stroke="currentColor"
          strokeWidth="0.8"
          className="mix-blend-soft-light [transform-origin:center]"
        >
          {/* Sparse rings on the right */}
          <circle
            cx="500"
            cy="500"
            r="320"
            className="animate-[spin_70s_linear_infinite_reverse] opacity-70"
          />
          <circle
            cx="500"
            cy="500"
            r="180"
            className="animate-[spin_55s_linear_infinite] opacity-60"
          />

          {/* Small rings in the lower right corner */}
          <circle
            cx="700"
            cy="700"
            r="150"
            className="animate-[spin_45s_linear_infinite_reverse] opacity-70"
          />
        </g>
      </svg>
    </div>
  )
}
