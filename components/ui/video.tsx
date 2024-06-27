'use client'

import React, { useEffect, useRef, useState } from 'react'
import { PlayIcon } from '@icons/play-icon'
import { MutedIcon } from '@icons/muted-icon'
import { VolumenIcon } from '@icons/volumen-icon'
import { cn } from '@lib/utils'
import { Button } from '@nextui-org/button'

export type VideoProps = Omit<React.HTMLProps<HTMLVideoElement>, 'controls'> & {
  classNames?: {
    container?: string
    video?: string
  }
}

export const Video = ({
  onPlay,
  onPause,
  onVolumeChange,
  classNames,
  ...videoProps
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        void videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  useEffect(() => {
    const currentVideo = videoRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (currentVideo) {
            if (entry.isIntersecting) {
              void currentVideo.play()
              setIsPlaying(true)
            } else {
              currentVideo.pause()
              setIsPlaying(false)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    if (currentVideo) {
      observer.observe(currentVideo)
    }

    return () => {
      if (currentVideo) {
        observer.unobserve(currentVideo)
      }
    }
  }, [])

  return (
    <div
      className={cn(
        'relative max-h-full max-w-full w-auto h-full group cursor-pointer',
        classNames?.container,
      )}
      onClick={handlePlayPause}
    >
      <video
        {...videoProps}
        ref={videoRef}
        onPlay={onPlay}
        onPause={onPause}
        onVolumeChange={onVolumeChange}
        onEnded={() => setIsPlaying(false)}
        controls={false}
        className={classNames?.video}
      />
      <Button
        isIconOnly
        onClick={handlePlayPause}
        variant="light"
        size="lg"
        className="absolute !bg-transparent inset-0 text-white z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {!isPlaying && <PlayIcon />}
      </Button>
      <Button
        isIconOnly
        onClick={handleMuteUnmute}
        variant="solid"
        radius="full"
        size="sm"
        className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white z-40 group-hover:opacity-100 opacity-0 transition-opacity duration-300 [&>svg]:w-5 [&>svg]:h-5"
      >
        {isMuted ? <MutedIcon /> : <VolumenIcon />}
      </Button>
    </div>
  )
}
