import React, { useState, useEffect } from 'react'
import { isValidUrl } from '../helpers/is-valid-URL'
import { Container, Row, Col, Navbar, Alert } from 'react-bootstrap'
import SearchWrapper from './search-form/SearchWrapper'

interface RecipeFinderProps {
  api: string;
}

const RecipeFinder: React.FC<RecipeFinderProps> = ({ api }) => {
  //Critical error interrumps any render and shows a message
  const [criticalError, setCriticalError] = useState('')

  useEffect(() => {
    if (!isValidUrl(api)) {
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
              <div className="text-center my-1">
                <h1 className="fw-bold" data-testid='main-title'>Recipe Finder</h1>
                <hr style={{
                  width: '150px',
                  margin: '0.5rem auto 0 auto',
                  borderTop: '3px solid #0d6efd',
                }} />
              </div>
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