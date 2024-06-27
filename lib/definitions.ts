import type React from 'react'

export type PageCommonProps = {
  children?: React.ReactNode
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum Service {
  BRANDING = 'branding',
  VISUAL_COMMUNICATION = 'visual-communication',
  COUNSELING = 'counseling',
}

export type NewsletterType = {
  id: string
  email: string
  name: string
  policy: boolean
  date: string
}

export enum Clients {
  DELICIAS_ROASTERS = 'delicias-roasters',
  FLORES_ANANDA = 'flores-ananda',
  AYU_ALLANDE = 'ayu-allande',
}

export enum AboutMe {
  TRAINING = 'training',
  LABOR = 'labor',
  ORIGIN = 'origin',
  PROJECTS = 'projects',
}

export enum Illustration {
  LAS_RAMBLAS_GC_SHOPPING_CENTER = 'las-ramblas-gran-canaria-shopping-center',
  RIBADEO_INDIANO_ILLUSTRATION = 'ribadeo-indiano-illustration',
  MURAL_ISLA_PANCHA = 'mural-isla-pancha',
  MURAL_HOTEL_OHASIS_TENERIFE = 'mural-hotel-ohasis-tenerife',
  PATTERN_ALICIA_POTTS_RIBADEO_STORE = 'pattern-alicia-potts-ribadeo-store',
  PATTERN_ALICIA_POTTS_RIBADEO_STORE_2 = 'lg_pattern-alicia-potts-ribadeo-store-2',
  PATTERN_ALICIA_POTTS_RIBADEO_STORE_3 = 'lg_pattern-alicia-potts-ribadeo-store-3',
  PERSONAL_ILLUSTRATION_ANDREA = 'personal-illustration-andrea',
  TEXTBOOK_AL_REVES_METHOD = 'textbook-al-reves-method',
  TEXTBOOK_AL_REVES_METHOD_2 = 'lg_textbook-al-reves-method-2',
}

export const Routes = {
  illustration: 'ilustracion',
  services: 'servicios',
  freeResource: 'recurso-gratuito',
  news: 'novedades',
  resources: {
    video: 'video',
  },
} as const

export enum EMAIL_FROM {
  HOME_FREE_RESOURCE = 'home-free-resource',
  LANDING_CONSULTING = 'landing-consulting',
}

export type EmailType = {
  email: string
  name: string
  from: EMAIL_FROM
}

export type InstagramMediaChildrenData = Omit<InstagramMedia, 'children' | 'caption'>[]

export type InstagramMedia = {
  id: string
  media_type: InstagramMediaTypes
  media_url: string
  permalink: string
  caption: string
  thumbnail_url: string
  timestamp: string
  children?: {
    data: InstagramMediaChildrenData
  }
}

export type InstagramPagination = {
  cursors: {
    before: string
    after: string
  }
  next: string
}

export type InstagramResponse = {
  data: InstagramMedia[]
  paging: InstagramPagination
}

export type InApiDetailResponse = InstagramMedia

export type InApiAllResponse = {
  data: InstagramMedia[]
  after?: string
}

export enum InstagramMediaTypes {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  CAROUSEL_ALBUM = 'CAROUSEL_ALBUM',
}

export const NUMBER_OF_GALLERY_TO_FETCH = 12

export const VIDEO_ID = '945175826'
