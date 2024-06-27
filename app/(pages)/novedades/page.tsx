import { Divider } from '@nextui-org/divider'
import React from 'react'
import type { InApiAllResponse } from '@lib/definitions'
import { Main } from '@ui/main'
import { Title } from '@ui/text'
import ListGallery from './list-gallery'

async function getData(): Promise<InApiAllResponse> {
  const url = `${process.env.URL}/api/in`
  const response = await fetch(url, {
    cache: 'no-store',
  })
  return await response.json()
}

export default async function News() {
  const { data: items = [], after: initialAfter } = await getData()

  return (
    <Main>
      <section className="container mx-auto px-4">
        <div className="w-10/12 mx-auto flex flex-col items-center gap-7">
          <Title className="text-center">Novedades</Title>
          <h3 className="uppercase text-lg sm:text-xl font-regular text-center">Instagram</h3>

          <Divider orientation="vertical" className="h-16 bg-foreground" />
        </div>
      </section>

      <section className="container mx-auto px-4 mt-5 sm:mt-10 mb-10 sm:mb-20">
        <ListGallery
          initialItems={items}
          initialAfter={initialAfter}
          loadingText={'Cargando...'}
          loadMoreText={'Cargar más'}
        />

        {items.length === 0 && (
          <div className="flex justify-center items-center text-center">
            <p>No hay novedades.</p>
          </div>
        )}
      </section>
    </Main>
  )
}
