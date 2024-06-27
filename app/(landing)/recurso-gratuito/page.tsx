import type { Metadata } from 'next'
import { Subtitle, Title } from '@ui/text'
import React from 'react'
import { ArrowLeftIcon } from '@nextui-org/shared-icons'
import Video from './video'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Recurso gratuito',
  description: 'Recurso gratuito | La esencia de tu negocio.',
  robots: 'noindex, nofollow',
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 mt-8">
      <section className="max-w-prose mx-auto flex justify-start">
        <Link href="/" className="text-foreground">
          <ArrowLeftIcon />
          <span>Ir atrás</span>
        </Link>
      </section>
      <section className="max-w-prose mx-auto flex flex-col gap-2">
        <Title>Title</Title>
        <Subtitle>Subtitle</Subtitle>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          <Link href="mailto:web@andrealombardia.com" target="_blank">
            web@andrealombardia.com
          </Link>
        </p>
      </section>

      <section className="max-w-prose mx-auto relative my-12 aspect-video">
        <Video />
      </section>
    </main>
  )
}
