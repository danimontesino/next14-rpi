import React from 'react'

export default function RootLayout({
  children,
  photo,
}: {
  children: React.ReactNode
  photo: React.ReactNode
}) {
  return (
    <>
      {children}

      {photo}
    </>
  )
}
