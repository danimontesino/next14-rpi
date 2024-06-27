'use client'

import React, { useEffect } from 'react'
import NextImage from 'next/image'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
import { ArrowLeftIcon } from '@icons/arrow-left-icon'
import { ArrowRightIcon } from '@icons/arrow-right-icon'
import { CloseIcon } from '@nextui-org/shared-icons'
import { useRouter } from 'next/navigation'
import useKeypress from 'react-use-keypress'
import { useSwipeable } from 'react-swipeable'
import { Illustration, Routes } from '@lib/definitions'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { variants } from '@lib/variants'
import { getResourceImageIllustrationByIndex } from '@lib/resources'

export interface ModalProps {
  params: {
    id: string
  }
  initialIndexOfImage: number
}

export default function Lightbox({ params, initialIndexOfImage }: ModalProps) {
  const router = useRouter()

  const illustrations = Object.values(Illustration)

  const [direction, setDirection] = React.useState(0)
  const [indexOfCurrentImage, setIndexOfCurrentImage] = React.useState(initialIndexOfImage)

  const onClose = () => {
    router.back()
  }

  const getIndex = (currentIndex: number, direction: number) => {
    if (currentIndex === illustrations.length - 1 && direction === 1) {
      return 0
    } else if (currentIndex === 0 && direction === -1) {
      return illustrations.length - 1
    }
    return currentIndex + direction
  }

  const changeImageId = (newImageIndex: number) => {
    if (newImageIndex > indexOfCurrentImage) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    setIndexOfCurrentImage(newImageIndex)
    const imageId = illustrations[newImageIndex]
    const baseRoute = `/${Routes.illustration}`
    window.history.replaceState(null, '', `${baseRoute}/${imageId}`)
  }

  const onNext = () => {
    changeImageId(getIndex(indexOfCurrentImage, 1))
  }

  const onPrevious = () => {
    changeImageId(getIndex(indexOfCurrentImage, -1))
  }

  const currentImageUrl = getResourceImageIllustrationByIndex(indexOfCurrentImage) as string

  useKeypress('Escape', onClose)
  useKeypress('ArrowRight', onNext)
  useKeypress('ArrowLeft', onPrevious)

  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrevious,
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

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="relative w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 cursor-default dark:bg-black bg-white backdrop-blur-2xl z-20"
        >
          <Image
            as={NextImage}
            src={currentImageUrl}
            className="pointer-events-none h-full w-full blur-3xl object-cover"
            alt="blurred background"
            fill
            priority
            sizes={'100%'}
            removeWrapper
            radius="none"
          />
        </motion.div>

        <div className="relative flex justify-center items-center w-full h-full p-2">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-30 text-white text-2xl p-4">
            <Button
              isIconOnly
              aria-label="back"
              variant="solid"
              radius="full"
              className="bg-foreground/50 backdrop-blur-lg text-whit"
              onClick={onPrevious}
            >
              <ArrowLeftIcon />
            </Button>
          </div>

          <div
            className="relative flex justify-center items-center align-middle w-full h-full z-20 cursor-grab"
            {...handlers}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={indexOfCurrentImage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full"
              >
                <Image
                  as={NextImage}
                  src={currentImageUrl}
                  alt={params.id}
                  fill
                  priority
                  sizes={'100%'}
                  className="object-contain !w-auto !left-1/2 -translate-x-1/2 pointer-events-none"
                  removeWrapper
                  radius="none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-30 text-white text-2xl p-4">
            <Button
              isIconOnly
              aria-label="next"
              variant="solid"
              radius="full"
              className="bg-foreground/50 backdrop-blur-lg text-whit"
              onClick={onNext}
            >
              <ArrowRightIcon />
            </Button>
          </div>

          <div className={`absolute top-0 right-0 z-30 text-white text-2xl p-4`}>
            <Button
              isIconOnly
              aria-label="close"
              variant="solid"
              radius="full"
              className="bg-foreground/50 backdrop-blur-lg text-whit"
              onClick={onClose}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
