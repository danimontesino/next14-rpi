import { Lora, Raleway } from 'next/font/google'

export const raleway = Raleway({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-raleway',
})

export const lora = Lora({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-lora',
})
