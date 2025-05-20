import React, { useState, useCallback } from 'react'
import { GridLoader } from 'react-spinners'
import { Button, Row, Col, Form, Alert } from 'react-bootstrap'

interface SearchAndFilterForm {
  api: string;
  setErrorMessage: (message: string) => void;
}
const SearchAndFilterForm: React.FC<SearchAndFilterForm> = ({ api, setErrorMessage }) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      {loading ? <Spinner /> : <SearchForm setLoading={setLoading} />}
    </>

  )
}

const SearchForm: React.FC<{ setLoading: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setLoading }) => {
  const [ingredients, setIngredients] = useState<string>('')

  const handleSearch = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {

    console.log('handleSearch', ingredients)
    event.preventDefault();
    // setLoading(true);


    // ...fetch..

    // setLoading(false);
  }, [ingredients]);


  return (
    <Row>
      <Form onSubmit={handleSearch}>
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
            <Button variant="primary" type="submit" disabled={ingredients === ''}>
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