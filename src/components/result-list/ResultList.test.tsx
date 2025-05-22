import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ResultList from './ResultList';
import data from '../../test-data/meals.data.json';
import dataOne from '../../test-data/meals.one-data.json';

import * as AppContextModule from '../../context/AppContext';
jest.mock('../../context/AppContext');
const mockedUseAppContext = AppContextModule.useAppContext as jest.Mock;

describe('ResultList', () => {

  beforeEach(() => {
    mockedUseAppContext.mockClear();
    mockedUseAppContext.mockReturnValue({
      setFavoritesMode: jest.fn(),
      favorites: [],
      favoriteMode: false,
      isMealFavorite: jest.fn(() => false),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });
  });

  test('receive no meals', async () => {
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();
    render(
      <ResultList
        meals={[]}
        userSearched={true}
        loading={false}
        currentMeal={null}
        currentFavoriteMeal={null}
        setCurrentMeal={setCurrentMeal}
        setCurrentFavoriteMeal={setCurrentFavoriteMeal}
      />
    );
    const recipeList = screen.queryByRole('recipe-list');
    expect(recipeList).toBeNull();

    const message = screen.getByText(/No results found/i);
    waitFor(() => {
      expect(message).toBeInTheDocument();
    });
  });

  test('receive meals', () => {
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();
    render(
      <ResultList
        meals={data.meals}
        userSearched={false}
        loading={false}
        currentMeal={null}
        currentFavoriteMeal={null}
        setCurrentMeal={setCurrentMeal}
        setCurrentFavoriteMeal={setCurrentFavoriteMeal}
      />
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    const recipeList = screen.getByRole('list');
    expect(recipeList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(data.meals.length);

  });

  test('receive one meal', async () => {
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();
    render(
      <ResultList
        meals={dataOne.meals}
        userSearched={false}
        loading={false}
        currentMeal={null}
        currentFavoriteMeal={null}
        setCurrentMeal={setCurrentMeal}
        setCurrentFavoriteMeal={setCurrentFavoriteMeal}
      />
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    let recipeList = screen.getByRole('list');
    expect(recipeList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);

  });

  test('loading', async () => {
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();
    render(
      <ResultList
        meals={dataOne.meals}
        userSearched={false}
        loading={true}
        currentMeal={null}
        currentFavoriteMeal={null}
        setCurrentMeal={setCurrentMeal}
        setCurrentFavoriteMeal={setCurrentFavoriteMeal}
      />
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('loading-grid-loader')).toBeInTheDocument();
    });

  });

  test('go back to search from View favorite details', async () => {
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();
    const favoriteMealMock = dataOne.meals[0];

    render(
      <ResultList
        meals={null}
        userSearched={false}
        loading={false}
        currentMeal={null}
        currentFavoriteMeal={favoriteMealMock}
        setCurrentMeal={setCurrentMeal}
        setCurrentFavoriteMeal={setCurrentFavoriteMeal}
      />
    );

    waitFor(() => {
      expect(screen.queryByText(favoriteMealMock.strMeal)).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Back/i })).toBeInTheDocument();

    });


    const backButton = screen.getByRole('button', { name: /Back/i });
    fireEvent.click(backButton);

    waitFor(() => {
      expect(setCurrentFavoriteMeal).toHaveBeenCalledTimes(1);
      expect(setCurrentFavoriteMeal).toHaveBeenCalledWith(null);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

  });


  test('go back to search from View details', async () => {
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();
    const currentMealMock = dataOne.meals[0];

    render(
      <ResultList
        meals={null}
        userSearched={false}
        loading={false}
        currentMeal={currentMealMock}
        currentFavoriteMeal={null}
        setCurrentMeal={setCurrentMeal}
        setCurrentFavoriteMeal={setCurrentFavoriteMeal}
      />
    );

    expect(screen.getByText(currentMealMock.strMeal)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    expect(setCurrentMeal).toHaveBeenCalledTimes(1);
    expect(setCurrentMeal).toHaveBeenCalledWith(null);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('should display Favorites component when favoriteMode is true', async () => {
    const setCurrentMeal = jest.fn();
    const setCurrentFavoriteMeal = jest.fn();

    mockedUseAppContext.mockReturnValue({
      setFavoritesMode: jest.fn(),
      favorites: [],
      favoriteMode: true,
      isMealFavorite: jest.fn(() => false),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });

    render(
      <ResultList
        meals={null}
        userSearched={false}
        loading={false}
        currentMeal={null}
        currentFavoriteMeal={null}
        setCurrentMeal={setCurrentMeal}
        setCurrentFavoriteMeal={setCurrentFavoriteMeal}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('No favorites found')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Back to search/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Back to search/i }));
    expect(mockedUseAppContext().setFavoritesMode).toHaveBeenCalledTimes(1);
    expect(mockedUseAppContext().setFavoritesMode).toHaveBeenCalledWith(false);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

})
