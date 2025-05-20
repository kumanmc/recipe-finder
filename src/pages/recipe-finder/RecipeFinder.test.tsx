import React from 'react'
import { render, screen } from '@testing-library/react'
import RecipeFinder from './RecipeFinder'

test('renders RecipeFinder', () => {
  render(<RecipeFinder />)
  const title = screen.getByText(/Recipe Finder/i)
  expect(title).toBeInTheDocument()
});