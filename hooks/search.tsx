'use client'

import { useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { Movie } from '@/entities/movie'
import fetchJson from '@/libs/fetch-json'

type TSearchContext = {
  loading: boolean
  setLoading: (_: boolean) => void
  toggle: boolean
  setToggle: (_: boolean) => void
  keywords: string
  setKeywords: (_: string) => void
  page: number
  setPage: (_: number) => void
  result: Movie[]
}

export const SearchContext = createContext<TSearchContext | undefined>(
  undefined
)

export const SearchProvider: React.FC<any> = (props) => {
  const searchParams = useSearchParams()
  const queryKeywords = searchParams.get('keywords')

  const [loading, setLoading] = useState<boolean>(true)
  const [toggle, setToggle] = useState<boolean>(false)
  const [result, setResult] = useState<any>([])
  const [keywords, setKeywords] = useState<string>(queryKeywords ?? '')
  const [page, setPage] = useState<number>(1)

  const value = useMemo(() => {
    return {
      loading,
      toggle,
      result,
      keywords,
      page
    }
  }, [loading, result, keywords, page, toggle])

  useEffect(() => {
    fetchData()
  }, [queryKeywords, page])

  async function fetchData() {
    if (!keywords) {
      return
    }

    setLoading(true)
    try {
      const res = (await fetchJson(
        `/api/movie/search?keywords=${keywords}&page=${page}`
      )) as any

      if (res?.data) {
        setResult(
          res.data
            .filter((val: any) => !!val.poster_path)
            .map((val: any) => {
              const price = val.id > 10000 ? Math.floor(val.id / 10) : val.id
              return {
                id: Number(val.id),
                title: val.title,
                backdrop: val.backdrop_path
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/original${val.backdrop_path}`
                  : '',
                poster: val.poster_path
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/w220_and_h330_face${val.poster_path}`
                  : '',
                price,
                discount_price: Math.floor(price - 0.2 * price),
                description: val.overview,
                vote_average: val.vote_average || 0,
                vote_count: val.vote_count || 0,
                genres: val.genres || null,
                companies: val.production_companies || null
              }
            })
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SearchContext.Provider
      value={{ ...value, setKeywords, setPage, setToggle }}
      {...props}
    />
  )
}

export const useSearch = (): TSearchContext => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within an SearchProvider')
  }
  return context
}
