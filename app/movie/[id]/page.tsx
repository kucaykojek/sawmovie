import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import MovieDetail from '@/components/Movie/MovieDetail'
import SimilarList, {
  SimilarListProvider
} from '@/components/Movie/SimilarList'
import { Movie } from '@/entities/movie'
import fetchJson from '@/libs/fetch-json'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id
  let title = 'SawMovie'

  if (!id) {
    return {
      title
    }
  }

  try {
    const result = (await fetchJson(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/detail/${id}`
    )) as any

    return {
      title: result?.data?.title ?? 'SawMovie'
    }
  } catch (error) {
    console.error(error)
  }

  return {
    title
  }
}

export default async function MovieDetailPage({ params }: any) {
  const { id } = params
  if (!id) {
    redirect('/')
  }

  const movie: Movie | any = await fetchMovieDetail()

  async function fetchMovieDetail(): Promise<Movie | null> {
    try {
      const result = (await fetchJson(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/detail/${id}`
      )) as any

      if (result?.data?.id) {
        const price =
          result.data.id > 10000
            ? Math.floor(result.data.id / 10)
            : result.data.id

        return {
          id: Number(result.data.id),
          title: result.data.title,
          backdrop: result.data.backdrop_path
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/original${result.data.backdrop_path}`
            : '',
          poster: result.data.poster_path
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/w220_and_h330_face${result.data.poster_path}`
            : '',
          price,
          discount_price: Math.floor(price - 0.2 * price),
          description: result.data.overview,
          vote_average: result.data.vote_average || 0,
          vote_count: result.data.vote_count || 0,
          genres: result.data.genres || null,
          companies: result.data.production_companies || null
        }
      }
    } catch (error) {
      console.error(error)
    }

    return null
  }

  if (!movie) {
    redirect('/')
  }

  return (
    <div className="container">
      <MovieDetail movie={movie} />
      <div className="mt-6 pb-6">
        <SimilarListProvider>
          <SimilarList />
        </SimilarListProvider>
      </div>
    </div>
  )
}
