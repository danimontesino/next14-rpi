'use client'

import type { InstagramMedia } from '@lib/definitions'
import { InstagramMediaTypes, Routes } from '@lib/definitions'
import { Video } from '@ui/video'
import { Image } from '@nextui-org/image'
import React, { useEffect, useMemo } from 'react'
import { Button } from '@nextui-org/button'
import { ArrowLeftIcon } from '@icons/arrow-left-icon'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from '@ui/carousel'
import { ArrowRightIcon } from '@icons/arrow-right-icon'
import useKeypress from 'react-use-keypress'
import { useSwipeable } from 'react-swipeable'
import { formatDateToSpanish, getFromLocalStorage } from '@lib/utils'
import { useRouter } from 'next/navigation'
import { CloseIcon } from '@nextui-org/shared-icons'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import NextImage from 'next/image'

export interface LightboxProps {
  item: InstagramMedia
}

function renderMedia(media: InstagramMedia) {
  const { media_type, media_url, caption } = media

  if (media_type === InstagramMediaTypes.VIDEO) {
    return (
      <Video
        src={media_url}
        classNames={{
          container: 'flex justify-end',
          video: 'max-h-full max-w-full w-auto h-auto object-contain pointer-events-none',
        }}
      />
    )
  }

  if (media_type === InstagramMediaTypes.IMAGE) {
    return (
      <Image
        src={media_url}
        alt={caption}
        sizes={'100%'}
        className="w-full h-auto object-contain pointer-events-none aspect-square"
        radius="none"
        fetchPriority={'high'}
      />
    )
  }

  return null
}

