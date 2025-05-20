import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ResultList from './ResultList';
import { API_OK } from '../../utils/constants';


// describe('SearchWrapper', () => {

//   test('renders SearchWrapper, search and API response OK', async () => {
//     const data = {
//       meals: [
//         { idMeal: 1, strMeal: 'Chicken Curry', strMealThumb: 'https://example.com/chicken-curry.jpg' },
//         { idMeal: 2, strMeal: 'Chicken Salad', strMealThumb: 'https://example.com/chicken-salad.jpg' },
//         { idMeal: 3, strMeal: 'Chicken Soup', strMealThumb: 'https://example.com/chicken-soup.jpg' },
//         { idMeal: 4, strMeal: 'Chicken Stir Fry', strMealThumb: 'https://example.com/chicken-stir-fry.jpg' },
//       ]
//     };

//     render(
//       <ResultList results={data.meals} />
//     )

//   });


// })
