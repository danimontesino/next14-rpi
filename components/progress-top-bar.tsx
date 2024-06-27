'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export default function ProgressTopBar() {
  return (
    <ProgressBar color="#CA714B" height="4px" options={{ showSpinner: false }} shallowRouting />
  )
}
