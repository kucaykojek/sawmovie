import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Page from '../../app/cart/page'
import { CartProvider } from '../../hooks/cart'

describe('Cart Page', () => {
  it('should renders all sections', () => {
    render(
      <CartProvider>
        <Page />
      </CartProvider>
    )

    const sections = ['cart-list', 'cart-summary']

    sections.forEach((section) => {
      const elem = screen.getByTestId(section)
      expect(elem).toBeInTheDocument()
    })
  })
})
