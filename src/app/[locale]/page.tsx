'use client'

import { LayoutMain } from 'blackwork'
import Image from 'next/image'
import React from 'react'

export default function LocalePage() {
  return (
    <LayoutMain fullscreen>
      <div className="relative flex size-full flex-1 overflow-hidden">
        <Image
          src="https://cdn.chengpeiquan.com/img/2021/01/20210222114425.jpg?x-oss-process=image/interlace,1"
          // src="https://cdn.chengpeiquan.com/img/2022/12/20221231235941.jpg?x-oss-process=image/interlace,1"
          // src="https://cdn.chengpeiquan.com/img/2024/07/202407220013320.jpg?x-oss-process=image/interlace,1"
          // src="https://cdn.chengpeiquan.com/img/2025/01/202501011808403.jpg?x-oss-process=image/interlace,1"
          alt="山景房里的三只猫"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover' }}
          className="blur-sm"
        />
      </div>
    </LayoutMain>
  )
}
