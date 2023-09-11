'use client'

import { Menu, Search, ShoppingBasket, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { useScroll } from '@/hooks/document'

import './Header.css'

export default function Header() {
  const { fromTop } = useScroll()
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
          <a className="has-bubble">
            <ShoppingBasket />
          </a>
          <a>
            <User />
          </a>
          <a className="!text-secondary" onClick={() => setShowMenu(!showMenu)}>
            <Menu />
          </a>
        </div>

        <ul className={`header__nav ${showMenu && 'active'}`}>
          <li>
            <Link href="/">Popular</Link>
          </li>
          <li>
            <Link href="/">Upcoming</Link>
          </li>
          <li>
            <Link href="/">Top Rated</Link>
          </li>
        </ul>

        <div className="header__action">
          <a>
            <Search />
          </a>
          <a className="has-bubble">
            <ShoppingBasket />
          </a>
          <a className="button">Login / Register</a>
        </div>
      </div>
    </header>
  )
}
