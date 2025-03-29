'use client'

import { ChevronsDown } from 'blackwork/icons'
import { motion } from 'framer-motion'
import React from 'react'

export const ScrollIndicator: React.FC = () => {
  return (
    <motion.div
      className="absolute bottom-16 left-1/2 z-[1] -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2.5,
      }}
    >
      <ChevronsDown className="text-muted-foreground size-8" />
    </motion.div>
  )
}
