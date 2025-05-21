import React from 'react'
import { render, screen} from '@testing-library/react'
import ResultList from './ResultList';

describe('ResultList', () => {

  test('receive no meals', async () => {

    render(<ResultList meals={[]} />);

    const recipeList = screen.queryByRole('recipe-list');
    expect(recipeList).toBeNull();
    const noResults = screen.getByText(/No results found/i);
    expect(noResults).toBeInTheDocument();

  });


})
