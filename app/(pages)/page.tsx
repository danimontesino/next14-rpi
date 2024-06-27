import { MockupPhone } from '@ui/mockup-phone'
import { Image } from '@nextui-org/image'
import NextImage from 'next/image'
import { Routes, VIDEO_ID } from '@lib/definitions'
import Link from 'next/link'
import { PlayIcon } from '@icons/play-icon'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24">
      <MockupPhone>
        <Image
          as={NextImage}
          src="/images/andrea-mobile.jpeg"
          alt="Andrea trabajo"
          sizes="100%"
          classNames={{
            wrapper: 'w-full h-full !max-w-full max-h-full',
          }}
          fill
        />
        <div className="absolute w-full h-full">
          <Link
            className="relative block w-full h-full"
            href={`/${Routes.resources.video}/${VIDEO_ID}`}
            scroll={false}
            passHref
            data-disable-nprogress={true}
          >
            <PlayIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer text-white transition-transform duration-300 ease-in-out hover:scale-110" />
          </Link>
        </div>
      </MockupPhone>
    </main>
  )
}
