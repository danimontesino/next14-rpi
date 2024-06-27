'use client'

import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Theme } from '@lib/definitions'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" enableSystem defaultTheme={Theme.SYSTEM}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
