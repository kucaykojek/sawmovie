'use client'

import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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

import './SimilarList.css'

type TSimilarListContext = {
  loading: boolean
  data: any
  setLoading: SetStateAction<boolean>
}

export const SimilarListContext = createContext<
  TSimilarListContext | undefined
>(undefined)

export const SimilarListProvider: React.FC<any> = (props) => {
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>([])

  const value = useMemo(() => {
    return {
      loading,
      data
    }
  }, [loading, data])

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = (await fetchJson(`/api/movie/detail/${id}/similar`)) as any

      if (res?.data) {
        setData(res.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return <SimilarListContext.Provider value={{ ...value }} {...props} />
}

export const useSimilarList = (): TSimilarListContext => {
  const context = useContext(SimilarListContext)
  if (context === undefined) {
    throw new Error('useSimilarList must be used within an SimilarListProvider')
  }
  return context
}

export default function SimilarList() {
  const { loading, data } = useSimilarList()
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  }

  return (
    <div className="similar-list">
      <h2 className="similar-list__title">Similar Movies</h2>
      {loading && (
        <div className="flex items-center justify-center py-10 text-primary">
          <Loader2Icon className="animate-spin w-10 h-10" />
        </div>
      )}
      {!loading && (
        <Slider {...settings}>
          {data.map((val: any, index: number) => (
            <div key={`similar-item-${index}`} className="similar-list__item">
              <Link
                href={`/movie/${val.id}`}
                className="similar-list__item-card"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/w220_and_h330_face${val?.poster_path}`}
                  fill
                  sizes="330px"
                  alt={val.original_title}
                  className="similar-list__item-image"
                />
                <div className="similar-list__item-content">
                  <h1 className="similar-list__item-title">{val.title}</h1>
                  <div className="similar-list__item-description">
                    {val.overview}
                  </div>
                  <p className="similar-list__item-price">
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
