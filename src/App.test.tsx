import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppProvider } from './context/AppContext';

test('renders learn react link', () => {
  render(<AppProvider><App /></AppProvider>);
  const element = screen.getByTestId('app-container')
  expect(element).toBeInTheDocument();
});
