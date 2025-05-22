import React, { useState } from 'react'
import { Meal } from "../../types/meal.type";
import MealCard from '../meal-card/MealCard';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import ViewDetails from '../view-details/ViewDetails';
import { useAppContext } from '../../context/AppContext';
import { Star, StarFill } from 'react-bootstrap-icons';
import Favorites from '../favorites/Favorites';

interface ResultListProps {
  meals: Meal[] | null;
  userSearched: boolean;
};

const ResultList: React.FC<ResultListProps> = ({ meals, userSearched }) => {
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const { favoriteMode } = useAppContext();

  const handleOnGoBack = () => {
    setCurrentMeal(null);
  };

  return (
    <>
      {
        favoriteMode ? (<Favorites setCurrentMeal={setCurrentMeal} />) :
          currentMeal ? (<ViewDetails meal={currentMeal} onGoBack={handleOnGoBack} />) :
            meals && meals.length > 0 ?
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