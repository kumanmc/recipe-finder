import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import SearchAndFilterForm from './SearchAndFilterForm';
import { API_OK, API_KO } from '../../../utils/constants';

global.fetch = jest.fn();
const mockedFetch = global.fetch as jest.Mock;

describe('SearchAndFilterForm', () => {

  beforeEach(() => {
    mockedFetch.mockClear();
  });

  test('renders SearchAndFilterForm, loading is shown and API fails when setErrorMessage is executed', async () => {
    const setErrorMessageMock = jest.fn();
    render(
      <SearchAndFilterForm
        api={API_KO}
        setErrorMessage={setErrorMessageMock}
      />
    )
    const spinner = screen.queryByTestId('loading-grid-loader');
    expect(spinner).toBeNull();

    //SearchForm is rendered
    const title = screen.getByTestId('search-title') as HTMLInputElement;
    expect(title).toBeInTheDocument();

    // check if butotn is disabled when input is empty
    const recipeSearchInput = screen.getByLabelText(/Ingredient or keywords:/i);
    expect(recipeSearchInput).toHaveValue('');
    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeDisabled();

    // Simulate user typing in the input
    fireEvent.change(recipeSearchInput, { target: { value: 'Pasta' } });
    expect(recipeSearchInput).toHaveValue('Pasta');
    expect(searchButton).not.toBeDisabled();


  });


})
