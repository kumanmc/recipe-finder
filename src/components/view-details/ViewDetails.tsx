import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Meal } from '../../types/meal.type';
import { Row, Col, Image } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getAproxTime } from './getAproachTime';

interface ViewDetailsProps {
  meal: Meal;
  onGoBack: () => void;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ meal, onGoBack }) => {


  const formatInstructions = () => {
    return meal.strInstructions.replace(/\r\n|\n/g, '<br />');
  };

  const formatIngredients = () => {
    const ingredientKeys = Object.keys(meal).filter(key => key.startsWith('strIngredient'));
    const measureKeys = Object.keys(meal).filter(key => key.startsWith('strMeasure'));

    const rtn = [];
    for(let i = 0; i < ingredientKeys.length; i++) {
      if (!meal[ingredientKeys[i] as keyof Meal] && !meal[measureKeys[i] as keyof Meal]) {
        continue;
      }
      rtn.push(meal[measureKeys[i] as keyof Meal] + ' ' + meal[ingredientKeys[i] as keyof Meal]);
    }
    return rtn.sort().filter(item => item.trim() !== '');

  }

  return (
    <Row className='mt-4'>
      <Card role="article">
        <Card.Header>
          <Card.Title as="h1">{meal.strMeal}</Card.Title>
          <Card.Img
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </Card.Header>
        <Card.Body >
          <Tabs
            defaultActiveKey="general"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="general" title="General">
              <Card.Text >
                <b>Category:</b>{meal.strCategory}
              </Card.Text>
              <Card.Text>
                <b>Origin:</b> {meal.strArea}
              </Card.Text>
              <Card.Text>
                <b>Preparation time:</b> {getAproxTime(meal.strInstructions)}
              </Card.Text>
            </Tab>
            <Tab eventKey="instructions" title="Instructions">
              <div dangerouslySetInnerHTML={{ __html: formatInstructions() }} />
            </Tab>
            <Tab eventKey="ingredients" title="Ingredients">
              {
                formatIngredients().map((el: string, index) => (
                  <Card.Text key={index}>
                    {el}
                  </Card.Text>
                ))
              }
            </Tab>
          </Tabs>

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