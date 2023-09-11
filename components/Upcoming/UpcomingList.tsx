'use client'

import { CalendarClockIcon, Loader2Icon } from 'lucide-react'
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

import './UpcomingList.css'

type TUpcomingListContext = {
  loading: boolean
  data: any
  setLoading: SetStateAction<boolean>
}

export const UpcomingListContext = createContext<
  TUpcomingListContext | undefined
>(undefined)

export const UpcomingListProvider: React.FC<any> = (props) => {
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
      const res = (await fetchJson('/api/movie/list/upcoming')) as any

      if (res?.data) {
        setData(res.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UpcomingListContext.Provider value={{ ...value, setLoading }} {...props} />
  )
}

export const useUpcomingList = (): TUpcomingListContext => {
  const context = useContext(UpcomingListContext)
  if (context === undefined) {
    throw new Error(
      'useUpcomingList must be used within an UpcomingListProvider'
    )
  }
  return context
}

export default function UpcomingList() {
  const { loading, data } = useUpcomingList()
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
    <div className="upcoming-list">
      <h2 className="upcoming-list__title">
        <CalendarClockIcon className="mr-4" />
        Upcoming Movies
      </h2>
      {loading && (
        <div className="flex items-center justify-center py-10 text-white">
          <Loader2Icon className="animate-spin w-10 h-10" />
        </div>
      )}
      {!loading && (
        <Slider {...settings}>
          {data.map((val: any, index: number) => (
            <div key={`upcoming-item-${index}`} className="upcoming-list__item">
              <Link
                href={`/movie/${val.id}`}
                className="upcoming-list__item-card"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/w220_and_h330_face${val?.poster_path}`}
                  fill
                  sizes="330px"
                  alt={val.original_title}
                  className="upcoming-list__item-image"
                />
                <div className="upcoming-list__item-content">
                  <h1 className="upcoming-list__item-title">{val.title}</h1>
                  <div className="upcoming-list__item-description">
                    {val.overview}
                  </div>
                  <p className="upcoming-list__item-price">
                    {formatNumber(Math.floor(val.id / 100), '$0,0')}
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
