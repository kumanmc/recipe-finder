import React, { useState } from 'react'
import { Meal } from "../../types/meal.type";
import MealCard from './MealCard';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import ViewDetails from '../view-details/ViewDetails';
import { useAppContext } from '../../context/AppContext';
import { Star, StarFill } from 'react-bootstrap-icons';

interface ResultListProps {
  meals: Meal[] | null;
  userSearched: boolean;
};

const ResultList: React.FC<ResultListProps> = ({ meals, userSearched }) => {
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const { favoriteMode, setFavoritesMode, favorites } = useAppContext();

  const handleOnGoBack = () => {
    setCurrentMeal(null);
  };
  const handleBackToSearch = () => {
    setFavoritesMode(false);
  };

  return (
    <>
      {
        favoriteMode ? (
          <>
            <Row>
              <Col xs={12} className='text-center'>
                <h2>Favorites</h2>
              </Col>
            </Row>
            {
              favorites && favorites.length > 0 && (
                <Row role='list' className="border p-3 rounded">
                  {favorites.map((meal) => (
                    <Col role={'listitem'} key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex">
                      <MealCard meal={meal} onViewDetails={setCurrentMeal} />
                    </Col>
                  ))}
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
        ) : currentMeal ?
          (
            <ViewDetails meal={currentMeal} onGoBack={handleOnGoBack} />
          )
          : meals && meals.length > 0 ?
            (
              <Row role='list' className="border p-3 rounded">
                {meals.map((meal) => (
                  <Col role={'listitem'} key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex">
                    <MealCard meal={meal} onViewDetails={setCurrentMeal} />
                  </Col>
                ))}
              </Row>
            )
            : userSearched &&
            (
              <Row className="align-items-center">
                <Alert variant='warning' >
                  <Alert.Heading>No results found</Alert.Heading>
                  Try with other ingredients or keywords.
                </Alert>
                <h2></h2>
              </Row>
            )

      }
    </>
  );
}

export default ResultList;