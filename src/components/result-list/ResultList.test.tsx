import React from 'react'
import { render, screen} from '@testing-library/react'
import ResultList from './ResultList';
import data from './test-data/meals.data.json';
import dataOne from './test-data/meals.one-data.json';

describe('ResultList', () => {

  test('receive no meals', () => {

    render(<ResultList meals={[]} />);

    const recipeList = screen.queryByRole('recipe-list');
    expect(recipeList).toBeNull();

    const noResults = screen.getByText(/No results found/i);
    expect(noResults).toBeInTheDocument();

  });

  test('receive meals', () => {

    render(<ResultList meals={data.meals} />);

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    const recipeList = screen.getByRole('list');
    expect(recipeList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(data.meals.length);

  });

  test('receive one meals', () => {

    render(<ResultList meals={dataOne.meals} />);

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    const recipeList = screen.getByRole('list');
    expect(recipeList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);

  });


})
