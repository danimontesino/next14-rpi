import { getResourceImageIllustrationById } from '@lib/resources'

import React from 'react'
import Image from 'next/image'
import { CloseIcon } from '@nextui-org/shared-icons'
import { notFound } from 'next/navigation'
import { Illustration, Routes } from '@lib/definitions'
import ButtonLink from '@ui/button-link'

export function generateStaticParams() {
  const illustrations = Object.values(Illustration)

  return illustrations.map((item) => ({
    id: item,
  }))
}

export default function Page({ params }: { params: { id: string } }) {
  const currentImageUrl = getResourceImageIllustrationById(params.id)

  if (!currentImageUrl) {
    notFound()
  }

  return (
    <main className="fixed top-0 left-0 w-full h-screen dark:bg-black overflow-hidden z-50">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 cursor-default dark:bg-black bg-white backdrop-blur-2xl">
          <Image
            src={currentImageUrl}
            className="pointer-events-none h-full w-full blur-3xl object-cover"
            alt="blurred background"
            fill
            priority
            sizes={'100%'}
          />
        </div>

        <div className="relative flex justify-center items-center w-full h-full p-2">
          <div className="relative flex justify-center items-center align-middle w-full h-full">
            <Image
              src={currentImageUrl}
              alt={params.id}
              fill
              priority
              sizes={'100%'}
              className="object-contain pointer-events-none"
            />
          </div>

          <div className={`absolute top-0 right-0 z-10 text-white text-2xl p-4`}>
            <ButtonLink
              href={`/${Routes.illustration}`}
              isIconOnly
              aria-label="close"
              variant="solid"
              radius="full"
              className="bg-foreground/50 backdrop-blur-lg text-white"
            >
              <CloseIcon />
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  )
}
