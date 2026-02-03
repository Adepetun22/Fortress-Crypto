/**
 * Error Component Tests
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Error from '../Error';

describe('Error', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders error icon', () => {
    render(<Error message="Something went wrong" onRetry={mockOnRetry} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('displays error message', () => {
    const errorMessage = 'Network connection failed';
    render(<Error message={errorMessage} onRetry={mockOnRetry} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('calls onRetry when retry button is clicked', () => {
    render(<Error message="Error" onRetry={mockOnRetry} />);

    const retryButton = screen.getByRole('button', { name: /retry fetching data/i });
    fireEvent.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  test('displays default message when no message provided', () => {
    render(<Error onRetry={mockOnRetry} />);

    expect(screen.getByText(/we encountered an error/i)).toBeInTheDocument();
  });

  test('displays error details in code block when message provided', () => {
    const errorMessage = 'Failed to fetch data';
    render(<Error message={errorMessage} onRetry={mockOnRetry} />);

    // Check for the error details section (monospace text)
    const errorDetails = screen.getByText((content, element) => {
      return element.className.includes('font-mono') && content.includes(errorMessage);
    });
    expect(errorDetails).toBeInTheDocument();
  });

  test('has correct accessibility attributes', () => {
    render(<Error message="Error" onRetry={mockOnRetry} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  test('displays help text', () => {
    render(<Error message="Error" onRetry={mockOnRetry} />);

    expect(screen.getByText(/if the problem persists/i)).toBeInTheDocument();
  });

  test('renders retry button with icon', () => {
    render(<Error message="Error" onRetry={mockOnRetry} />);

    const retryButton = screen.getByRole('button', { name: /retry fetching data/i });
    expect(retryButton).toBeInTheDocument();
  });
});

