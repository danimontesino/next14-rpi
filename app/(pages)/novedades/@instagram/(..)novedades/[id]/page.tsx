import React from 'react'
import { Image } from '@nextui-org/image'
import { notFound } from 'next/navigation'
import type { InApiDetailResponse } from '@lib/definitions'
import { InstagramMediaTypes } from '@lib/definitions'
import Lightbox from './lightbox'

async function getData(id: string) {
  const res = await fetch(`${process.env.URL}/api/in/${id}`)
  return res.json()
}

export default async function Page({ params }: { params: { id: string } }) {
  const data: InApiDetailResponse | null = await getData(params.id)

  if (!data) {
    notFound()
  }

  const { media_url, thumbnail_url, media_type } = data

  const currentImageUrl = media_type === InstagramMediaTypes.VIDEO ? thumbnail_url : media_url

  return (
    <div className="fixed inset-0 overflow-hidden z-50 select-none">
      <div className="absolute inset-0 cursor-default dark:bg-black bg-white backdrop-blur-2xl select-none pointer-events-none">
        <Image
          src={currentImageUrl}
          className="pointer-events-none h-full w-full blur-3xl object-cover"
          alt="blurred background"
          sizes={'100%'}
          removeWrapper
        />
      </div>

      <Lightbox item={data} />
    </div>
  )
}
