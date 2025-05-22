import React from 'react';
import { Button, Row, Col, Alert } from 'react-bootstrap';
import { Meal } from '../../types/meal.type';
import MealCard from '../meal-card/MealCard';
import { useAppContext } from '../../context/AppContext';

interface FavoritesProps {
  setCurrentMeal: (meal: Meal) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ setCurrentMeal }) => {
  const { setFavoritesMode, favorites, favoriteMode } = useAppContext();

  if (!favoriteMode) {
    return null;
  }
  const handleBackToSearch = () => {
    setFavoritesMode(false);
  };

  return (
    <>
      <Row>
        <Col xs={12} className='text-center'>
          <h2>Favorites</h2>
        </Col>
      </Row>
      {
        favorites && favorites.length > 0 ? (
          <Row role='favorites-list' className="border p-3 rounded">
            {favorites.map((meal) => (
              <Col role={'listitem'} key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex">
                <MealCard meal={meal} onViewDetails={setCurrentMeal} />
              </Col>
            ))}
          </Row>
        ) :
          (
            <Row className="align-items-center">
              <Alert variant='warning' >
                <Alert.Heading><span aria-label='No favorites found'>No favorites found</span></Alert.Heading>
                Discover incredible recipes and save them with the star icon.
              </Alert>
            </Row>
          )
      }
      <Row>
        <Col className={'col-12'}>
          <Button
            variant="primary"
            onClick={handleBackToSearch}
            aria-label={`Back to Search`}
          >
            Back to search
          </Button>
        </Col>
      </Row>

    </>
  );
};

export default Favorites;