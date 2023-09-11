import { NextResponse } from 'next/server'

import fetchJson from '@/libs/fetch-json'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keywords = searchParams.get('keywords')
  const page = searchParams.get('page') ?? 1

  if (!keywords) {
    return NextResponse.json(
      {
        status: 400,
        message: 'Bad request'
      },
      { status: 400 }
    )
  }

  try {
    const data = (await fetchJson(
      `${process.env.API_URL}/search/keyword?query=${keywords}&page=${page}`,
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
