'use client'

import { Illustration, Routes } from '@lib/definitions'

import NextImage from 'next/image'
import { Image } from '@nextui-org/image'
import React, { useEffect, useRef } from 'react'
import Masonry from 'react-masonry-css'
import Link from 'next/link'

interface ImageType {
  key: Illustration
  src: string
  thumbnail: string
  alt: string
  width?: number
  height?: number
}

export interface SectionGalleryProps {
  items: Record<
    Illustration,
    {
      title: string
      subtitle: string
    }
  >
}

export const SectionGallery = ({ items }: SectionGalleryProps) => {
  const illustrations = Object.values(Illustration)

  const illustrationsMasonry = illustrations.filter(
    (illustration) => !illustration.startsWith('lg_'),
  )

  const images: ImageType[] = illustrationsMasonry.map((illustration) => ({
    key: illustration,
    src: `/images/illustration/original/${illustration}.jpg`,
    thumbnail: `/images/illustration/${illustration}.jpg`,
    alt: illustration,
  }))

  const [imageData, setImageData] = React.useState<ImageType[]>(images)
  const imageRefs = useRef<{ [key: number]: HTMLImageElement }>({})

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  }

  useEffect(() => {
    images.forEach((image, index) => {
      const img = new window.Image()
      img.src = image.thumbnail
      img.onload = () => {
        imageRefs.current[index] = img
        setImageData((prev) => {
          const newImageData = [...prev]
          newImageData[index] = {
            ...image,
            width: img.width,
            height: img.height,
          }
          return newImageData
        })
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="container mx-auto px-4 my-5 sm:my-10 md:my-16 lg:my-24">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-8 w-auto"
        columnClassName="pl-8 bg-clip-padding"
      >
        {imageData.map((image) => (
          <Link
            key={image.key}
            className="group mb-8 after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight block"
            href={`/${Routes.illustration}/${image.key}`}
            passHref
            data-disable-nprogress={true}
          >
            <div
              className="relative w-full"
              style={{
                width: '100%',
                height: image.height ? image.height : '400px',
              }}
            >
              <Image
                as={NextImage}
                src={image.thumbnail}
                alt={image.alt}
                radius="sm"
                className="relative w-full h-full object-cover object-center brightness-90 transition will-change-auto group-hover:brightness-100"
                classNames={{
                  wrapper: 'w-full h-full !max-w-full',
                }}
                priority
                fill
                sizes={'100%'}
                isBlurred
                isLoading={!Boolean(image.height)}
              />
            </div>

            <div className="relative p-2 opacity-1 w-full rounded-b-md">
              <h2 className="mb-2 font-lora text-balance text-lg font-semibold">
                {items[image.key].title}
              </h2>
              <p className="text-medium">{items[image.key].subtitle}</p>
            </div>
          </Link>
        ))}
      </Masonry>
    </section>
  )
}
