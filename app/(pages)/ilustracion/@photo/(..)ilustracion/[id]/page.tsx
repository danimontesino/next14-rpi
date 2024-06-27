import { Illustration } from '@lib/definitions'
import React from 'react'
import Lightbox from './lightbox'

export default function Page({ params }: { params: { id: string } }) {
  const illustrations = Object.values(Illustration)

  const getCurrentImage = (imageId: Illustration) => {
    if (illustrations.includes(imageId)) {
      return params.id as Illustration
    }

    return Illustration.LAS_RAMBLAS_GC_SHOPPING_CENTER
  }

  const currentImage = getCurrentImage(params.id as Illustration)

  const indexOfCurrentImage = illustrations.indexOf(currentImage)

  return (
    <section className="fixed inset-0 overflow-hidden z-50 select-none">
      <Lightbox params={params} initialIndexOfImage={indexOfCurrentImage} />
    </section>
  )
}
