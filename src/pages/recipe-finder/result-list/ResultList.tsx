const ResultList: React.FC<{ results: any[] }> = ({ results }) => {
  return (
    <div>
      {results && results.length > 0 ? (
        <p>RESULTS!!!! OLEEEEE</p>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default ResultList;