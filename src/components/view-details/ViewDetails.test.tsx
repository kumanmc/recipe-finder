import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ViewDetails from './ViewDetails';
import dataOneLongInstruction from '../../test-data/meals.one-data-long-instructions.json';
import dataOneNA from '../../test-data/meals.one-data-NA.json';

import * as AppContextModule from '../../context/AppContext';
jest.mock('../../context/AppContext');
const mockedUseAppContext = AppContextModule.useAppContext as jest.Mock;

describe('ViewDetails', () => {

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

  test('receive meal and show info', async () => {
    const onGoBack = jest.fn();
    render(
      <ViewDetails meal={dataOneLongInstruction.meals[0]} onGoBack={onGoBack} />
    );

    const meal = dataOneLongInstruction.meals[0];

    const image = screen.getByRole('img', { name: meal.strMeal });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', meal.strMealThumb);

    const title = screen.getByRole('heading', { name: meal.strMeal, level: 1 });
    expect(title).toBeInTheDocument();

    expect(screen.getByText(meal.strCategory)).toBeInTheDocument();
    expect(screen.getByText(`${meal.strArea}`)).toBeInTheDocument();
    expect(screen.getByText(meal.strInstructions)).toBeInTheDocument();

    //General selected when access
    const generalTabButton = screen.getByRole('tab', { name: /General/i });
    expect(generalTabButton).toHaveAttribute('aria-selected', 'true');
    //Check some data
    expect(screen.getByText(meal.strCategory)).toBeInTheDocument();
    expect(screen.getByText(meal.strArea)).toBeInTheDocument();

    //Instructions:
    const instructionsTabButton = screen.getByRole('tab', { name: /Instructions/i });
    expect(instructionsTabButton).toBeInTheDocument();
    fireEvent.click(instructionsTabButton);
    await waitFor(() => {
      expect(generalTabButton).toHaveAttribute('aria-selected', 'false');
      expect(instructionsTabButton).toHaveAttribute('aria-selected', 'true');
    });

    expect(screen.getByText(/BIG TEXT/i)).toBeInTheDocument();

    //Ingredients
    const ingredientsTabButton = screen.getByRole('tab', { name: /Ingredients/i });
    expect(ingredientsTabButton).toBeInTheDocument();
    fireEvent.click(ingredientsTabButton);

    await waitFor(() => {
      expect(generalTabButton).toHaveAttribute('aria-selected', 'false');
      expect(ingredientsTabButton).toHaveAttribute('aria-selected', 'true');
    });
    const ingredients = meal.strMeasure1 + ' ' + meal.strIngredient1;
    expect(screen.getByText(ingredients)).toBeInTheDocument();

    const videoYoutube = screen.queryByRole('region', { name: /Recipe reproductor/i });
    expect(videoYoutube).toBeInTheDocument();


    const backButton = screen.getByRole('button', { name: /Back/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(onGoBack).toHaveBeenCalledTimes(1);
    });

  });

  test('N/A values', async () => {
    const onGoBack = jest.fn();
    render(
      <ViewDetails meal={dataOneNA.meals[0]} onGoBack={onGoBack} />
    );

    const meal = dataOneNA.meals[0];

    const videoYoutube = screen.queryByRole('region', { name: /Recipe reproductor/i });
    expect(videoYoutube).not.toBeInTheDocument();


    const backButton = screen.getByRole('button', { name: /Back/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(onGoBack).toHaveBeenCalledTimes(1);
    });

  });

  test('Star filled and click to unstar it', async () => {
    const onGoBack = jest.fn();

    mockedUseAppContext.mockReturnValue({
      setFavoritesMode: jest.fn(),
      favorites: [],
      favoriteMode: true,
      isMealFavorite: jest.fn(() => true),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });
    const removeFavorite = mockedUseAppContext().removeFavorite;
    render(
      <ViewDetails meal={dataOneNA.meals[0]} onGoBack={onGoBack} />
    );

    const meal = dataOneNA.meals[0];

    const filledStarIcon = screen.getByTitle('Remove from favorites');
    expect(filledStarIcon).toBeInTheDocument();
    screen.getByTitle('Remove from favorites');
    fireEvent.click(filledStarIcon);

    waitFor(() => {
      expect(removeFavorite).toHaveBeenCalledTimes(1);
    });
    
  });

  test('Star unfilled and click to star it', async () => {
    const onGoBack = jest.fn();

    mockedUseAppContext.mockReturnValue({
      setFavoritesMode: jest.fn(),
      favorites: [],
      favoriteMode: true,
      isMealFavorite: jest.fn(() => false),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });
    const addFavorite = mockedUseAppContext().addFavorite;
    render(
      <ViewDetails meal={dataOneNA.meals[0]} onGoBack={onGoBack} />
    );

    const filledStarIcon = screen.getByTitle('Add to favorites');
    expect(filledStarIcon).toBeInTheDocument();
    screen.getByTitle('Add to favorites');
    fireEvent.click(filledStarIcon);

    waitFor(() => {
      expect(addFavorite).toHaveBeenCalledTimes(1);
    });
  });

});