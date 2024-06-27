import React from 'react'
import Image from 'next/image'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import Link from 'next/link'
import { ThemeSwitcher } from '@ui/theme-switcher'

export default function LandingNav() {
  return (
    <Navbar
      position="static"
      classNames={{
        wrapper: ['!container px-4'],
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

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
