import { NextResponse } from 'next/server'

import fetchJson from '@/libs/fetch-json'

const validTypes = ['popular', 'upcoming']

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  if (!validTypes.includes(params.type)) {
    return NextResponse.json(
      {
        status: 400,
        message: 'Bad request'
      },
      { status: 400 }
    )
  }

  const { searchParams } = new URL(request.url)
  const page = searchParams?.get('page') ?? 1

  try {
    const data = (await fetchJson(
      `${process.env.API_URL}/movie/${params.type}?page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      }
    )) as any

    return NextResponse.json(
      {
        status: 200,
        data: data.results ?? []
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 404,
        message: 'Not found'
      },
      { status: 404 }
    )
  }
}
