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
        <ResultList meals={[]} userSearched={false} loading={false}/>
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
        <ResultList meals={data.meals} userSearched={false} loading={false}/>
      </AppProvider>
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    const recipeList = screen.getByRole('list');
    expect(recipeList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(data.meals.length);

  });

  test('receive one meal', async () => {

    render(
      <AppProvider>
        <ResultList meals={dataOne.meals} userSearched={false} loading={false}/>
      </AppProvider>
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    let recipeList = screen.getByRole('list');
    expect(recipeList).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);

  });
  test('loading', async () => {

    render(
      <AppProvider>
        <ResultList meals={dataOne.meals} userSearched={false} loading={true}/>
      </AppProvider>
    );

    expect(screen.queryByText(/No results found/i)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('loading-grid-loader')).toBeInTheDocument();
    });

  });


})
