'use client'

import ReactPlayer from 'react-player/lazy'
import React from 'react'
import { Image } from '@nextui-org/image'
import VideoSkeleton from './video-skeleton'

const id = '829381494'

export default function Video() {
  return (
    <ReactPlayer
      url={`https://vimeo.com/${id}`}
      light={
        <Image
          src="/images/andrea-lombardia-coffe.jpeg"
          alt="Thumbnail"
          radius="none"
          classNames={{
            wrapper: 'z-0',
          }}
        />
      }
      wrapper={(props) => (
        <div {...props} className="absolute top-0 left-0 object-contain w-full h-full" />
      )}
      fallback={<VideoSkeleton />}
      playing
      controls
      width="100%"
      height="100%"
    />
  )
}
