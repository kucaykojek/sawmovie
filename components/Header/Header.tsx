'use client'

import { Menu, SearchIcon, ShoppingBasketIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { useCart } from '@/hooks/cart'
import { useScroll } from '@/hooks/document'
import { useSearch } from '@/hooks/search'

import './Header.css'

export default function Header() {
  const { fromTop } = useScroll()
  const { cart } = useCart()
  const { setToggle } = useSearch()
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
          <a onClick={() => setToggle(true)}>
            <SearchIcon />
          </a>
          <Link href="/cart" className={`${cart.length > 0 && 'has-bubble'}`}>
            <ShoppingBasketIcon />
          </Link>
          <a className="!text-secondary" onClick={() => setShowMenu(!showMenu)}>
            <Menu />
          </a>
        </div>

        <ul className={`header__nav ${showMenu && 'active'}`}>
          <li className="block md:hidden mt-2">
            <a>Login / Register</a>
          </li>
          <li>
            <a>Popular</a>
          </li>
          <li>
            <a>Upcoming</a>
          </li>
          <li className="md:hidden lg:block">
            <a>Top Rated</a>
          </li>
        </ul>

        <div className="header__action">
          <a onClick={() => setToggle(true)}>
            <SearchIcon />
          </a>
          <Link href="/cart" className={`${cart.length > 0 && 'has-bubble'}`}>
            <ShoppingBasketIcon />
          </Link>
          <a className="button">Login / Register</a>
        </div>
      </div>
    </header>
  )
}
