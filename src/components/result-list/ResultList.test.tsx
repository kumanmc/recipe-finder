import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ResultList from './ResultList';
import { AppProvider } from '../../context/AppContext';
import data from '../../test-data/meals.data.json';
import dataOne from '../../test-data/meals.one-data.json';

describe('ResultList', () => {

  test('receive no meals', () => {
    render(
      <AppProvider>
        <ResultList meals={[]} userSearched={false} />
      </AppProvider>
    );
    const recipeList = screen.queryByRole('recipe-list');
    expect(recipeList).toBeNull();

    const noResults = screen.queryByText(/No results found/i);
    expect(noResults).toBeNull();

  });

  test('receive meals', () => {

    render(
      <AppProvider>
        <ResultList meals={data.meals} userSearched={false} />
      </AppProvider>
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    const recipeList = screen.getByRole('list');
    expect(recipeList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(data.meals.length);

  });

  test('receive one meals', async () => {

    render(
      <AppProvider>
        <ResultList meals={dataOne.meals} userSearched={false} />
      </AppProvider>
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    let recipeList = screen.getByRole('list');
    expect(recipeList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);

    //SEE DETAILS
    const viewDetailsButton = screen.getByRole('button', { name: /View Details/i });
    expect(viewDetailsButton).toBeInTheDocument();
    fireEvent.click(viewDetailsButton);

    await waitFor(() => {
      expect(screen.queryByRole('article')).toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    //GO BACK
    const backButton = screen.getByRole('button', { name: /Back/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    await waitFor(() => {
      recipeList = screen.getByRole('list');
      expect(recipeList).toBeInTheDocument();
    });


  });


})
