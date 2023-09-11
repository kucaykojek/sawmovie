import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Page from '../../app/search/page'
import { SearchProvider } from '../../hooks/search'

describe('Search Page', () => {
  it('should renders all sections', () => {
    render(
      <SearchProvider>
        <Page />
      </SearchProvider>
    )

    const sections = ['search-result']

    sections.forEach((section) => {
      const elem = screen.getByTestId(section)
      expect(elem).toBeInTheDocument()
    })
  })
})
