import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Meal } from '../../types/meal.type';
import { Row, Col, Image } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getAproxTime } from '../../helpers/getAproachTime';
import { getYouTubeEmbedUrl } from '../../helpers/getYouTubeEmbedUrl';
import { Star, StarFill } from 'react-bootstrap-icons';
import { useAppContext } from '../../context/AppContext';

interface ViewDetailsProps {
  meal: Meal;
  onGoBack: () => void;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ meal, onGoBack }) => {
  const { addFavorite, removeFavorite, isMealFavorite } = useAppContext();

  const formatInstructions = () => {
    return meal.strInstructions.replace(/\r\n|\n/g, '<br />');
  };

  const formatIngredients = () => {
    const ingredientKeys = Object.keys(meal).filter(key => key.startsWith('strIngredient'));
    const measureKeys = Object.keys(meal).filter(key => key.startsWith('strMeasure'));

    const rtn = [];
    for (let i = 0; i < ingredientKeys.length; i++) {
      if (!meal[ingredientKeys[i] as keyof Meal] && !meal[measureKeys[i] as keyof Meal]) {
        continue;
      }
      rtn.push(meal[measureKeys[i] as keyof Meal] + ' ' + meal[ingredientKeys[i] as keyof Meal]);
    }
    return rtn.sort().filter(item => item.trim() !== '');

  }

  const embedSrc = getYouTubeEmbedUrl(meal.strYoutube || '');

  return (
    <Row className='mt-4'>
      <Card role="article">
        <Card.Header>
          <Row>
            <Col className="col-2"></Col>
            <Col className={'col-8 "d-flex justify-content-center align-items-center'}>
              <Card.Title as="h1">{meal.strMeal}</Card.Title>
            </Col>
            <Col className="col-2">
              {isMealFavorite(meal.idMeal) ? (
                <StarFill
                  color="gold"
                  size={32}
                  style={{ cursor: 'pointer' }}
                  onClick={() => removeFavorite(meal.idMeal)}
                  title="Remove from favorites"
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

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Card.Img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="img-fluid rounded"
            />
          </div>
        </Card.Header>
        <Card.Body >
          <Tabs
            defaultActiveKey="general"
            id="view-details-tab"
            className="mb-3"
          >
            <Tab eventKey="general" title="General">
              <Card.Text as="div">
                <Row>
                  <Col className="col-4 fw-bold">Category:</Col>
                  <Col className="col-8">{meal.strCategory}</Col>
                </Row>
              </Card.Text>
              <Card.Text as="div">
                <Row>
                  <Col className="col-4 fw-bold">Origin:</Col>
                  <Col className="col-8">{meal.strArea}</Col>
                </Row>
              </Card.Text>
              <Card.Text as="div">
                <Row>
                  <Col className="col-4 fw-bold">Preparation time:</Col>
                  <Col className="col-8">{getAproxTime(meal.strInstructions)}</Col>
                </Row>
              </Card.Text>
              {
                embedSrc && <Card.Text as="div">
                  <Row className="mt-3" role="region" aria-label="Recipe reproductor">
                    <Col className="col-12">
                      {meal.strYoutube && (
                        <iframe
                          className="embed-responsive-item"
                          src={embedSrc}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={meal.strMeal}
                        ></iframe>
                      )
                      }
                    </Col>
                  </Row>
                </Card.Text>
              }
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
          <Row className="align-items-center mt-2">
            <Col className="col-4"></Col>
            <Col className="col-4">
              <Button variant="primary" onClick={onGoBack} className="w-100">
                Back
              </Button>
            </Col>
            <Col className="col-4"></Col>
          </Row>

        </Card.Footer>


      </Card>
    </Row>

  );
};


export default ViewDetails;