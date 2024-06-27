import React from 'react'
import { cn } from '@lib/utils'
import NextImage from 'next/image'
import { Image } from '@nextui-org/image'

export interface BentoProps {
  image: string
  title: string
  children?: React.ReactNode
  link?: string
  className?: string
  as?: 'a' | 'div'
}

export const Bento = ({ children, title, image, link, className, as = 'div' }: BentoProps) => {
  const Component = as

  return (
    <Component
      href={link}
      className={cn(
        'col-span-5 relative rounded-xl backdrop-blur-md border border-black/10 shadow-inner shadow-white/10 overflow-hidden group',
        className,
      )}
    >
      <div
        className="absolute bottom-0 top-0 z-10 h-full w-full
    bg-gradient-to-b from-transparent from-40% via-[#191919]/50 to-[#191919]/80"
      ></div>

      <div
        className="transition-scale absolute bottom-0 left-0 top-0
        -z-10 h-full w-full bg-[#191919]
        bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
      >
        <Image
          as={NextImage}
          src={image}
          sizes="100%"
          alt={title}
          fetchPriority="high"
          className="relative w-full h-full object-cover object-center"
          priority
          removeWrapper
          fill
        />
      </div>

      <div className="relative z-20 flex h-full select-none flex-col justify-end gap-1 p-2 text-lg md:p-6">
        <h2 className="mb-4 font-lora text-balance text-3xl font-semibold text-white">{title}</h2>

        {children}
      </div>
    </Component>
  )
}
