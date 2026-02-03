/**
 * CryptoList Component Tests
 */

import { render, screen } from '@testing-library/react';
import CryptoList from '../CryptoList';

const mockCoins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 50000,
    price_change_percentage_24h: 2.5,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    current_price: 3000,
    price_change_percentage_24h: -1.2,
  },
];

describe('CryptoList', () => {
  const mockOnView = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders list of cryptocurrency cards', () => {
    render(<CryptoList coins={mockCoins} onView={mockOnView} />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
  });

  test('displays empty state when no coins provided', () => {
    render(<CryptoList coins={[]} onView={mockOnView} />);

    expect(screen.getByText(/no cryptocurrencies found/i)).toBeInTheDocument();
  });

  test('displays empty state when coins is null', () => {
    render(<CryptoList coins={null} onView={mockOnView} />);

    expect(screen.getByText(/no cryptocurrencies found/i)).toBeInTheDocument();
  });

  test('renders table headers on desktop', () => {
    render(<CryptoList coins={mockCoins} onView={mockOnView} />);

    expect(screen.getByText(/cryptocurrency/i)).toBeInTheDocument();
    expect(screen.getByText(/price/i)).toBeInTheDocument();
    expect(screen.getByText(/24h change/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();
  });

  test('renders correct number of cards', () => {
    render(<CryptoList coins={mockCoins} onView={mockOnView} />);

    const cards = screen.getAllByRole('button', { name: /view.*details/i });
    expect(cards).toHaveLength(2);
  });

  test('handles loading state', () => {
    render(<CryptoList coins={[]} onView={mockOnView} isLoading={true} />);

    // Should still render the list container
    expect(screen.getByRole('heading', { name: /cryptocurrency list/i })).toBeInTheDocument();
  });

  test('handles error state', () => {
    render(<CryptoList coins={[]} onView={mockOnView} error="Network error" />);

    // Should still render the list container
    expect(screen.getByRole('heading', { name: /cryptocurrency list/i })).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<CryptoList coins={mockCoins} onView={mockOnView} />);

    const listContainer = screen.getByRole('list', { name: /cryptocurrency list/i });
    expect(listContainer).toBeInTheDocument();
  });

  test('renders single cryptocurrency correctly', () => {
    const singleCoin = [mockCoins[0]];
    render(<CryptoList coins={singleCoin} onView={mockOnView} />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.queryByText('Ethereum')).not.toBeInTheDocument();
  });
});

