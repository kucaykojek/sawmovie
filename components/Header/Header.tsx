'use client'

import { Menu, Search, ShoppingBasket, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { useCart } from '@/hooks/cart'
import { useScroll } from '@/hooks/document'

import './Header.css'

export default function Header() {
  const { fromTop } = useScroll()
  const { cart } = useCart()
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const isStick = useMemo(() => {
    return fromTop > 40 // mt-10
  }, [fromTop])

  return (
    <header className={`header${isStick ? ' is-stick' : ''}`}>
      <div className="container">
        <Link href="/" className="header__logo">
          <Image src="/logo.svg" width={252} height={48} alt="sawmovie" />
        </Link>

        <div className="header__toggle">
          <Link href="/cart" className={`${cart.length > 0 && 'has-bubble'}`}>
            <ShoppingBasket />
          </Link>
          <a>
            <User />
          </a>
          <a className="!text-secondary" onClick={() => setShowMenu(!showMenu)}>
            <Menu />
          </a>
        </div>

        <ul className={`header__nav ${showMenu && 'active'}`}>
          <li>
            <a>Popular</a>
          </li>
          <li>
            <a>Upcoming</a>
          </li>
          <li>
            <a>Top Rated</a>
          </li>
        </ul>

        <div className="header__action">
          <a>
            <Search />
          </a>
          <Link href="/cart" className={`${cart.length > 0 && 'has-bubble'}`}>
            <ShoppingBasket />
          </Link>
          <a className="button">Login / Register</a>
        </div>
      </div>
    </header>
  )
}
