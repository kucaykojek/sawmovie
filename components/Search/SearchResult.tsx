'use client'

import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useSearch } from '@/hooks/search'
import { formatNumber } from '@/libs/formatter'

import './SearchResult.css'

export default function SearchResult() {
  const { loading, keywords, result } = useSearch()
  return (
    <div className="search-result">
      <div className="text-lg mb-6">
        Result for:{' '}
        <span className="italic tracking-wide font-semibold">
          &quot;{keywords}&quot;
        </span>
      </div>
      {loading && (
        <div className="flex items-center justify-center py-10 text-primary">
          <Loader2Icon className="animate-spin w-10 h-10" />
        </div>
      )}
      {!loading && (
        <>
          {result.length === 0 && (
            <div className="text-center py-10 text-lg text-neutral-400">
              Movie is not found
            </div>
          )}
          {result.length > 0 && (
            <ul className="search-result__list">
              {result.map((val, index) => (
                <li key={`search-result-item-${index}`}>
                  <Link href={`/movie/${val.id}`}>
                    <Image
                      src={val.poster}
                      fill
                      sizes="330px"
                      alt={val.title}
                      className="search-result__item-image"
                    />
                    <div className="search-result__item-content">
                      <h3 className="text-sm font-semibold">{val.title}</h3>
                      <div className="mt-2 font-semibold text-primary">
                        {formatNumber(val.price, '$0,0')}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
