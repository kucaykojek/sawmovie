'use client'

import { Loader2Icon } from 'lucide-react'
import { useMemo } from 'react'

import { useCart } from '@/hooks/cart'
import { formatNumber } from '@/libs/formatter'

import './CartSummary.css'

export default function CartSummary() {
  const { loading, cart } = useCart()

  const totalItem = useMemo(() => {
    return cart.length ?? 0
  }, [cart])

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.discount_price * item.quantity
    }, 0)
  }, [cart])

  return (
    <div className="cart-summary">
      <h2 className="text-lg font-semibold">Summary</h2>
      <ul className="cart-summary__breakdown my-4">
        <li>
          <div className="cart-summary__breakdown-label">Total Item</div>
          <div className="cart-summary__breakdown-value">
            {loading ? (
              <Loader2Icon className="animate-spin w-4 h-4" />
            ) : (
              formatNumber(totalItem, '0,0')
            )}
          </div>
        </li>
        <li>
          <div className="cart-summary__breakdown-label">Total Price</div>
          <div className="cart-summary__breakdown-value">
            {loading ? (
              <Loader2Icon className="animate-spin w-4 h-4" />
            ) : (
              formatNumber(totalPrice, '$0,0')
            )}
          </div>
        </li>
      </ul>
      <button className="cart-summary__button" disabled={totalItem === 0}>
        Checkout
      </button>
    </div>
  )
}
