'use client'

import { usePathname, useRouter } from 'next/navigation'
import useKeypress from 'react-use-keypress'
import { motion, MotionConfig } from 'framer-motion'
import React, { useEffect } from 'react'
import { Button } from '@nextui-org/button'
import { CloseIcon } from '@nextui-org/shared-icons'
import { useSwipeable } from 'react-swipeable'
import Video from './video'

interface ModalProps {
  id: string
}

export default function Modal({ id }: ModalProps) {
  const pathname = usePathname()
  const router = useRouter()

  const onClose = () => {
    router.back()
  }

  useKeypress('Escape', onClose)
  const handlers = useSwipeable({
    onSwipedDown: onClose,
    trackMouse: true,
    trackTouch: true,
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (pathname === '/') {
    return null
  }

  return (
    <div className="fixed w-full h-full left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-transparent overflow-hidden z-50">
      <MotionConfig
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative w-full h-full flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 cursor-default dark:bg-black/30 bg-white/30 backdrop-blur-lg z-20"
          />

          <div
            className="relative flex justify-center items-center w-full h-full p-8 z-30"
            {...handlers}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative flex justify-center items-center align-middle w-full h-full"
            >
              <Video id={id} />
            </motion.div>
          </div>

          <div className={`absolute top-0 right-0 z-40 text-white text-2xl p-4`}>
            <Button
              isIconOnly
              aria-label="close"
              variant="solid"
              radius="full"
              className="bg-foreground/50 backdrop-blur-lg text-white shadow-lg"
              onClick={onClose}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
      </MotionConfig>
    </div>
  )
}
