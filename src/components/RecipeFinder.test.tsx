import React from 'react'
import { render, screen } from '@testing-library/react'
import RecipeFinder from './RecipeFinder'
import { API_OK, API_KO } from '../utils/constants'
import { AppProvider } from '../context/AppContext';

describe('RecipeFinder', () => {

  test('renders RecipeFinder without url in api prop', () => {
    render(<AppProvider><RecipeFinder api={API_KO} /></AppProvider>)
    const criticalError = screen.getByText(/0023 - Recipe Finder Error: wrong api value/i)
    expect(criticalError).toBeInTheDocument()
  });

  test('renders RecipeFinder with url in api prop', () => {
    render(<AppProvider><RecipeFinder api={API_OK} /></AppProvider>)
    const title = screen.getByTestId(/main-title/i)
    expect(title).toBeInTheDocument()
  });

})
