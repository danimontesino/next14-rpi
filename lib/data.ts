'use server'

import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import type { NewsletterType } from '@lib/definitions'

export async function fetchUserByEmail(email: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore()

  try {
    const data = await sql<NewsletterType>`
      SELECT 
        users.email
      FROM users
      WHERE email = ${email};
    `
    return data.rows[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch user by email')
  }
}

export async function fetchUserByEmailConsultingService(email: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore()

  try {
    const data = await sql<NewsletterType>`
      SELECT 
        consultingservice.email
      FROM consultingservice
      WHERE email = ${email};
    `
    return data.rows[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch user by email')
  }
}
