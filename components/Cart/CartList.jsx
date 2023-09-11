'use client'

import { Loader2Icon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'

import { useCart } from '@/hooks/cart'
import { formatNumber } from '@/libs/formatter'

import './CartList.css'
import Link from 'next/link'

export default function CartList() {
  const { loading, cart, removeCartItem } = useCart()

  return (
    <div className="bg-white rounded-xl">
      {loading && (
        <div className="flex items-center justify-center py-10 text-primary">
          <Loader2Icon className="animate-spin w-10 h-10" />
        </div>
      )}
      {!loading && (
        <>
          {cart.length === 0 && (
            <div className="text-center py-10 text-lg text-neutral-400">Your Cart is Empty</div>
          )}
          {cart.length > 0 && (
            <ul className="cart-list">
              {cart.map((val, index) => (
                <li key={`cart-item-${index}`}>
                  <Image
                    src={val.poster}
                    width={100}
                    height={100}
                    alt={val.title}
                    className="cart-item__image"
                  />
                  <div className="cart-item__content">
                    <Link href={`/movie/${val.id}`}><h3 className="text-xl font-semibold">{val.title}</h3></Link>
                    <div className="mt-2 text-sm">
                      Quantity:{' '}
                      <strong>{formatNumber(val.quantity, '0,0')}</strong>
                    </div>
                  </div>
                  <div className="cart-item__price">
                    <div className="text-sm text-neutral-400">Subtotal</div>
                    <div className="text-lg font-semibold text-primary">
                      {formatNumber(val.quantity * val.discount_price, '$0,0')}
                    </div>
                  </div>
                  <a className="cart-item__action text-red-600 cursor-pointer" onClick={() => removeCartItem(val.id)}>
                    <Trash2Icon />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
