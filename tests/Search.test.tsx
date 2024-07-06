// Search.test.tsx
import { render } from '@testing-library/react';
import Search from '../src/Search';
import '@testing-library/jest-dom';

test('Search component renders correctly', () => {
  const { getByText, getByPlaceholderText } = render(
    <Search onSearch={() => {}} />,
  );
  const inputElement = getByPlaceholderText('Search...');
  const buttonElement = getByText('Search');
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
