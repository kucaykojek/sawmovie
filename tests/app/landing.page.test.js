import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Page from '../../app/page'

describe('Landing Page', () => {
  it('should renders all sections', () => {
    render(<Page />)

    const sections = [
      'landing-hero',
      'landing-popular-list',
      'landing-upcoming-list',
      'landing-campaign'
    ]

    sections.forEach((section) => {
      const elem = screen.getByTestId(section)
      expect(elem).toBeInTheDocument()
    })
  })
})
