import { Meal } from "../../types/meal.type";
import MealCard from './MealCard';
import { Row, Col } from 'react-bootstrap';

interface ResultListProps {
  meals: Meal[] | null;
}

const ResultList: React.FC<ResultListProps> = ({ meals }) => {
  return (
    <div>
      {meals && meals.length > 0 ? (
        <Row role='list'>
          {meals.map((meal) => (
            <Col role={'listitem'} key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-2 d-flex">
              <MealCard meal={meal} />
            </Col>
          ))}
        </Row>
      ) : (
        // //TODO: MAKE IT BEAUTIFUL
        <p>No results found.</p>
      )}
    </div>
  );
}

export default ResultList;