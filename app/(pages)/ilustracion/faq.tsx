'use client'

import { Accordion, AccordionItem } from '@nextui-org/accordion'
import React from 'react'
import { ArrowRightIcon } from '@icons/arrow-right-icon'
import { Paragraph } from '@ui/text'

export interface FaqProps {
  items: {
    question: string
    answer: string
  }[]
}

export default function Faq({ items }: FaqProps) {
  return (
    <Accordion
      variant="light"
      selectionMode="single"
      itemClasses={{
        trigger: 'group data-[hover="true"]:text-primary font-semibold',
        indicator: 'rotate-0 data-[open="true"]:!rotate-90',
        title: 'group-data-[hover="true"]:text-primary',
      }}
    >
      {items.map((item, i) => (
        <AccordionItem
          key={item.question}
          aria-label={`Accordion ${i}`}
          title={item.question}
          indicator={<ArrowRightIcon width={16} height={16} />}
        >
          <Paragraph>{item.answer}</Paragraph>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
