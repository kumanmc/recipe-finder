import React, { useState } from 'react'
import SearchForm from '../search-form/SearchForm';

import ResultList from '../result-list/ResultList';
import { Meal } from '../../types/meal.type';
import { useAppContext } from '../../context/AppContext';

interface SearchWrapperProps {
  api: string;
  setCriticalError: (message: string) => void;
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ api, setCriticalError }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [meals, setMeals] = useState<Meal[]>([]); // State to store results
  const [userSearched, setUserSearched] = useState<boolean>(false)
  const { favoriteMode } = useAppContext();

  const handleResults = (data: Meal[]) => {
    setMeals(data);
  };

  return (
    <>
      <SearchForm
        api={api}
        setLoading={setLoading}
        loading={loading}
        setCriticalError={setCriticalError}
        setUserSearched={setUserSearched}
        onResults={handleResults}
      />
      <ResultList
        meals={meals}
        userSearched={userSearched}
        loading={loading}
      />

    </>

  )
}

export default SearchWrapper

