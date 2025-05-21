import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ViewDetails from './ViewDetails';
import dataOne from './test-data/meals.one-data.json';

describe('ViewDetails', () => {

  test('receive meal and show info', async () => {
    const onGoBack = jest.fn();
    render(<ViewDetails meal={dataOne.meals[0]} onGoBack={onGoBack}/>);

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
      expect(screen.getByText(`Origin: ${meal.strArea}`)).toBeInTheDocument();
    }

    if (meal.strInstructions) { // Check if mock data has instructions
      expect(screen.getByText(meal.strInstructions)).toBeInTheDocument();
    }

    // TODO: PREPARATION TIME. SEARCH BY MINUTES, HOUR, HOURS IN DESCRIPTION AND GET NUMBERS
    // TO SHOW SOME APROX VALUE

    //INGREDIENTS: JOIN TTHE TWO ARRAYS BY POSITION TO HAVE MEASURE AND INGREDIENT

    //INSTRUCTIONS:


    const backButton = screen.getByRole('button', { name: /Back/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(onGoBack).toHaveBeenCalledTimes(1);
    });

  });

});