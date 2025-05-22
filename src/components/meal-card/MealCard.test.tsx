import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import MealCard from './MealCard';
import * as AppContextModule from '../../context/AppContext';
import data from '../../test-data/meals.data.json';
import dataOne from '../../test-data/meals.one-data.json';

jest.mock('../../context/AppContext');
const mockedUseAppContext = AppContextModule.useAppContext as jest.Mock;

describe('Meal Card', () => {
  const mockMeal = dataOne.meals[0];

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

  test('Show data', async () => {
    const onViewDetails = jest.fn();
    render(
      <MealCard meal={mockMeal} onViewDetails={onViewDetails} />
    );

    expect(screen.getByRole('img', { name: mockMeal.strMeal })).toBeInTheDocument();
    expect(screen.getByText(mockMeal.strMeal)).toBeInTheDocument();
    expect(screen.getByText(mockMeal.strCategory)).toBeInTheDocument();
    expect(screen.getByText(mockMeal.strArea)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockMeal.strInstructions.substring(0, 100), 'i'))).toBeInTheDocument();

    const viewDetailsButton = screen.getByRole('button', { name: /View Details/i });
    expect(viewDetailsButton).toBeInTheDocument();
    fireEvent.click(viewDetailsButton);

    await waitFor(() => {
      expect(onViewDetails).toHaveBeenCalledTimes(1);
      expect(onViewDetails).toHaveBeenCalledWith(dataOne.meals[0]);
    });
  });

  test('Add to favorite', async () => {
    const onViewDetails = jest.fn();
    const mockAddFavorite = jest.fn();
    const mockIsMealFavorite = jest.fn(() => false);

    mockedUseAppContext.mockReturnValue({
      setFavoritesMode: jest.fn(),
      favorites: [],
      favoriteMode: false,
      isMealFavorite: mockIsMealFavorite,
      addFavorite: mockAddFavorite,
      removeFavorite: jest.fn(),
    });

    render(
      <MealCard meal={mockMeal} onViewDetails={onViewDetails} />
    );

    const starIcon = screen.getByTitle('Add to favorites');
    expect(starIcon).toBeInTheDocument();

    fireEvent.click(starIcon);

    expect(mockAddFavorite).toHaveBeenCalledTimes(1);
    expect(mockAddFavorite).toHaveBeenCalledWith(mockMeal);
  });

  test('Remove from favorite', async () => {
    const onViewDetails = jest.fn();
    const mockRemoveFavorite = jest.fn();
    const mockIsMealFavorite = jest.fn(() => true);

    mockedUseAppContext.mockReturnValue({
      setFavoritesMode: jest.fn(),
      favorites: [mockMeal],
      favoriteMode: false,
      isMealFavorite: mockIsMealFavorite,
      addFavorite: jest.fn(),
      removeFavorite: mockRemoveFavorite,
    });

    render(
      <MealCard meal={mockMeal} onViewDetails={onViewDetails} />
    );

    const starIcon = screen.getByTitle('Delete from favorites');
    expect(starIcon).toBeInTheDocument();

    fireEvent.click(starIcon);

    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockMeal.idMeal);
  });
});