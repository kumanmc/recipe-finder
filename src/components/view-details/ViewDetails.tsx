import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Meal } from '../../types/meal.type';
import { Row } from 'react-bootstrap';

interface ViewDetailsProps {
  meal: Meal;
  onGoBack: () => void;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ meal, onGoBack }) => {

  return (
    <Row>
      <Card role="article">
        <Card.Img
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <Card.Body >
          <Card.Title as="h5">{meal.strMeal}</Card.Title>
          <Card.Subtitle className="text-muted">
            {meal.strCategory}
          </Card.Subtitle>
          <Card.Text as="div">
            <small>Origin: {meal.strArea}</small>
          </Card.Text>
          <Card.Text>
            {meal.strInstructions}
          </Card.Text>
        </Card.Body>

        <Card.Footer >
          <Button variant="primary" onClick={onGoBack}>
            Back
          </Button>
        </Card.Footer>

      </Card>
    </Row>

  );
};


export default ViewDetails;