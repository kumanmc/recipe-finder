import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Favorites from './Favorites';
import * as AppContextModule from '../../context/AppContext'
import data from '../../test-data/meals.data.json';


jest.mock('../../context/AppContext');
const mockedUseAppContext = AppContextModule.useAppContext as jest.Mock;

describe('Favorites', () => {

  beforeEach(() => {
    mockedUseAppContext.mockClear();
    mockedUseAppContext.mockReturnValue({
      setFavoritesMode: jest.fn(),
      isMealFavorite: jest.fn(() => false),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      favorites: [],
      favoriteMode: false,
    });
  });

  test('rendered with favoriteMode false', () => {

    const setCurrentMeal = jest.fn();
    render(
      <Favorites
        setCurrentMeal={setCurrentMeal}
      />
    );
    const favoriteList = screen.queryByRole('favorites-list');
    expect(favoriteList).toBeNull();

  });

  test('no favorites', () => {
    mockedUseAppContext.mockReturnValue({
      favoriteMode: true,
    });

    const setCurrentMeal = jest.fn();
    render(
      <Favorites
        setCurrentMeal={setCurrentMeal}
      />
    );
    const favoriteList = screen.queryByRole('favorites-list');
    expect(favoriteList).toBeNull();

    const noFavoritesMessage = screen.queryByText(/No favorites found/i);
    waitFor(() => {
      expect(noFavoritesMessage).toBeInTheDocument();
    });

  });

  test('show favorites', () => {
    mockedUseAppContext.mockReturnValue({
      setFavoritesMode: jest.fn(),
      favorites: data.meals,
      favoriteMode: true,
      isMealFavorite: jest.fn(() => true),
    });
    const setFavoritesModeMock = mockedUseAppContext().setFavoritesMode;

    const setCurrentMeal = jest.fn();
    render(
      <Favorites
        setCurrentMeal={setCurrentMeal}
      />
    );
    const favoriteList = screen.queryByRole('favorites-list');
    expect(favoriteList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(25);

    const backToSearch = screen.getByRole('button', { name: /Back to Search/i });
    fireEvent.click(backToSearch);
    waitFor(() => {
      expect(setFavoritesModeMock).toHaveBeenCalledTimes(1);
      expect(setFavoritesModeMock).toHaveBeenCalledWith(null);
    });

  });



})
