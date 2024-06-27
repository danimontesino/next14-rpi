import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveToLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch (e) {}
}

export function getFromLocalStorage(key: string) {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    return null
  }
}

export const formatDateToSpanish = (isoDate: string) => {
  const date = new Date(isoDate)

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Madrid',
    timeZoneName: 'short',
  } as Intl.DateTimeFormatOptions

  return new Intl.DateTimeFormat('es-ES', options).format(date)
}
