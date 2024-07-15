import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from '../src/Results';
import { Result } from '../src/Types';
import { BrowserRouter } from 'react-router-dom';

test('Results component renders correctly with data', () => {
  const results: Result[] = [
    { name: 'Luke Skywalker', description: 'Jedi Knight', index: 22 },
    { name: 'Darth Vader', description: 'Sith Lord', index: 8 },
  ];

  render(
    <BrowserRouter>
      <Results results={results} />
    </BrowserRouter>,
  );

  for (const item of results) {
    const nameElement = screen.getByText(item.name);
    const descriptionElement = screen.getByText(item.description);
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  }
});

test('Results component renders correctly with empty data', () => {
  const { queryByText } = render(
    <BrowserRouter>
      <Results results={[]} />
    </BrowserRouter>,
  );
  expect(queryByText('Luke Skywalker')).toBeNull();
  expect(queryByText('Darth Vader')).toBeNull();
});
