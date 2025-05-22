import React, { useState, useCallback } from 'react'
import { Button, Row, Col, Form, Alert } from 'react-bootstrap'
import { Meal } from '../../types/meal.type';
import { useAppContext } from '../../context/AppContext';

interface SearchFormProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setCriticalError: (message: string) => void;
  setUserSearched: (value: boolean) => void;
  api: string;
  onResults: (data: Meal[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setLoading, loading, setCriticalError, api, onResults, setUserSearched }) => {
  const [ingredients, setIngredients] = useState<string>('')
  const { setFavoritesMode, favorites } = useAppContext();

  const handleSearch = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setFavoritesMode(false);

    try {
      const url = `${api}search.php?s=${encodeURIComponent(ingredients)}`;
      const response = await fetch(url);
      setUserSearched(true);

      //TODO: EXTRACT TO A FUNCTION
      if (!response.ok) {
        // console.log(response)
        setCriticalError(`0205 - Error fetching data from API`);
        onResults([]);
      } else {
        const data = await response.json();
        // console.log('IN API RESULTS')
        // console.log(data)
        //console.log('API Success Response:', data);
        if (data.meals === null) {
          onResults([]);
        } else {
          onResults(data.meals);
        }
      }
    } catch (error) {
      //console.log(''0024 - ' + error);
      setCriticalError('0024 - ' + error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  }, [ingredients]);

  const handleSeeFavorites = useCallback(() => {
    setFavoritesMode(true);
    setUserSearched(false);
   }, [setFavoritesMode, setIngredients, onResults, setUserSearched, favorites]);


  return (
    <Row className=''>
      <Form onSubmit={handleSearch} aria-label={'Recipe search form'}
        className="border p-3 rounded mt-4" >
        <Row className="align-items-center">
          <Alert variant='info' >
            <Alert.Heading data-testid="search-title">Welcome! Find Your Perfect Recipe</Alert.Heading>
            <p class-name='mb-3'>Here you can search for recipes using ingredients or keywords.</p>
            <p class-name='mb-3'>Now you can save your favorite recipes! They are accesibles for you here:</p>
            <Row>
              <Button variant="info" onClick={handleSeeFavorites}>See favorites</Button>
            </Row>
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
          <Col xs={12} md={2} lg={2} className={'mt-2'}>
            <Button variant="success" type="submit" disabled={ingredients === '' || loading}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Row>

  );
}
export default SearchForm



