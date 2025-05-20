import React from 'react';
import logo from './logo.svg';
import './App.css';
import RecipeFinder from './pages/recipe-finder/RecipeFinder';

function App() {
  return (
    <div data-testid="app-container" className="App">
      <RecipeFinder api={'https://www.themealdb.com/api.php'} />
    </div>
  );
}

export default App;
