/**
 * Footer Component Tests
 */

import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders copyright information', () => {
    render(<Footer />);

    expect(screen.getByText(/© \d{4} fortress crypto/i)).toBeInTheDocument();
  });

  test('displays data attribution', () => {
    render(<Footer />);

    expect(screen.getByText(/data provided by/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /coingecko/i })).toBeInTheDocument();
  });

  test('renders CoinGecko link with correct href', () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: /coingecko/i });
    expect(link).toHaveAttribute('href', 'https://www.coingecko.com/');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('displays disclaimer', () => {
    render(<Footer />);

    expect(screen.getByText(/cryptocurrency prices are highly volatile/i)).toBeInTheDocument();
  });

  test('renders logo icon', () => {
    render(<Footer />);

    expect(screen.getByRole('img', { name: /fortress crypto/i })).toBeInTheDocument();
  });

  test('displays last updated time when provided', () => {
    const lastUpdated = new Date('2024-01-01T12:00:00');
    render(<Footer lastUpdated={lastUpdated} />);

    expect(screen.getByText(/last updated:/i)).toBeInTheDocument();
  });

  test('does not display last updated when null', () => {
    render(<Footer lastUpdated={null} />);

    expect(screen.queryByText(/last updated:/i)).not.toBeInTheDocument();
  });

  test('has correct accessibility attributes', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});

