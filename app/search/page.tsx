import SearchResult from '@/components/Search/SearchResult'

export default function SearchPage() {
  return (
    <div
      className="container pt-36 pb-10 min-h-[calc(100vh-3rem)]"
      data-testid="search-result"
    >
      <SearchResult />
    </div>
  )
}
