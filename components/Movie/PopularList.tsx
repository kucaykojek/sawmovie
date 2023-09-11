'use client'

import { Loader2Icon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import fetchJson from '@/libs/fetch-json'
import { formatNumber } from '@/libs/formatter'

import './PopularList.css'

type TPopularListContext = {
  loading: boolean
  data: any
  setLoading: SetStateAction<boolean>
}

export const PopularListContext = createContext<
  TPopularListContext | undefined
>(undefined)

export const PopularListProvider: React.FC<any> = (props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>([])

  const value = useMemo(() => {
    return {
      loading,
      data
    }
  }, [loading, data])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = (await fetchJson('/api/movie/list/popular')) as any

      if (res?.data) {
        setData(res.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return <PopularListContext.Provider value={{ ...value }} {...props} />
}

export const usePopularList = (): TPopularListContext => {
  const context = useContext(PopularListContext)
  if (context === undefined) {
    throw new Error('usePopularList must be used within an PopularListProvider')
  }
  return context
}

export default function PopularList() {
  const { loading, data } = usePopularList()
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  }

  return (
    <div className="popular-list">
      <h2 className="popular-list__title">
        <StarIcon className="mr-4" />
        Popular Movies
      </h2>
      {loading && (
        <div className="flex items-center justify-center py-10 text-primary">
          <Loader2Icon className="animate-spin w-10 h-10" />
        </div>
      )}
      {!loading && (
        <Slider {...settings}>
          {data.map((val: any, index: number) => (
            <div key={`popular-item-${index}`} className="popular-list__item">
              <Link
                href={`/movie/${val.id}`}
                className="popular-list__item-card"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/w220_and_h330_face${val?.poster_path}`}
                  fill
                  sizes="330px"
                  alt={val.original_title}
                  className="popular-list__item-image"
                />
                <div className="popular-list__item-content">
                  <h1 className="popular-list__item-title">{val.title}</h1>
                  <div className="popular-list__item-description">
                    {val.overview}
                  </div>
                  <p className="popular-list__item-price">
                    {formatNumber(
                      val.id > 100 ? Math.floor(val.id / 10) : val.id,
                      '$0,0'
                    )}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}
