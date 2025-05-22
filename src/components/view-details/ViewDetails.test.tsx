import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ViewDetails from './ViewDetails';
import dataOneLongInstruction from '../../test-data/meals.one-data-long-instructions.json';
import dataOneNA from '../../test-data/meals.one-data-NA.json';
import { AppProvider } from '../../context/AppContext';

describe('ViewDetails', () => {

  test('receive meal and show info', async () => {
    const onGoBack = jest.fn();
    render(<AppProvider>
      <ViewDetails meal={dataOneLongInstruction.meals[0]} onGoBack={onGoBack} />
    </AppProvider>);

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
    render(<AppProvider>
      <ViewDetails meal={dataOneNA.meals[0]} onGoBack={onGoBack} />
    </AppProvider>);

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

});