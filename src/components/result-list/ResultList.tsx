import React from 'react'
import { Meal } from "../../types/meal.type";
import MealCard from '../meal-card/MealCard';
import { Row, Col, Alert } from 'react-bootstrap';
import ViewDetails from '../view-details/ViewDetails';
import { useAppContext } from '../../context/AppContext';
import Favorites from '../favorites/Favorites';
import { GridLoader } from 'react-spinners'

interface ResultListProps {
  meals: Meal[] | null;
  userSearched: boolean;
  loading: boolean;
  setCurrentMeal: (meal: Meal | null) => void;
  setCurrentFavoriteMeal: (meal: Meal | null) => void;
  currentMeal: Meal | null;
  currentFavoriteMeal: Meal | null;
};

const Spinner = (() => {
  return (
    <div data-testid="loading-grid-loader">
      <GridLoader
        color="#3b82f6"
        margin={70}
        size={80} />
    </div>
  );
})


const ResultList: React.FC<ResultListProps> = ({ meals, userSearched, loading, setCurrentMeal, setCurrentFavoriteMeal, currentMeal, currentFavoriteMeal }) => {
  const { favoriteMode } = useAppContext();

  if (loading) {
    return <Spinner />
  }

  const handleOnGoBack = () => {
    setCurrentMeal(null);
  };

  const handleOnFavoriteGoBack = () => {
    setCurrentFavoriteMeal(null)
  };

  return (
    <>
      {
        currentFavoriteMeal ? (<ViewDetails meal={currentFavoriteMeal} onGoBack={handleOnFavoriteGoBack} />) :
          favoriteMode ? (<Favorites setCurrentMeal={setCurrentFavoriteMeal} />) :
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
                      <Alert.Heading><span aria-label='No results found'>No results found</span></Alert.Heading>
                      Try with other ingredients or keywords.
                    </Alert>
                  </Row>
                )

      }
    </>
  );
}

export default ResultList;