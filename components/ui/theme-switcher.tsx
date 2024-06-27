'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useSwitch } from '@nextui-org/switch'

import { MoonIcon } from '@icons/moon-icon'
import { SunIcon } from '@icons/sun-icon'
import { Theme } from '@lib/definitions'
import { VisuallyHidden } from '@react-aria/visually-hidden'

export const ThemeSwitcher = () => {
  const { Component, slots, getBaseProps, getInputProps, getWrapperProps } = useSwitch()

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input
            {...getInputProps()}
            onChange={() => setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
          />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              'w-6 h-6 m-0 p-0',
              'flex items-center justify-center',
              'rounded-lg bg-opacity-20 text-foreground dark:text-white',
            ],
          })}
        >
          {theme === Theme.LIGHT ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  )
}
