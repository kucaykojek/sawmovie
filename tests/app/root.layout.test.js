import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Layout from '../../app/layout'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn()
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn()
  }))
}))

describe('Root Layout', () => {
  it('should renders all sections', () => {
    render(<Layout />)

    const sections = ['layout-header', 'layout-footer']

    sections.forEach((section) => {
      const elem = screen.getByTestId(section)
      expect(elem).toBeInTheDocument()
    })
  })
})
