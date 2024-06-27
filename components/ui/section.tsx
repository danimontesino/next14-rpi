import React from 'react'
import { cn } from '@lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  marginBetween?: boolean
  marginEnd?: boolean
  marginStart?: boolean
  className?: string
}

export function Section({
  children,
  marginBetween = false,
  marginEnd = false,
  marginStart = false,
  className,
  ...restProps
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative container mx-auto px-4 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-4 [&>div]:flex [&>div]:flex-col [&>div]:justify-center',
        {
          'my-10 md:my-16 lg:my-24': marginBetween,
          'mb-10 md:mb-16 lg:mb-24': marginEnd,
          'mt-10 md:mt-16 lg:mt-24': marginStart,
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </section>
  )
}
