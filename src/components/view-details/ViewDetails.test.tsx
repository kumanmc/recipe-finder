import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ViewDetails from './ViewDetails';
import dataOne from './test-data/meals.one-data.json';

describe('ViewDetails', () => {

  test('receive meal and show info', async () => {
    const onGoBack = jest.fn();
    render(<ViewDetails meal={dataOne.meals[0]} onGoBack={onGoBack} />);

    const meal = dataOne.meals[0];

    const image = screen.getByRole('img', { name: meal.strMeal });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', meal.strMealThumb);

    // Card.Title usually renders as an <h5>
    const title = screen.getByRole('heading', { name: meal.strMeal, level: 1 });
    expect(title).toBeInTheDocument();

    if (meal.strCategory) { // Check if mock data has category
      expect(screen.getByText(meal.strCategory)).toBeInTheDocument();
    }

    if (meal.strArea) { // Check if mock data has area
      // We search for the text content. Using a regex for flexibility.
      expect(screen.getByText(`${meal.strArea}`)).toBeInTheDocument();
    }

    if (meal.strInstructions) { // Check if mock data has instructions
      expect(screen.getByText(meal.strInstructions)).toBeInTheDocument();
    }

    // TODO: PREPARATION TIME. SEARCH BY MINUTES, HOUR, HOURS IN DESCRIPTION AND GET NUMBERS
    // TO SHOW SOME APROX VALUE

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


    const backButton = screen.getByRole('button', { name: /Back/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(onGoBack).toHaveBeenCalledTimes(1);
    });

  });

});