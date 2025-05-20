const ResultList: React.FC<{ results: any[] }> = ({ results }) => {
  return (
    <div>
      {results && results.length > 0 ? (
        <div role="recipe-list">
          RESULTS!!!! OLEEEEE
          </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default ResultList;