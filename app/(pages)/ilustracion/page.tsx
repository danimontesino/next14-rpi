import { Divider } from '@nextui-org/divider'
import React from 'react'
import { Illustration as IllustrationEnum } from '@lib/definitions'
import { Section } from '@ui/section'
import Faq from './faq'
import { SectionCta } from './section-cta'
import { Main } from '@ui/main'
import { Paragraph, Subtitle, Title } from '@ui/text'
import type { SectionGalleryProps } from './section-gallery'
import { SectionGallery } from './section-gallery'

export default function Illustration() {
  const itemsGallery: SectionGalleryProps['items'] = {
    [IllustrationEnum.LAS_RAMBLAS_GC_SHOPPING_CENTER]: {
      title: 'Las Ramblas Gran Canaria Shopping Center',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.PERSONAL_ILLUSTRATION_ANDREA]: {
      title: 'Personal Illustration Andrea',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.TEXTBOOK_AL_REVES_METHOD]: {
      title: 'Textbook Al Revés Method',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.MURAL_HOTEL_OHASIS_TENERIFE]: {
      title: 'Mural Hotel Ohasis Tenerife',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.RIBADEO_INDIANO_ILLUSTRATION]: {
      title: 'Ribadeo Indiano',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.MURAL_ISLA_PANCHA]: {
      title: 'Mural Isla Pancha',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.PATTERN_ALICIA_POTTS_RIBADEO_STORE]: {
      title: 'Pattern Alicia Potts Ribadeo Store',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.PATTERN_ALICIA_POTTS_RIBADEO_STORE_2]: {
      title: 'Pattern Alicia Potts Ribadeo Store',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.PATTERN_ALICIA_POTTS_RIBADEO_STORE_3]: {
      title: 'Pattern Alicia Potts Ribadeo Store',
      subtitle: 'Illustration',
    },
    [IllustrationEnum.TEXTBOOK_AL_REVES_METHOD_2]: {
      title: 'Textbook Al Revés Method',
      subtitle: 'Illustration',
    },
  }

  const itemsFaq = Array.from({ length: 3 }, (_, i) => ({
    question: `question_${i + 1}`,
    answer: `answer_${i + 1}`,
  }))

  return (
    <Main>
      <section className="container mx-auto px-4">
        <div className="w-full flex flex-col items-center gap-7">
          <Title className="text-center">Title</Title>
          <h3 className="uppercase text-lg sm:text-xl font-regular text-center">Subtitle</h3>

          <Divider orientation="vertical" className="h-16 bg-foreground" />
        </div>
      </section>

      <SectionGallery items={itemsGallery} />

      <Section marginBetween className="[&>div]:justify-end">
        <div className="gap-6 max-w-prose pr-0 lg:pr-20">
          <h3 className="uppercase text-lg sm:text-xl font-regular">Title</h3>
          <Subtitle>FAQS</Subtitle>

          <Paragraph>Description</Paragraph>

          <Paragraph
            className="uppercase"
            dangerouslySetInnerHTML={{
              __html: `<strong>HOLA</strong>`,
            }}
          />
        </div>

        <div className="flex flex-col">
          <Faq items={itemsFaq} />
        </div>
      </Section>

      <SectionCta />
    </Main>
  )
}
