import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from '../src/Results';
import { Result } from '../src/Types';
import { BrowserRouter as Router } from 'react-router-dom';

test('Results component renders correctly with data', () => {
  const results: Result[] = [
    { name: 'Luke Skywalker', description: 'Jedi Knight', index: 22 },
    { name: 'Darth Vader', description: 'Sith Lord', index: 8 },
  ];

  render(
    <Router>
      <Results results={results} />
    </Router>,
  );

  for (const item of results) {
    const nameElement = screen.getByText(item.name);
    const descriptionElement = screen.getByText(item.description);
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  }
});

test('Check that an appropriate message is displayed if no cards are present', () => {
  const { queryByText } = render(
    <Router>
      <Results results={[]} />
    </Router>,
  );
  expect(queryByText('Luke Skywalker')).toBeNull();
  expect(queryByText('Darth Vader')).toBeNull();
});

test('Verify that the component renders the specified number of cards', () => {
  const results: Result[] = [
    { name: 'Luke Skywalker', description: 'Jedi Knight', index: 22 },
    { name: 'Darth Vader', description: 'Sith Lord', index: 8 },
    { name: 'Leia Organa', description: 'Rebel Leader', index: 9 },
    { name: 'Han Solo', description: 'Smuggler', index: 10 },
    { name: 'Yoda', description: 'Jedi Master', index: 11 },
    { name: 'Palpatine', description: 'Sith Emperor', index: 12 },
  ];

  render(
    <Router>
      <Results results={results} />
    </Router>,
  );

  const itemsPerPage = 5;
  const renderedItems = screen.getAllByTestId('result-item');
  expect(renderedItems.length).toBeLessThanOrEqual(itemsPerPage);
});
