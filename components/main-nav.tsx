'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { ThemeSwitcher } from '@ui/theme-switcher'
import { FacebookIcon } from '@components/icons/facebook-icon'
import { InstagramIcon } from '@components/icons/instagram-icon'
import { Divider } from '@nextui-org/divider'

export interface MainNavProps {
  items: {
    label: string
    href: string
  }[]
}

export default function MainNav({ items }: MainNavProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'

  const isCurrentPage = (href: string) => {
    return pathname === href
  }

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      position="sticky"
      classNames={{
        wrapper: ['!container p-4'],
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          '[&>a]:data-[active=true]:text-primary',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link className="w-full" href="/">
            <Image
              src="/images/andrea-lombardia.png"
              alt="Andrea Lombardia Logo"
              width={100}
              height={46}
              className="w-[100px] h-[46px]"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {items.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={isCurrentPage(item.href)}
            className="group"
          >
            <Link
              className="w-full font-semibold group-hover:text-primary transition-colors duration-200"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Link
            className="w-6 h-6 mr-0 p-[4px] rounded-full bg-foreground text-background"
            target="_blank"
            href="https://www.facebook.com/andrealombardiagarcia/"
          >
            <FacebookIcon className="size-4" />
          </Link>
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Link
            className="w-6 h-6 mr-0 p-[4px] rounded-full bg-foreground text-background"
            target="_blank"
            href="https://www.instagram.com/andrealombardia/"
          >
            <InstagramIcon className="size-4" />
          </Link>
        </NavbarItem>

        <Divider orientation="vertical" className="hidden lg:block max-h-6 bg-divider-400" />

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        {items.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} isActive={isCurrentPage(item.href)}>
            <Link className="w-full" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
