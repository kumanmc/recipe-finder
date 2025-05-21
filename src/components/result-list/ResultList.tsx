import { Meal } from "../../types/meal.type";
import { Row, Col } from 'react-bootstrap';

interface ResultListProps {
  meals: Meal[] | null;
}

const ResultList: React.FC<ResultListProps> = ({ meals }) => {
  // console.log('------------------------')
  // console.log(meals)
  return (
    <div>
      {meals && meals.length > 0 ? (
        <Row role='list'>
        <div data-testid='recipe-list'>
          RESULTS!!!! OLEEEEE
          </div>
        </Row>
      ) : (
        // //TODO: MAKE IT BEAUTIFUL
        <p>No results found.</p>
      )}
    </div>
  );
}

export default ResultList;