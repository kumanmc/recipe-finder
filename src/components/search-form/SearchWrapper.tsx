import React, { useState } from 'react'
import SearchForm from './SearchForm';
import Spinner from './Spinner';
import ResultList from '../result-list/ResultList';
import { Meal } from '../../types/meal.type';

interface SearchWrapperProps {
  api: string;
  setCriticalError: (message: string) => void;
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ api, setCriticalError }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [meals, setMeals] = useState<Meal[]>([]); // State to store results

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
        onResults={handleResults}
      />
      {loading ? <Spinner /> : <ResultList meals={meals} />}
    </>

  )
}

export default SearchWrapper
