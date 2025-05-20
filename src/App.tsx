import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeFinder from './pages/recipe-finder/RecipeFinder';
import { API_OK } from './utils/constants';

function App() {
  return (
    <div data-testid="app-container" className="App">
      <RecipeFinder api={API_OK} />
    </div>
  );
}

export default App;
