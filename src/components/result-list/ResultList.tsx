import React, { useState } from 'react'
import { Meal } from "../../types/meal.type";
import MealCard from './MealCard';
import { Row, Col, Alert } from 'react-bootstrap';

interface ResultListProps {
  meals: Meal[] | null;
  userSearched: boolean;
}

const ResultList: React.FC<ResultListProps> = ({ meals, userSearched}) => {

  return (
    <>
      {meals && meals.length > 0 ? (
        <Row role='list' className="border p-3 rounded">
          {meals.map((meal) => (
            <Col role={'listitem'} key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex">
              <MealCard meal={meal} />
            </Col>
          ))}
        </Row>
      ) : userSearched && (
        <Row className="align-items-center">
          <Alert variant='warning' >
            <Alert.Heading>No results found</Alert.Heading>
            Try with other ingredients or keywords.
          </Alert>
            <h2></h2>
        </Row>
      )}
    </>
  );
}

export default ResultList;