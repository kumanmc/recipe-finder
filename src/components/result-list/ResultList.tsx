import { Meal } from "../../types/meal.type";

interface ResultListProps {
  meals: Meal[] | null;
}

const ResultList: React.FC<ResultListProps> = ({ meals }) => {
  // console.log('------------------------')
  // console.log(meals)
  return (
    <div>
      {meals && meals.length > 0 ? (
        <div data-testid='recipe-list'>
          RESULTS!!!! OLEEEEE
          </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default ResultList;