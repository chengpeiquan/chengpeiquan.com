'use client'

import { ChevronRight } from 'blackwork/icons'
import { type Variants, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Link } from '@/navigation'
import { cn } from '@/utils'

interface Feature {
  text: string
  x: string
  y: string

  // ClassName
  gradient: string
  offset?: string
}

const features: Feature[] = [
  {
    text: 'Tattoo',
    x: '0%',
    y: '0%',
    gradient: 'from-primary via-primary/90 to-primary/60',
    offset: 'ml-14',
  },
  {
    text: 'Cats',
    x: '-10%',
    y: '20%',
    gradient: 'from-primary/90 via-primary/80 to-primary/50',
    offset: 'ml-4',
  },
  {
    text: 'Bass',
    x: '10%',
    y: '40%',
    gradient: 'from-primary/80 via-primary/70 to-primary/40',
    offset: '-ml-4',
  },
  {
    text: 'Cooking',
    x: '-5%',
    y: '60%',
    gradient: 'from-primary/70 via-primary/60 to-primary/30',
    offset: 'ml-6',
  },
]

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const item: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    filter: 'blur(10px)',
  },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const getCls = (feature: Feature) => {
  return cn(
    'cursor-default font-bold !leading-[1.2]',
    'text-6xl md:text-7xl lg:text-8xl',
    'bg-gradient-to-r bg-clip-text text-transparent',
    feature.gradient,
    feature.offset,
  )
}

export const Features: React.FC = () => {
  const t = useTranslations('homeConfig.hero')

  return (
    <div className="absolute left-[45%] top-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 sm:left-[30%]">
      <motion.div variants={container} initial="hidden" animate="show">
        {features.map((feature) => (
          <motion.p
            key={feature.text}
            className={getCls(feature)}
            style={{
              transform: `translate(${feature.x}, ${feature.y})`,
            }}
            variants={item}
            whileHover={{
              scale: 1.02,
              x: 10,
              textShadow: '0 0 8px rgba(255,255,255,0.1)',
              transition: {
                duration: 0.2,
                ease: 'easeOut',
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
          >
            {feature.text}
          </motion.p>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ x: 5 }}
        transition={{
          opacity: { delay: 1.5, duration: 0.8, ease: 'easeOut' },
          y: { delay: 1.5, duration: 0.8, ease: 'easeOut' },
          x: { duration: 0.2, ease: 'easeOut' },
        }}
      >
        <Link
          href="/article/true-colors-a-decade"
          className="inline-flex items-center gap-2 text-base font-light tracking-wider sm:text-lg"
          variant="secondary"
        >
          {t('slogan')}
          <ChevronRight className="size-6 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.p>
    </div>
  )
}
