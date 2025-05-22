import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import MealCard from './MealCard';
import { AppProvider } from '../../context/AppContext';
import data from '../../test-data/meals.data.json';
import dataOne from '../../test-data/meals.one-data.json';

describe('Meal Card', () => {
 

  test('Show data', async () => {

    const onViewDetails = jest.fn();
    const mockMeal = dataOne.meals[0];
    render(
      <AppProvider>
        <MealCard meal={mockMeal} onViewDetails={onViewDetails} />
      </AppProvider>
    );

    expect(screen.getByRole('img', { name: mockMeal.strMeal })).toBe;
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


})
