import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import SearchForm from './SearchForm';
import { API_OK } from '../../utils/constants';
import meals from '../../test-data/meals.one-data.json';
import { AppProvider } from '../../context/AppContext';
import { Meal } from '../../types/meal.type';

global.fetch = jest.fn();
const mockedFetch = global.fetch as jest.Mock;

describe('Search Form', () => {

  beforeEach(() => {
    mockedFetch.mockClear();
    jest.clearAllMocks();
  });

  test('Initial status of Search Form', async () => {
    const setCriticalErrorMock = jest.fn();
    const setLoading = jest.fn();
    const setUserSearched = jest.fn();
    const onResults = jest.fn();
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();
    mockedFetch.mockRejectedValueOnce(new Error('API server down'));

    render(
      <AppProvider>
        <SearchForm
          api={API_OK}
          setCriticalError={setCriticalErrorMock}
          setLoading={setLoading}
          loading={false}
          setUserSearched={setUserSearched}
          onResults={onResults}
          setCurrentMeal={setCurrentMeal}
          setCurrentFavoriteMeal={setCurrentFavoriteMeal}
        />
      </AppProvider>
    );
    expect(screen.queryByTestId('loading-grid-loader')).not.toBeInTheDocument();

    const title = screen.getByTestId('search-title') as HTMLInputElement;
    expect(title).toBeInTheDocument();

    // check if butotn is disabled when input is empty
    const recipeSearchInput = screen.getByLabelText(/Ingredient or keywords:/i);
    expect(recipeSearchInput).toHaveValue('');
    let searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeDisabled();

  });

  test('renders SearchForm, search and API does not work', async () => {
    const setCriticalErrorMock = jest.fn();
    const setLoading = jest.fn();
    const setUserSearched = jest.fn();
    const onResults = jest.fn();
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();
    mockedFetch.mockRejectedValueOnce(new Error('API server down'));

    render(
      <AppProvider>
        <SearchForm
          api={API_OK}
          setCriticalError={setCriticalErrorMock}
          setLoading={setLoading}
          loading={false}
          setUserSearched={setUserSearched}
          onResults={onResults}
          setCurrentMeal={setCurrentMeal}
          setCurrentFavoriteMeal={setCurrentFavoriteMeal}
        />
      </AppProvider>
    );

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
    await waitFor(async () => {
      expect(setLoading).toHaveBeenCalledTimes(2);
      expect(setLoading).toHaveBeenCalledWith(true);

      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(`${API_OK}search.php?s=Pasta`);

      expect(setUserSearched).toHaveBeenCalledTimes(0);
      //because it goes to catch section after failure

      expect(setCriticalErrorMock).toHaveBeenCalledTimes(1);
      expect(setCriticalErrorMock).toHaveBeenCalledWith('0024 - Error: API server down');

      expect(setLoading).toHaveBeenCalledTimes(2);
      expect(setLoading).toHaveBeenCalledWith(false);

      expect(onResults).toHaveBeenCalledTimes(1);
      expect(onResults).toHaveBeenCalledWith([]);
    });

  });

  test('renders SearchForm, search and API response KO', async () => {

    const setCriticalErrorMock = jest.fn();
    const setLoading = jest.fn();
    const setUserSearched = jest.fn();
    const onResults = jest.fn();
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();

    mockedFetch.mockResolvedValueOnce({ "ok": false, status: 200 });

    render(
      <AppProvider>
        <SearchForm
          api={API_OK}
          setCriticalError={setCriticalErrorMock}
          setLoading={setLoading}
          loading={false}
          setUserSearched={setUserSearched}
          onResults={onResults}
          setCurrentMeal={setCurrentMeal}
          setCurrentFavoriteMeal={setCurrentFavoriteMeal}
        />
      </AppProvider>
    );

    const recipeSearchInput = screen.getByLabelText(/Ingredient or keywords:/i);
    fireEvent.change(recipeSearchInput, { target: { value: 'Chicken' } });
    expect(recipeSearchInput).toHaveValue('Chicken');

    // Simulate form submission
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(setLoading).toHaveBeenCalledTimes(2);

      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(`${API_OK}search.php?s=Chicken`);

      //it is executed because fetch doesn't fail althouf the respoinse is KO
      expect(setUserSearched).toHaveBeenCalledTimes(1);

      expect(setCriticalErrorMock).toHaveBeenCalledTimes(1);
      expect(setCriticalErrorMock).toHaveBeenCalledWith('0205 - Error fetching data from API');

      expect(onResults).toHaveBeenCalledTimes(1);
      expect(onResults).toHaveBeenCalledWith([]);
    });

  });

  test('renders SearchForm, search and API response OK', async () => {
    const setCriticalErrorMock = jest.fn();
    const setLoading = jest.fn();
    const setUserSearched = jest.fn();
    const onResults = jest.fn();
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();

    mockedFetch.mockResolvedValueOnce(
      {
        "ok": true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(meals),
      }
    );

    render(
      <AppProvider>
        <SearchForm
          api={API_OK}
          setCriticalError={setCriticalErrorMock}
          setLoading={setLoading}
          loading={false}
          setUserSearched={setUserSearched}
          onResults={onResults}
          setCurrentMeal={setCurrentMeal}
          setCurrentFavoriteMeal={setCurrentFavoriteMeal}
        />
      </AppProvider>
    );

    const recipeSearchInput = screen.getByLabelText(/Ingredient or keywords:/i);
    fireEvent.change(recipeSearchInput, { target: { value: 'Chicken' } });
    expect(recipeSearchInput).toHaveValue('Chicken');

    // Simulate form submission
    fireEvent.submit(screen.getByRole('form'));

    //async actions after sending the form
    await waitFor(() => {
      expect(setLoading).toHaveBeenCalledTimes(2);

      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(`${API_OK}search.php?s=Chicken`);

      expect(setUserSearched).toHaveBeenCalledTimes(1);
      expect(setUserSearched).toHaveBeenCalledWith(true);

      expect(onResults).toHaveBeenCalledTimes(1);
      expect(onResults).toHaveBeenCalledWith(meals.meals);

      expect(setCriticalErrorMock).toHaveBeenCalledTimes(0);
    });

  });


})
