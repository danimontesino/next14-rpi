import React from 'react'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
import { CloseIcon } from '@nextui-org/shared-icons'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { InApiDetailResponse, InstagramMedia } from '@lib/definitions'
import { InstagramMediaTypes, Routes } from '@lib/definitions'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from '@ui/carousel'
import { Video } from '@ui/video'

function renderMedia(media: InstagramMedia) {
  const { media_type, media_url, caption } = media

  if (media_type === InstagramMediaTypes.VIDEO) {
    return (
      <Video
        src={media_url}
        classNames={{
          video: 'max-h-full max-w-full w-full h-auto object-contain pointer-events-none',
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
        className="w-full h-auto object-contain pointer-events-none"
        radius="none"
        removeWrapper
      />
    )
  }

  return null
}

export default async function Page({ params }: { params: { id: string } }) {
  const url = `${process.env.URL}/api/in/${params.id}`

  const response = await fetch(url)
  const data = (await response.json()) as InApiDetailResponse

  if (!data) {
    notFound()
  }

  const { media_url, thumbnail_url, media_type, children, caption } = data

  const currentImageUrl = media_type === InstagramMediaTypes.VIDEO ? thumbnail_url : media_url

  const canRenderCarousel = Boolean(children && children.data.length > 0)

  return (
    <main className="fixed overflow-hidden z-50 inset-0 bg-black bg-opacity-75 flex items-center justify-center select-none">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 cursor-default dark:bg-black bg-white backdrop-blur-2xl">
          <Image
            src={currentImageUrl}
            className="pointer-events-none h-full w-full blur-3xl object-cover"
            alt="blurred background"
            sizes={'100%'}
            removeWrapper
          />
        </div>

        <div className="relative flex justify-center items-center max-w-3xl mx-auto w-full h-full p-2">
          <div className="relative flex justify-center items-center align-middle w-full h-full">
            {canRenderCarousel ? (
              <Carousel className="w-full select-none" draggable={false}>
                <CarouselContent>
                  {children?.data.map((media) => (
                    <CarouselItem key={`carousel-${media.id}-item`}>
                      {renderMedia({
                        ...media,
                        caption,
                      })}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                <CarouselPagination />
              </Carousel>
            ) : (
              renderMedia(data)
            )}
          </div>
        </div>

        <div className={`absolute top-0 right-0 z-10 text-white text-2xl p-4`}>
          <Link href={`/${Routes.news}`} data-disable-nprogress={true}>
            <Button
              isIconOnly
              aria-label="close"
              variant="solid"
              radius="full"
              className="bg-foreground/50 backdrop-blur-lg text-white"
            >
              <CloseIcon />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
