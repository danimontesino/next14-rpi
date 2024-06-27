'use client'

import Link from 'next/link'
import type { InApiAllResponse, InstagramMedia } from '@lib/definitions'
import { InstagramMediaTypes, Routes } from '@lib/definitions'
import { Image } from '@nextui-org/image'
import React, { useEffect, useState } from 'react'
import { InVideoIcon } from '@icons/in-video-icon'
import { InAlbumIcon } from '@icons/in-album-icon'
import { Button } from '@nextui-org/button'
import { saveToLocalStorage } from '@lib/utils'
import NextImage from 'next/image'

export interface ListGalleryProps {
  initialItems: InstagramMedia[]
  loadMoreText: string
  loadingText: string
  initialAfter?: string
}

function buildLocalStorageValue(items: InstagramMedia[]) {
  return JSON.stringify(items.map(({ id }) => id))
}

export default function ListGallery({
  initialItems,
  initialAfter,
  loadMoreText,
  loadingText,
}: ListGalleryProps) {
  const [after, setAfter] = useState(initialAfter)
  const [loading, setLoading] = useState(false)

  const [items, setItems] = useState(initialItems)

  const Icons: Record<InstagramMediaTypes, React.ReactNode> = {
    [InstagramMediaTypes.VIDEO]: <InVideoIcon fill="currentColor" />,
    [InstagramMediaTypes.IMAGE]: '',
    [InstagramMediaTypes.CAROUSEL_ALBUM]: <InAlbumIcon fill="currentColor" />,
  }

  const url = `${process.env.NEXT_PUBLIC_URL}/api/in?after=${after}`

  const loadMoreItems = async () => {
    setLoading(true)

    const response = await fetch(url)
    const { data = [], after: apiAfter } = (await response.json()) as InApiAllResponse

    setItems((prevItems) => [...prevItems, ...data])
    setAfter(apiAfter)
    setLoading(false)
  }

  const canLoadMore = Boolean(after && !loading)

  useEffect(() => {
    saveToLocalStorage('gallery', buildLocalStorageValue(items))
  }, [items])

  return (
    <div className="block relative">
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-1 lg:gap-2">
        {items.map(({ id, media_url, media_type, caption, thumbnail_url }) => (
          <Link
            href={`/${Routes.news}/${id}`}
            key={id}
            scroll={false}
            passHref
            data-disable-nprogress={true}
            className="block aspect-square z-10"
          >
            <div className="group relative cursor-zoom-in">
              <div className="absolute top-0 right-0 z-20 p-2 text-white text-xs [&>svg]:fill-white">
                {Icons[media_type]}
              </div>

              <Image
                as={NextImage}
                src={media_type === InstagramMediaTypes.VIDEO ? thumbnail_url : media_url}
                alt={id}
                className="relative w-full h-[294px] object-cover object-center brightness-90 transition will-change-auto group-hover:brightness-100 !aspect-square"
                classNames={{
                  wrapper: 'w-full h-full !max-w-full !aspect-square !z-10',
                  img: 'w-full h-full !aspect-square !z-10',
                }}
                sizes={'100%'}
                width={306}
                height={306}
                fetchPriority={'high'}
                priority
              />
            </div>

            <div className="relative p-2 opacity-1 w-full rounded-b-md hidden lg:block">
              <h2 className="mb-2 text-balance font-semibold">
                {caption.split(' ').slice(0, 8).join(' ') + '...'}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {canLoadMore && (
        <div className="w-full inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-background pt-32 pb-8 pointer-events-none absolute z-50">
          <Button
            variant="solid"
            size="lg"
            onClick={loadMoreItems}
            className="relative text-white pointer-events-auto"
          >
            {loadMoreText}
          </Button>
        </div>
      )}

      {loading && (
        <div className="w-full inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-background pt-32 pb-8 pointer-events-none absolute z-50">
          {loadingText}
        </div>
      )}
    </div>
  )
}
