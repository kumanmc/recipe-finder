import React, { useState, useEffect } from 'react'
import { isValidURL } from '../../utils/utils'
import { Container, Row, Col, Navbar, Alert } from 'react-bootstrap'
import SearchWrapper from './search-form/SearchWrapper'

interface RecipeFinderProps {
  api: string;
}

const RecipeFinder: React.FC<RecipeFinderProps> = ({ api }) => {
  //Critical error interrumps any render and shows a message
  const [criticalError, setCriticalError] = useState('')

  useEffect(() => {
    if (!isValidURL(api)) {
      setCriticalError('0023 - Recipe Finder Error: wrong api value')
      return
    }
  }, [api])

  return (
    <Container className="my-4">
      {
        criticalError ? (
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={8}>
              <Alert variant="danger">
                <Alert.Heading>Oooops! Something Went Wrong!</Alert.Heading>
                <p>{criticalError}</p>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={8}>
              <h1 className="mt-3" data-testid='main-title'>Recipe Finder</h1>
              <SearchWrapper
                api={api}
                setCriticalError={setCriticalError}
              />
            </Col>
          </Row>

        )
      }
    </Container>
  )
}

export default RecipeFinder