import React, { useState, useCallback } from 'react'
import { GridLoader } from 'react-spinners'
import { Button, Row, Col, Form, Alert } from 'react-bootstrap'

interface SearchAndFilterForm {
  api: string;
  setCriticalError: (message: string) => void;
}
const SearchAndFilterForm: React.FC<SearchAndFilterForm> = ({ api, setCriticalError }) => {
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

interface SearchFormProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setCriticalError: (message: string) => void;
  api: string;
  onResults: (data: any[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setLoading, loading, setCriticalError, api, onResults }) => {
  const [ingredients, setIngredients] = useState<string>('')

  const handleSearch = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const url = `${api}search.php?s=${encodeURIComponent(ingredients)}`;
      const response = await fetch(url);

      //TODO: EXTRACT TO A FUNCTION
      if (!response.ok) {
        setCriticalError(`3242 - Error fetching data from API ${url}`);
        onResults([]);
      } else {
        const data = await response.json();
        //console.log('API Success Response:', data);
        onResults(data.meals);
      }
    } catch (error) {
      //console.log(''0024 - ' + error);
      setCriticalError('0024 - ' + error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  }, [ingredients]);


  return (
    <Row>
      <Form onSubmit={handleSearch} aria-label={'Recipe search form'}>
        <Row className="align-items-center">
          <Alert variant='info' >
            <Alert.Heading data-testid="search-title">Welcome to Recipe Finder!</Alert.Heading>
            <p>
              Here you can search for recipes using ingredients or keywords.            </p>
          </Alert>

          <Col xs={12} md={4} lg={3} >
            <Form.Label htmlFor="recipeSearchInput">
              Ingredient or keywords:
            </Form.Label>
          </Col>
          <Col xs={12} md={6} lg={7}>
            <Form.Control
              type="text"
              id="recipeSearchInput"
              placeholder="Example: chicken curry or spicy or vengan"
              value={ingredients}
              name={'recipeSearchInput'}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <Button variant="primary" type="submit" disabled={ingredients === '' || loading}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Row>

  );
}

const Spinner = (() => {
  return (
    <div data-testid="loading-grid-loader">
      <GridLoader
        color="#3b82f6"
        margin={70}
        size={80} />
    </div>
  );
})
export default SearchAndFilterForm

const ResultList: React.FC<{ results: any[] }> = ({ results }) => {
  return (
    <div>
      {results && results.length > 0 ? (
        <p>RESULTS!!!! OLEEEEE</p>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}