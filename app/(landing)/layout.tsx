import React from 'react'
import LandingNav from '@components/landing-nav'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNav />

      <div className="relative">
        {children}

        <footer className="bg-gray-800 text-white text-center py-4">
          <p>© 2021 Company Name</p>
        </footer>
      </div>
    </>
  )
}
