import type { InstagramMedia } from '@lib/definitions'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const searchParams = request.nextUrl.searchParams
  const fields =
    searchParams.get('fields') ||
    'id,media_type,media_url,permalink,caption,thumbnail_url,timestamp,children{media_type,media_url,thumbnail_url}'

  try {
    const response = await fetch(
      `https://graph.instagram.com/${params.id}?fields=${fields}&access_token=${process.env.INSTAGRAM_TOKEN}`,
        {
          cache: 'no-store',
        }
    )
    const item = (await response.json()) as InstagramMedia

    if (!response.ok) {
      return Response.json(
        { error: item || 'Failed to fetch Instagram single data' },
        { status: response.status },
      )
    }

    return Response.json(item)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to fetch Instagram data' }, { status: 500 })
  }
}
