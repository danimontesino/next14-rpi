import type { InstagramResponse } from '@lib/definitions'
import { NUMBER_OF_GALLERY_TO_FETCH } from '@lib/definitions'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fields =
    searchParams.get('fields') ||
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
  const limit = searchParams.get('limit') || NUMBER_OF_GALLERY_TO_FETCH
  const after = searchParams.get('after') || ''

  const url = `https://graph.instagram.com/${process.env.INSTAGRAM_USER_ID}/media?fields=${fields}&access_token=${process.env.INSTAGRAM_TOKEN}&limit=${limit}&after=${after}`

  try {
    const response = await fetch(url)

    const { data, paging } = (await response.json()) as InstagramResponse

    if (!response.ok) {
      return Response.json(
        { error: data || 'Failed to fetch Instagram data' },
        { status: response.status },
      )
    }

    if (paging.next) {
      return Response.json({ data, after: paging.cursors.after })
    }

    return Response.json({ data })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to fetch Instagram data' }, { status: 500 })
  }
}
