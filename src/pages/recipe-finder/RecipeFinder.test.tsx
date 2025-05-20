import React from 'react'
import { render, screen } from '@testing-library/react'
import RecipeFinder from './RecipeFinder'
import { log } from 'console';

describe('RecipeFinder', () => {

  test.only('renders RecipeFinder without url in api prop', () => {
    render(<RecipeFinder api={'no url value'} />)
    const errorMessage = screen.getByText(/Recipe Finder Error: wrong api value/i)
    expect(errorMessage).toBeInTheDocument()
  });

  test('renders RecipeFinder with url in api prop', () => {
    render(<RecipeFinder api={'https://www.themealdb.com/api.php'} />)
    const title = screen.getByText(/Recipe Finder/i)
    expect(title).toBeInTheDocument()
  });
 })
