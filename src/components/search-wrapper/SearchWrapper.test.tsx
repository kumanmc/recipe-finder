import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import SearchWrapper from './SearchWrapper';
import { API_OK } from '../../utils/constants';
import meals from '../../test-data/meals.one-data.json';
import { AppProvider } from '../../context/AppContext';

global.fetch = jest.fn();
const mockedFetch = global.fetch as jest.Mock;


describe('SearchWrapper', () => {

  beforeEach(() => {
    mockedFetch.mockClear();
    jest.clearAllMocks();
  });

  test('Check when loading is displayed and hidden', async () => {
    const setCriticalErrorMock = jest.fn();
    mockedFetch.mockRejectedValueOnce(new Error('API server down'));

    render(
      <AppProvider>
        <SearchWrapper api={API_OK} setCriticalError={setCriticalErrorMock} />
      </AppProvider>
    )
    expect(screen.queryByTestId('loading-grid-loader')).not.toBeInTheDocument();

    // check if butotn is disabled when input is empty
    const recipeSearchInput = screen.getByLabelText(/Ingredient or keywords:/i);
    fireEvent.change(recipeSearchInput, { target: { value: 'Pasta' } });

    // Simulate form submission
    await waitFor(() => {
      fireEvent.submit(screen.getByRole('form'));
    });
    //async actions after sending the form
    await waitFor(() => {
      expect(screen.getByTestId('loading-grid-loader')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(`${API_OK}search.php?s=Pasta`);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-grid-loader')).not.toBeInTheDocument();
    });

  });

  // TODO: Add scenarios to check facourites


})
