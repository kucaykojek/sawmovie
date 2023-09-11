'use client'

import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { Movie } from '@/entities/movie'

type TCartContext = {
  loading: boolean
  cart: Movie[]
  setLoading: SetStateAction<boolean>
  addToCart: Function
  removeCartItem: Function
}

export const CartContext = createContext<TCartContext | undefined>(undefined)

export const CartProvider: React.FC<any> = (props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [cart, setCart] = useState<any>([])
  const storageKey = 'wemov-cart'

  const value = useMemo(() => {
    return {
      loading,
      cart
    }
  }, [loading, cart])

  useEffect(() => {
    retrieveCart()
  }, [])

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem(storageKey, JSON.stringify(cart))
    }
  }, [cart])

  async function retrieveCart() {
    setLoading(true)
    try {
      if (localStorage && localStorage.getItem(storageKey)) {
        setCart(JSON.parse(localStorage.getItem(storageKey) ?? '') ?? [])
      } else {
        setCart([])
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function addToCart(item: Movie, quantity: number = 1) {
    if (!item || quantity < 0) {
      return
    }

    const clonedCart = [...cart]
    const itemIndex = clonedCart.findIndex((val) => val.id == item.id)

    if (itemIndex > -1) {
      clonedCart[itemIndex] = { ...item, quantity }
    } else {
      clonedCart.push({ ...item, quantity })
    }

    setCart(clonedCart)
  }

  function removeCartItem(id: number) {
    if (!id) {
      return
    }

    const clonedCart = [...cart]
    const itemIndex = clonedCart.findIndex((val) => val.id == id)

    if (itemIndex > -1) {
      clonedCart.splice(itemIndex, 1)
    } else {
      return
    }

    setCart(clonedCart)
  }

  return (
    <CartContext.Provider
      value={{ ...value, addToCart, removeCartItem }}
      {...props}
    />
  )
}

export const useCart = (): TCartContext => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within an CartProvider')
  }
  return context
}
