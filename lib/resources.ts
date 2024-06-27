import { Illustration } from '@lib/definitions'

export function getResourceImageIllustrationById(imageId: string) {
  const illustrations = Object.values(Illustration)

  if (!illustrations.includes(imageId as any)) {
    return null
  }

  return `/images/illustration/original/${imageId}.jpg`
}

export function getResourceImageIllustrationByIndex(index: number) {
  const illustrations = Object.values(Illustration)

  if (index < 0 || index >= illustrations.length) {
    return null
  }

  return getResourceImageIllustrationById(illustrations[index])
}
