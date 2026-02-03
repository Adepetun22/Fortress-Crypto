/**
 * Loading Component Tests
 */

import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  test('renders loading spinner', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('displays loading text', () => {
    render(<Loading />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays loading subtitle', () => {
    render(<Loading />);

    expect(screen.getByText(/fetching cryptocurrency data/i)).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<Loading />);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-label', 'Loading cryptocurrency data');
  });

  test('renders screen reader only text', () => {
    render(<Loading />);

    const srText = screen.getByText(/loading cryptocurrency data, please wait/i);
    expect(srText).toHaveClass('sr-only');
  });

  test('displays animated dots', () => {
    render(<Loading />);

    const dots = screen.getAllByText('');
    expect(dots.length).toBeGreaterThan(0);
  });
});

