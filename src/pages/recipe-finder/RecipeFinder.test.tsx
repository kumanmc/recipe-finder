import React from 'react'
import { render, screen } from '@testing-library/react'
import RecipeFinder from './RecipeFinder'
import { API_OK, API_KO } from '../../utils/constants'

describe('RecipeFinder', () => {

  test('renders RecipeFinder without url in api prop', () => {
    render(<RecipeFinder api={API_KO} />)
    const errorMessage = screen.getByText(/0023 - Recipe Finder Error: wrong api value/i)
    expect(errorMessage).toBeInTheDocument()
  });

  test('renders RecipeFinder with url in api prop', () => {
    render(<RecipeFinder api={API_OK} />)
    const title = screen.getByText(/Recipe Finder/i)
    expect(title).toBeInTheDocument()
  });

})
