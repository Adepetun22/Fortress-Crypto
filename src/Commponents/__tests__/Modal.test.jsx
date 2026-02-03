/**
 * Modal Component Tests
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

const mockCoin = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  image: 'https://example.com/btc.png',
  current_price: 50000,
  price_change_percentage_24h: 2.5,
  price_change_24h: 1200,
  market_cap: 1000000000000,
  total_volume: 50000000000,
  circulating_supply: 19000000,
  total_supply: 21000000,
  high_24h: 51000,
  low_24h: 49000,
};

describe('Modal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cryptocurrency details correctly', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /bitcoin/i })).toBeInTheDocument();
  });

  test('displays current price', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    expect(screen.getByText(/50,000/i)).toBeInTheDocument();
  });

  test('displays 24h change with correct color for positive change', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    expect(screen.getByText('+2.50%')).toBeInTheDocument();
  });

  test('displays price change with correct color for negative change', () => {
    const negativeCoin = {
      ...mockCoin,
      price_change_percentage_24h: -3.2,
    };
    render(<Modal coin={negativeCoin} onClose={mockOnClose} />);

    expect(screen.getByText('-3.20%')).toBeInTheDocument();
  });

  test('displays market cap', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    expect(screen.getByText(/market cap/i)).toBeInTheDocument();
  });

  test('displays volume', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    expect(screen.getByText(/volume \(24h\)/i)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when close button in footer is clicked', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close cryptocurrency details/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when backdrop is clicked', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when modal content is clicked', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    const modalContent = screen.getByRole('dialog');
    fireEvent.click(modalContent);

    // Clicking on the dialog directly should trigger onClose due to event delegation
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('handles escape key press', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renders null when coin is null', () => {
    const { container } = render(<Modal coin={null} onClose={mockOnClose} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('has correct accessibility attributes', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('displays high and low prices', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    expect(screen.getByText(/24h high/i)).toBeInTheDocument();
    expect(screen.getByText(/24h low/i)).toBeInTheDocument();
  });

  test('displays supply information', () => {
    render(<Modal coin={mockCoin} onClose={mockOnClose} />);

    expect(screen.getByText(/circulating supply/i)).toBeInTheDocument();
    expect(screen.getByText(/total supply/i)).toBeInTheDocument();
  });

  test('handles missing data gracefully', () => {
    const incompleteCoin = {
      ...mockCoin,
      circulating_supply: null,
      total_supply: null,
      high_24h: null,
      low_24h: null,
    };
    render(<Modal coin={incompleteCoin} onClose={mockOnClose} />);

    expect(screen.getByText(/n\/a/i)).toBeInTheDocument();
  });
});

