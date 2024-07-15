import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../src/ErrorBoundary';

vi.spyOn(console, 'error').mockImplementation(() => {});

describe('ErrorBoundary', () => {
  afterEach(() => {
    (console.error as jest.Mock).mockClear();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>,
    );
    expect(getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const ProblemChild = () => {
      throw new Error('Error thrown from problem child');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(getByText('Something went wrong.')).toBeInTheDocument();
    expect(getByText('Refresh the page')).toBeInTheDocument();
  });

  it('calls componentDidCatch when an error is thrown', () => {
    const ProblemChild = () => {
      throw new Error('Error thrown from problem child');
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(console.error).toHaveBeenCalled();
  });
});
