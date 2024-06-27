'use client'

import type { ButtonProps } from '@nextui-org/button'
import { Button } from '@nextui-org/button'
import { useFormStatus } from 'react-dom'
import React from 'react'
import { ArrowRightHover } from '@icons/arrow-right-hover'

interface SubmitProps extends ButtonProps {
  children: React.ReactNode
  loadingText: string
}

export const Submit = ({
  children,
  loadingText,
  ...restProps
}: Omit<SubmitProps, 'type' | 'isLoading' | 'disabled'>) => {
  const { pending } = useFormStatus()

  return (
    <Button
      {...restProps}
      type="submit"
      isLoading={pending}
      disabled={pending}
      endContent={
        <ArrowRightHover className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" />
      }
    >
      {pending ? <>{loadingText}</> : <>{children}</>}
    </Button>
  )
}
