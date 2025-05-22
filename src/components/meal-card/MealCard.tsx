import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Meal } from '../../types/meal.type';
import { Star, StarFill } from 'react-bootstrap-icons';
import { useAppContext } from '../../context/AppContext';

interface MealCardProps {
  meal: Meal;
  onViewDetails: (meal: Meal) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onViewDetails }) => {
  const { addFavorite, removeFavorite, isMealFavorite } = useAppContext();

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
        <Card.Title as="h3" id={`meal-title-${meal.idMeal}`}>
          {meal.strMeal}
        </Card.Title>
        <Card.Subtitle className="text-muted">
          <span aria-label="Category:">{meal.strCategory}</span>
        </Card.Subtitle>
        <Card.Text as="div">
          <small><span aria-label="Origin:">{meal.strArea}</span></small>
        </Card.Text>
        <Card.Text>
          <span aria-label="Instructions summary:">{meal.strInstructions.substring(0, 100)}</span>
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
            {isMealFavorite(meal.idMeal) ? (
              <StarFill
                color="gold"
                size={32}
                style={{ cursor: 'pointer' }}
                onClick={() => removeFavorite(meal.idMeal)}
                title="Delete from favorites"
              />
            ) : (
              <Star
                color="gray"
                size={32}
                style={{ cursor: 'pointer' }}
                onClick={() => addFavorite(meal)}
                title="Add to favorites"
              />
            )}
          </Col>
        </Row>

      </Card.Footer>

    </Card>
  );
};

export default MealCard;