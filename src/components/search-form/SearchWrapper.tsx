import React, { useState } from 'react'
import SearchForm from './SearchForm';
import Spinner from './Spinner';
import ResultList from '../result-list/ResultList';

interface SearchWrapperProps {
  api: string;
  setCriticalError: (message: string) => void;
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ api, setCriticalError }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [results, setResults] = useState<any[]>([]); // State to store results

  const handleResults = (data: any[]) => {
    setResults(data);
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
      {loading ? <Spinner /> : <ResultList results={results} />}
    </>

  )
}

export default SearchWrapper
