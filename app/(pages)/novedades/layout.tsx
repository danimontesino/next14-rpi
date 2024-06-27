import React from 'react'

export default function RootLayout({
  children,
  instagram,
}: {
  children: React.ReactNode
  instagram: React.ReactNode
}) {
  return (
    <>
      {children}

      {instagram}
    </>
  )
}
