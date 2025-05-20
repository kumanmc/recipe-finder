import { GridLoader } from 'react-spinners'

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

export default Spinner;