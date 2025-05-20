import React from 'react'
import { render, screen } from '@testing-library/react'
import RecipeFinder from './RecipeFinder'
import { log } from 'console';


describe('RecipeFinder', () => {

  test('renders RecipeFinder without url in api prop', () => {
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



// test('renders RecipeFinder', () => {
//   render(<RecipeFinder />)
//   const title = screen.getByText(/Recipe Finder/i)
//   expect(title).toBeInTheDocument()

//   const searchForm = screen.getByLabelText(/Search for recipes by entering ingredients or keywords/i)
//   expect(searchForm).toBeInTheDocument()
//   expect(searchForm.tagName).toBe('input');
// });

// test('renders RecipeFinder get values fro', () => {
//   render(<RecipeFinder />)
//   const title = screen.getByText(/Recipe Finder/i)
//   expect(title).toBeInTheDocument()
// });

