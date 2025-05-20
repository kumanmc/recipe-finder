import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import SearchWrapper from './SearchWrapper';
import { API_OK } from '../../../utils/constants';

global.fetch = jest.fn();
const mockedFetch = global.fetch as jest.Mock;

describe('SearchWrapper', () => {

  beforeEach(() => {
    mockedFetch.mockClear();
    jest.clearAllMocks();
  });

  test('renders SearchWrapper, search and API does not work', async () => {
    const setCriticalErrorMock = jest.fn();
    mockedFetch.mockRejectedValueOnce(new Error('API server down'));

    render(
      <SearchWrapper api={API_OK} setCriticalError={setCriticalErrorMock} />
    )
    let spinner = screen.queryByTestId('loading-grid-loader');
    expect(spinner).toBeNull();

    const title = screen.getByTestId('search-title') as HTMLInputElement;
    expect(title).toBeInTheDocument();

    // check if butotn is disabled when input is empty
    const recipeSearchInput = screen.getByLabelText(/Ingredient or keywords:/i);
    expect(recipeSearchInput).toHaveValue('');
    let searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeDisabled();

    // Simulate user types in the input
    fireEvent.change(recipeSearchInput, { target: { value: 'Pasta' } });
    expect(recipeSearchInput).toHaveValue('Pasta');
    expect(searchButton).not.toBeDisabled();

    // Simulate form submission
    fireEvent.submit(screen.getByRole('form'));

    //async actions after sending the form
    await waitFor(() => {
      expect(screen.getByTestId('loading-grid-loader')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(`${API_OK}search.php?s=Pasta`);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-grid-loader')).toBeNull();
    });

    //IMPORTANT: setCriticalError is in SearchFinder and shows the error message in the alert
    // overwriting any other render, scenario like this one will be created on SearchFinder
    await waitFor(() => {
      expect(setCriticalErrorMock).toHaveBeenCalledTimes(1);
      expect(setCriticalErrorMock).toHaveBeenCalledWith('0024 - Error: API server down');
    });

  });


})
