import React, { useState, useEffect } from 'react'
import { isValidURL } from '../../utils/utils'
import { Container, Row, Col, Navbar, Alert } from 'react-bootstrap'

interface RecipeFinderProps {
  api: string;
}

const RecipeFinder: React.FC<RecipeFinderProps> = ({ api }) => {

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!isValidURL(api)) {
      setErrorMessage('0023 - Recipe Finder Error: wrong api value')
      return
    }
  }, [api])

  return (
    <Container className="my-4">
      {
        errorMessage ? (
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={8}>
              <Alert variant="danger">
                <Alert.Heading>Oooops! Something Went Wrong!</Alert.Heading>
                <p>{errorMessage}</p>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={8}>
              <h1 className="mt-3" data-testid='main-title'>Recipe Finder</h1>
            </Col>
          </Row>

        )
      }
    </Container>
  )
}

export default RecipeFinder