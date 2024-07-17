import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../src/App';

test('App component renders correctly', () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  const headingElement = getByText('Star Wars Search');
  const inputElement = getByPlaceholderText('Search...');
  expect(headingElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
});

test('App component handles search', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const inputElement = getByPlaceholderText('Search...');
  const buttonElement = getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'Luke' } });
  fireEvent.click(buttonElement);
});
