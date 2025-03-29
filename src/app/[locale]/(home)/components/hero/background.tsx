import Image from 'next/image'
import React from 'react'

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* A mask that starts to fade from the bottom */}
      <div className="from-background via-background/80 absolute inset-0 z-[1] bg-gradient-to-t via-15% to-transparent" />

      {/* Key visual image */}
      <div className="pointer-events-none absolute left-[65%] top-1/2 aspect-square h-full -translate-x-1/2 -translate-y-1/2">
        <Image
          src="https://cdn.chengpeiquan.com/img/2025/03/202503242351919.jpg?x-oss-process=image/interlace,1"
          alt=""
          fill
          sizes="50vw"
          priority
          style={{
            objectFit: 'contain',
            filter: 'brightness(1.1) contrast(1.05)',
          }}
          className="rotate-2 scale-[1.45]"
        />
      </div>
    </div>
  )
}
