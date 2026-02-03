/**
 * CryptoCard Component Tests
 */

import { render, screen, fireEvent } from '@testing-library/react';
import CryptoCard from '../CryptoCard';

const mockCoin = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  image: 'https://example.com/btc.png',
  current_price: 50000,
  price_change_percentage_24h: 2.5,
  market_cap: 1000000000000,
  total_volume: 50000000000,
};

describe('CryptoCard', () => {
  const mockOnView = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cryptocurrency information correctly', () => {
    render(<CryptoCard coin={mockCoin} onView={mockOnView} />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText(/50,000/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /bitcoin logo/i })).toHaveAttribute('src', 'https://example.com/btc.png');
  });

  test('displays price change with correct color for positive change', () => {
    render(<CryptoCard coin={mockCoin} onView={mockOnView} />);

    expect(screen.getByText('+2.50%')).toBeInTheDocument();
  });

  test('displays price change with correct color for negative change', () => {
    const negativeCoin = {
      ...mockCoin,
      price_change_percentage_24h: -3.2,
    };
    render(<CryptoCard coin={negativeCoin} onView={mockOnView} />);

    expect(screen.getByText('-3.20%')).toBeInTheDocument();
  });

  test('calls onView when card is clicked', () => {
    render(<CryptoCard coin={mockCoin} onView={mockOnView} />);

    const card = screen.getByRole('button', { name: /view bitcoin details/i });
    fireEvent.click(card);

    expect(mockOnView).toHaveBeenCalledTimes(1);
    expect(mockOnView).toHaveBeenCalledWith(mockCoin);
  });

  test('handles null coin gracefully', () => {
    const { container } = render(<CryptoCard coin={null} onView={mockOnView} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('handles missing price data', () => {
    const partialCoin = {
      ...mockCoin,
      current_price: null,
      price_change_percentage_24h: null,
    };
    render(<CryptoCard coin={partialCoin} onView={mockOnView} />);

    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('+0.00%')).toBeInTheDocument();
  });

  test('displays market cap and volume on mobile', () => {
    render(<CryptoCard coin={mockCoin} onView={mockOnView} />);

    expect(screen.getByText(/market cap/i)).toBeInTheDocument();
    expect(screen.getByText(/volume \(24h\)/i)).toBeInTheDocument();
  });

  test('handles keyboard navigation', () => {
    render(<CryptoCard coin={mockCoin} onView={mockOnView} />);

    const card = screen.getByRole('button', { name: /view bitcoin details/i });
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockOnView).toHaveBeenCalledTimes(1);
  });

  test('prevents event propagation on view button click', () => {
    render(<CryptoCard coin={mockCoin} onView={mockOnView} />);

    const viewButton = screen.getByRole('button', { name: /view bitcoin details/i });
    fireEvent.click(viewButton);

    expect(mockOnView).toHaveBeenCalledTimes(1);
  });
});

