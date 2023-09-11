import { ShoppingBasketIcon } from 'lucide-react'

import CartList from '@/components/Cart/CartList'
import CartSummary from '@/components/Cart/CartSummary'

export default function Cart() {
  return (
    <div className="container pt-36 pb-10 min-h-[calc(100vh-3rem)]">
      <h1 className="flex items-center text-2xl font-semibold tracking-wide mb-4 pl-4">
        <ShoppingBasketIcon className="mr-2 text-primary" />
        Cart
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CartList />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
