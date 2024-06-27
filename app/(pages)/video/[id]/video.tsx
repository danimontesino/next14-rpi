'use client'

import ReactPlayer from 'react-player/lazy'
import React from 'react'
import VideoSkeleton from './video-skeleton'

interface VideoProps {
  id: string
}

export default function Video({ id }: VideoProps) {
  return (
    <ReactPlayer
      url={`https://vimeo.com/${id}`}
      playing
      width="100%"
      height="100%"
      fallback={
        <VideoSkeleton className="absolute top-0 left-1/2 -translate-x-1/2 z-30 h-full w-full max-w-[56.2061vh] pointer-events-none" />
      }
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 30,
        objectFit: 'contain',
        height: '100%',
        width: '100%',
        pointerEvents: 'none',
        backgroundColor: 'transparent',
      }}
    />
  )
}