export default function Lightbox({ item }: LightboxProps) {
  const router = useRouter()

  const currentItemId = item.id
  const galleryLocalStorage = getFromLocalStorage('gallery')
  const gallery = JSON.parse(galleryLocalStorage || '[]') as string[]

  const nextItemId = useMemo(() => {
    const currentIndex = gallery.findIndex((id: string) => id === currentItemId)
    return gallery[currentIndex + 1] || gallery[0]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery, currentItemId])

  const prevItemId = useMemo(() => {
    const currentIndex = gallery.findIndex((id: string) => id === currentItemId)
    return gallery[currentIndex - 1] || gallery[gallery.length - 1]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery, currentItemId])

  const onClose = () => {
    router.back()
  }

  const onPrev = () => {
    router.replace(`/${Routes.news}/${prevItemId}`, {
      scroll: false,
    })
  }

  const onNext = () => {
    router.replace(`/${Routes.news}/${nextItemId}`, {
      scroll: false,
    })
  }

  const { children } = item

  const canRenderCarousel = Boolean(children && children.data.length > 0)
  const aspectRatioVideo = item.media_type === InstagramMediaTypes.VIDEO
  const aspectRatioSquare = item.media_type === InstagramMediaTypes.IMAGE || canRenderCarousel

  useKeypress('Escape', onClose)

  const handlers = useSwipeable({
    onSwipedDown: onClose,
    trackTouch: true,
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="relative select-none" {...handlers}>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 z-30 text-white text-2xl p-4 hidden md:block">
        <Button
          isIconOnly
          aria-label="back"
          variant="solid"
          radius="full"
          className="bg-foreground/50 backdrop-blur-lg text-white"
          onClick={onPrev}
        >
          <ArrowLeftIcon />
        </Button>
      </div>

      <div className="min-h-dvh flex flex-col relative">
        <div className="flex flex-col box-border items-stretch justify-center flex-grow">
          <div className="min-w-0 min-h-0 flex justify-center items-start box-border">
            <div
              role="dialog"
              className="relative h-full w-full flex flex-col justify-center items-center my-0 mx-0 overflow-hidden basis-[content]"
            >
              <div className="relative max-h-[calc(100%-40px)] max-w-[calc(100%-64px)] sm:max-w-[calc(100%-64px-64px)] w-full mx-auto pointer-events-none overflow-hidden my-0 flex-shrink">
                <div className="flex flex-col h-full max-w-full pointer-events-none">
                  <article className="w-full p-0 pointer-events-none">
                    <div className="box-border flex flex-col lg:flex-row items-stretch lg:justify-center overflow-visible pointer-events-none bg-background lg:bg-transparent">
                      {aspectRatioVideo && (
                        <div className="relative max-w-[calc(100%-64px)] sm:max-w-[calc(100%-300px)] self-center flex-grow-0 lg:max-h-[919px] lg:max-w-[516px] lg:aspect-[1080/1920] lg:basis-[516px] bg-background flex lg:flex-grow justify-center min-h-[689px] overflow-hidden lg:flex-shrink pointer-events-auto">
                          {renderMedia(item)}
                        </div>
                      )}

                      {aspectRatioSquare && (
                        <div className="max-h-[619px] max-w-[619px] lg:max-h-[919px] lg:max-w-[919px] basis-[619px] lg:basis-[919px] aspect-square bg-background flex flex-grow justify-center min-h-[262px] sm:min-h-[450px] overflow-hidden flex-shrink pointer-events-auto">
                          {canRenderCarousel ? (
                            <Carousel className="w-full h-auto select-none" draggable={false}>
                              <CarouselContent>
                                {item.children?.data.map((media) => (
                                  <CarouselItem
                                    key={`carousel-${media.id}-item`}
                                    className="relative"
                                  >
                                    {renderMedia({
                                      ...media,
                                      caption: item.caption.split(' ').slice(0, 8).join(' '),
                                    })}
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <CarouselPrevious />
                              <CarouselNext />
                              <CarouselPagination />
                            </Carousel>
                          ) : (
                            renderMedia(item)
                          )}
                        </div>
                      )}

                      <div className="border-t-1 border-divider lg:border-none min-h-[300px] lg:min-h-0 lg:max-w-[500px] lg:min-w-[405px] overflow-hidden my-0 pt-0 text-[100%] flex lg:flex-shrink-[2] items-stretch flex-grow align-baseline pointer-events-none">
                        <div className="overflow-visible min-w-0 min-h-0 flex flex-col box-border items-stretch self-auto justify-start relative flex-grow">
                          <div className="h-full bg-background flex flex-col pointer-events-auto">
                            <div className="min-w-[335px] w-full flex flex-col box-border flex-grow relative">
                              <section className="absolute h-[calc(100%-40px)] left-0 overflow-hidden mb-auto pt-10 mt-0 min-h-0 pb-0 flex flex-shrink flex-col px-10 mx-0">
                                <div className="flex flex-row gap-3 items-center justify-start mb-8 w-full">
                                  <span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default">
                                    <Image
                                      as={NextImage}
                                      src="/images/avatar.jpg"
                                      className="flex object-cover w-full h-full pointer-events-none"
                                      alt="profile picture"
                                      width={40}
                                      height={40}
                                    />
                                  </span>
                                  <div className="flex flex-col gap-1">
                                    <h2 className="text-[100%] font-semibold">@andrealombardia</h2>
                                    <p className="text-xs">{formatDateToSpanish(item.timestamp)}</p>
                                  </div>
                                </div>

                                <ScrollShadow
                                  hideScrollBar
                                  className="max-w-prose mx-auto w-full h-full"
                                >
                                  <p className="text-[100%] text-left break-words leading-6">
                                    {item.caption}
                                  </p>
                                </ScrollShadow>
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-0 z-30 text-white text-2xl p-4 hidden md:block">
        <Button
          isIconOnly
          aria-label="next"
          variant="solid"
          radius="full"
          className="bg-foreground/50 backdrop-blur-lg text-white"
          onClick={onNext}
        >
          <ArrowRightIcon />
        </Button>
      </div>

      <div className={`absolute top-0 right-0 z-10 text-white text-2xl p-4`}>
        <Button
          isIconOnly
          aria-label="close"
          variant="solid"
          radius="full"
          className="bg-foreground/50 backdrop-blur-lg text-white"
          onClick={onClose}
        >
          <CloseIcon />
        </Button>
      </div>
    </div>
  )
}
