import { NextResponse } from 'next/server'

import fetchJson from '@/libs/fetch-json'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const data = (await fetchJson(`${process.env.API_URL}/movie/${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    })) as any

    return NextResponse.json(
      {
        status: 200,
        data: data ?? {}
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
