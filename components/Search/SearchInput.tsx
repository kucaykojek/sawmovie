'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useSearch } from '@/hooks/search'

import './SearchInput.css'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toggle, setToggle, keywords, setKeywords } = useSearch()

  function submitSearch(event: React.SyntheticEvent) {
    event.preventDefault()

    const current = new URLSearchParams(
      searchParams ? Array.from(searchParams?.entries()) : ''
    )

    current.set('keywords', keywords)

    const search = current.toString()
    const query = search ? `?${search}` : ''

    setToggle(false)

    return router.replace(`/search${query}`)
  }

  return (
    <>
      {toggle && (
        <div className="search-input">
          <form onSubmit={submitSearch} className="search-input__form">
            <input
              type="text"
              value={keywords}
              placeholder="Search movies..."
              onChange={(e) => setKeywords(e.target.value ?? '')}
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
          <a className="search-input__close" onClick={() => setToggle(false)}>
            <XIcon className=" w-8 h-8" />
          </a>
        </div>
      )}
    </>
  )
}
