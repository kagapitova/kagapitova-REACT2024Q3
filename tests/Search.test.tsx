import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Search from '../src/Search';
import '@testing-library/jest-dom';

describe('Search component', () => {
  const mockSearchService = vi.fn(() => Promise.resolve());

  beforeEach(() => {
    localStorage.clear();
    mockSearchService.mockClear();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Search onSearch={mockSearchService} />,
    );
    const inputElement = getByPlaceholderText('Search...');
    const buttonElement = getByText('Search');
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('saves the entered value to local storage when Search button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(
      <Search onSearch={mockSearchService} />,
    );
    const inputElement = getByPlaceholderText('Search...');
    const buttonElement = getByText('Search');

    fireEvent.change(inputElement, { target: { value: 'test search' } });
    expect(inputElement).toHaveValue('test search');

    fireEvent.click(buttonElement);

    expect(localStorage.getItem('searchTerm')).toBe('test search');
  });

  it('calls onSearch with the trimmed search term when Search button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(
      <Search onSearch={mockSearchService} />,
    );
    const inputElement = getByPlaceholderText('Search...');
    const buttonElement = getByText('Search');

    fireEvent.change(inputElement, { target: { value: '   test search   ' } });
    expect(inputElement).toHaveValue('   test search   ');

    fireEvent.click(buttonElement);

    expect(mockSearchService).toHaveBeenCalledWith('test search');
  });
});
