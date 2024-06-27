import React from 'react'
import { cn } from '@lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  margin?: boolean
}

export function Main({ children, margin = true, className, ...restProps }: SectionProps) {
  return (
    <main
      className={cn(
        'relative z-[1]',
        {
          'mt-5 sm:mt-6 lg:mt-10': margin,
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </main>
  )
}
