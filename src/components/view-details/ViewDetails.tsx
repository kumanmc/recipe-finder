import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Meal } from '../../types/meal.type';
import { Row, Col, Image } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

interface ViewDetailsProps {
  meal: Meal;
  onGoBack: () => void;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ meal, onGoBack }) => {


  const formatInstructions = () => {
    if (!meal.strInstructions) return '';
    return meal.strInstructions.replace(/\r\n|\n/g, '<br />');
  };

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
                <b>Preparation time:</b> DEVELOP
              </Card.Text>
            </Tab>
            <Tab eventKey="profile" title="Instructions">
              <div dangerouslySetInnerHTML={{ __html: formatInstructions() }} />
            </Tab>
            <Tab eventKey="ingredients" title="Ingredients">
              HERE INGREDIENTES
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