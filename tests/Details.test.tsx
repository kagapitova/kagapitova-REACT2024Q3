import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useNavigate, useLocation } from 'react-router-dom';
import Details from '../src/Details';
import { Result } from '../src/Types';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

describe('Details component', () => {
  const mockNavigate = vi.fn();
  const mockDetailsSetIsOpen = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/details',
      search: '?details=1',
      state: null,
      hash: '',
      key: 'mockKey',
    });
    mockNavigate.mockClear();
    mockDetailsSetIsOpen.mockClear();
  });

  const selectedItem: Result = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    skin_color: 'fair',
    mass: '77',
    eye_color: 'blue',
    gender: 'male',
    index: 1,
    description:
      'Luke Skywalker is a central character in the original Star Wars trilogy.',
  };

  it('should render details of the selected item', () => {
    const { getByText } = render(
      <Details
        selectedItem={selectedItem}
        detailsSetIsOpen={vi.fn()}
        detailsIsOpen={true}
      />,
    );

    expect(getByText('Details of the selected item')).toBeInTheDocument();
    expect(getByText('Name: Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Birth year: 19BBY')).toBeInTheDocument();
    expect(getByText('Skin color: fair')).toBeInTheDocument();
    expect(getByText('Mass: 77')).toBeInTheDocument();
    expect(getByText('Eye color: blue')).toBeInTheDocument();
    expect(getByText('Gender: male')).toBeInTheDocument();
  });

  it('should call detailsSetIsOpen and navigate when Close Details button is clicked', () => {
    const { getByText } = render(
      <Details
        selectedItem={selectedItem}
        detailsSetIsOpen={mockDetailsSetIsOpen}
        detailsIsOpen={true}
      />,
    );

    const closeButton = getByText('Close Details');
    fireEvent.click(closeButton);

    expect(mockDetailsSetIsOpen).toHaveBeenCalledWith(false);
    expect(mockNavigate).toHaveBeenCalledWith('?');
  });

  it('should not render when detailsIsOpen is false', () => {
    const { queryByText } = render(
      <Details
        selectedItem={selectedItem}
        detailsSetIsOpen={vi.fn()}
        detailsIsOpen={false}
      />,
    );

    expect(queryByText('Details of the selected item')).not.toBeInTheDocument();
  });

  it('should not render when selectedItem is undefined', () => {
    const { queryByText } = render(
      <Details
        selectedItem={undefined}
        detailsSetIsOpen={vi.fn()}
        detailsIsOpen={true}
      />,
    );

    expect(queryByText('Details of the selected item')).not.toBeInTheDocument();
  });
});
