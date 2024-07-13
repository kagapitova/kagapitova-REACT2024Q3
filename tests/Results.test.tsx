import { render } from '@testing-library/react';
import Results from './../src/Results';
import '@testing-library/jest-dom';
import { Result } from '../src/Types';
import { BrowserRouter } from 'react-router-dom';

test('Results component renders correctly with data', () => {
  const data: Result[] = [
    { name: 'Luke Skywalker', description: 'Jedi Knight' },
    { name: 'Darth Vader', description: 'Sith Lord' },
  ];

  const { getByText } = render(
    <BrowserRouter>
      <Results results={data} />
    </BrowserRouter>,
  );

  for (const item of data) {
    const nameElement = getByText(item.name);
    const descriptionElement = getByText(item.description);
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
