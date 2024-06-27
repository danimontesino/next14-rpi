import React from 'react'
import { cn } from '@lib/utils'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  className?: string
  dangerouslySetInnerHTML?: { __html: string }
}

export function Title({ children, className, ...restProps }: TextProps) {
  return (
    <h1
      className={cn(
        'font-lora text-4xl sm:text-5xl sm:leading-[55px] font-bold dark:text-primary',
        className,
      )}
      {...restProps}
    >
      {children}
    </h1>
  )
}

export function Subtitle({ children, className, ...restProps }: TextProps) {
  return (
    <h2
      className={cn(
        'font-lora text-2xl md:text-4xl md:leading-[1.25] font-bold dark:text-primary',
        className,
      )}
      {...restProps}
    >
      {children}
    </h2>
  )
}

export function Heading({ children, className, ...restProps }: TextProps) {
  return (
    <h3
      className={cn('font-lora text-xl md:text-2xl font-bold dark:text-primary', className)}
      {...restProps}
    >
      {children}
    </h3>
  )
}

export function Paragraph({
  children,
  className,
  dangerouslySetInnerHTML,
  ...restProps
}: TextProps) {
  if (dangerouslySetInnerHTML) {
    return (
      <p
        className={cn('font-raleway text-base leading-loose', className)}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        {...restProps}
      />
    )
  }

  return (
    <p className={cn('font-raleway text-base leading-loose', className)} {...restProps}>
      {children}
    </p>
  )
}
