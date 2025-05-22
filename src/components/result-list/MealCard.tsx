import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Meal } from '../../types/meal.type';
import { Star, StarFill } from 'react-bootstrap-icons';

interface MealCardProps {
  meal: Meal;
  onViewDetails: (meal: Meal) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onViewDetails }) => {

  const handleOnViewDetails = () => {
    onViewDetails(meal);
  };

  return (
    <Card >
      <Card.Img
        src={meal.strMealThumb}
        alt={meal.strMeal}
      />
      <Card.Body >
        <Card.Title>{meal.strMeal}</Card.Title>
        <Card.Subtitle className="text-muted">
          {meal.strCategory}
        </Card.Subtitle>
        <Card.Text as="div">
          <small>Origin: {meal.strArea}</small>
        </Card.Text>
        <Card.Text>
          {`${meal.strInstructions.substring(0, 100)}...`}
        </Card.Text>
      </Card.Body>

      <Card.Footer >
        <Row>
          <Col className={'col-12'}>
            <Button
              variant="primary"
              onClick={handleOnViewDetails}
              aria-label={`View details for ${meal.strMeal}`}
            >
              View Details
            </Button>
          </Col>
          <Col className={'col-12 mt-2'}>
            <span><Star color="gray" size={24} /></span>
          </Col>
        </Row>

      </Card.Footer>

    </Card>
  );
};


function MiComponente() {
  return (
    <div>
      {/* Estrella rellena */}
      <StarFill color="gold" size={24} />

      {/* Estrella vacía */}
      <Star color="gray" size={24} />
    </div>
  );
}

export default MealCard;