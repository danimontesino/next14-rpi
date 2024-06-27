import Link from 'next/link'
import { Button } from '@nextui-org/button'
import React from 'react'

export type ButtonClientProps = {
  href: string
} & React.ComponentProps<typeof Button>

export default function ButtonLink({ href, children, ...props }: ButtonClientProps) {
  return (
    <Button as={Link} href={href} {...props}>
      {children}
    </Button>
  )
}
