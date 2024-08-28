'use client'

import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { encode } from 'qss'
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface LinkPreviewProps {
  children: ReactNode
  url: string
  width?: number
  height?: number
  quality?: number
  imageSrc?: string
  isStatic?: boolean
  className?: string
}

interface StaticLinkPreviewProps extends LinkPreviewProps {
  imageSrc: string
  isStatic: true
}

interface DynamicLinkPreviewProps extends LinkPreviewProps {
  imageSrc?: never
  isStatic?: false
}

type LinkPreviewPropsUnion = StaticLinkPreviewProps | DynamicLinkPreviewProps

const LinkPreview = ({
  children,
  url,
  width = 400,
  height = 225,
  quality = 50,
  imageSrc = '',
  isStatic = false,
  className,
}: LinkPreviewPropsUnion) => {
  const [isOpen, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const horizontalOffset = useMotionValue(0)
  const smoothHorizontalOffset = useSpring(horizontalOffset, {
    stiffness: 100,
    damping: 15,
  })

  const generatePreviewUrl = useCallback(() => {
    if (isStatic) {
      return imageSrc
    }

    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: 'screenshot.url',
      colorScheme: 'dark',
      'viewport.isMobile': true,
      'viewport.deviceScaleFactor': 1,
      'viewport.width': width * 3,
      'viewport.height': height * 3,
    })

    return `https://api.microlink.io/?${params}`
  }, [url, width, height, imageSrc, isStatic])

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - left
    const centerOffset = (mouseX - width / 2) / 2

    horizontalOffset.set(centerOffset)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {isMounted && (
        <div className='sr-only'>
          <Image
            src={generatePreviewUrl()}
            width={width}
            height={height}
            quality={quality}
            priority={true}
            alt='Preload preview image'
          />
        </div>
      )}
      <HoverCardPrimitive.Root
        onOpenChange={(open) => setOpen(open)}
        openDelay={50}
        closeDelay={100}>
        <HoverCardPrimitive.Trigger
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          onMouseMove={handleMouseMove}
          className={cn('font-bold', className)}>
          {' '}
          {children}{' '}
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content align='center' side='top' sideOffset={10}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 260, damping: 20 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ x: smoothHorizontalOffset }}
                className='rounded-xl shadow-xl'>
                <Link href={url} className='block rounded-xl'>
                  <Image
                    src={generatePreviewUrl()}
                    width={width}
                    height={height}
                    quality={quality}
                    priority={true}
                    alt='Link preview'
                    className='rounded-xl'
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  )
}

export default LinkPreview
