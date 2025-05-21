import React, { useCallback } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Meal } from '../../types/meal.type';

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
        <Button
          variant="primary"
          onClick={handleOnViewDetails}
          aria-label={`View details for ${meal.strMeal}`}
        >
          View Details
        </Button>
      </Card.Footer>

    </Card>
  );
};


export default MealCard;