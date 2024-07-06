import { render } from '@testing-library/react';
import Results from './../src/Results';
import '@testing-library/jest-dom';
import { Result } from '../src/Types';

test('Results component renders correctly with data', () => {
  const data: Result[] = [
    { name: 'Luke Skywalker', description: 'Jedi Knight' },
    { name: 'Darth Vader', description: 'Sith Lord' },
  ];

  const { getByText } = render(<Results results={data} />);

  for (const item of data) {
    const nameElement = getByText(item.name);
    const descriptionElement = getByText(item.description);
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  }
});

test('Results component renders correctly with empty data', () => {
  const { queryByText } = render(<Results results={[]} />);
  expect(queryByText('Luke Skywalker')).toBeNull();
  expect(queryByText('Darth Vader')).toBeNull();
});
