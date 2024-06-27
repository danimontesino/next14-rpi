import React from 'react'
import MainNav from '@components/main-nav'
import ProgressTopBar from '@components/progress-top-bar'

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  const menuItems = [
    {
      label: 'Ilustración',
      href: '/ilustracion',
    },
    {
      label: 'Novedades',
      href: '/novedades',
    },
  ]

  return (
    <>
      <ProgressTopBar />

      <MainNav items={menuItems} />

      {children}

      {modal}

      <footer>2021 © All rights reserved</footer>
    </>
  )
}
