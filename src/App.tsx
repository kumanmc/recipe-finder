import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeFinder from './components/RecipeFinder';
import { API_OK } from './utils/constants';

function App() {
  return (
    <div data-testid="app-container" className="App">
      <RecipeFinder api={API_OK} />
    </div>
  );
}

export default App;
