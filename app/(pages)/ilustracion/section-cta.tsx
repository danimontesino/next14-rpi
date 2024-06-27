import React from 'react'
import { ArrowRightHover } from '@icons/arrow-right-hover'
import ButtonLink from '@ui/button-link'

export function SectionCta() {
  return (
    <section className="relative overflow-hidden py-28 px-4 bg-primary md:px-8">
      <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary absolute -top-12 -right-14 blur-2xl opacity-10"></div>

      <div className="max-w-prose mx-auto px-4 md:text-center md:px-8">
        <div className="w-full md:mx-auto">
          <h3 className="text-background dark:text-foreground text-xl uppercase font-semibold">
            Trabajemos juntos
          </h3>
          <p className="mt-3 font-lora text-background dark:text-foreground text-3xl">
            ¿Quieres una ilustración personalizada?
          </p>
        </div>
        <div className="flex gap-3 items-center mt-4 md:justify-center">
          <ButtonLink
            href="https://www.instagram.com/andrealombardia/"
            target="_blank"
            variant="shadow"
            color="warning"
            endContent={
              <ArrowRightHover className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" />
            }
          >
            Instagram
          </ButtonLink>

          <ButtonLink
            href={`/contacto`}
            variant="light"
            className="font-semibold text-white data-[hover='true']:hover:bg-transparent hover:text-warning hover:opacity-100"
            endContent={
              <ArrowRightHover className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" />
            }
          >
            Contactar
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
