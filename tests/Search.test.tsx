import React from 'react';
import { render } from '@testing-library/react';
import Search from '../src/Search';
import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';

type SearchServiceType = (searchTerm: string) => Promise<void>;
const mockSearchService: SearchServiceType = vi.fn();

test('Search component renders correctly', () => {
  const { getByText, getByPlaceholderText } = render(
    <Search onSearch={mockSearchService} />,
  );
  const inputElement = getByPlaceholderText('Search...');
  const buttonElement = getByText('Search');
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
