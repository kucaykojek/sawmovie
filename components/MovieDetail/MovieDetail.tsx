'use client'

import {
  MinusIcon,
  PlusIcon,
  ShoppingBasketIcon,
  ThumbsUpIcon
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Movie } from '@/entities/movie'
import { formatNumber } from '@/libs/formatter'

import './MovieDetail.css'

export default function MovieDetail({ movie }: { movie: Movie }) {
  const [quantity, setQuantity] = useState<number>(1)

  return (
    <div className="movie-detail">
      <div
        className="movie-detail__backdrop"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      ></div>
      <div className="movie-detail__body">
        <div className="movie-detail__image">
          <Image src={movie.poster} fill sizes="330px" alt={movie.title} />
        </div>
        <div className="movie-detail__content">
          <div className="movie-detail__title">{movie.title}</div>
          <p className="mb-base">{movie.description}</p>
          <div className="movie-detail__meta">
            <div className="movie-detail__vote">
              <ThumbsUpIcon className="w-5 h-5 text-primary-alt" />
              <strong>{formatNumber(movie.vote_average, '0.0')}</strong>/10
              <span>({movie.vote_count} votes)</span>
            </div>
            {movie.genres && (
              <ul className="movie-detail__genre">
                {movie.genres.map((genre: any, genreIndex: number) => (
                  <li key={`genre-${genreIndex}`}>{genre.name}</li>
                ))}
              </ul>
            )}
          </div>

          <hr />

          <div className="movie-detail__price">
            <strong>{formatNumber(movie.discount_price, '$0,0')}</strong>
            <span className="text-red-500 line-through">
              {formatNumber(movie.price, '$0,0')}{' '}
            </span>
          </div>

          <hr />

          <div className="movie-detail__selection">
            <div className="movie-detail__selection-quantity">
              <div className="text-sm font-semibold mb-2">Quantity</div>
              <div className="quantity-selection">
                <button
                  type="button"
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <MinusIcon />
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  readOnly
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button
                  type="button"
                  disabled={quantity >= movie.quantity}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
            <div className="movie-detail__selection-add-to-cart mt-4">
              <button type="button">
                <ShoppingBasketIcon className="mr-2" /> Tambah Ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
