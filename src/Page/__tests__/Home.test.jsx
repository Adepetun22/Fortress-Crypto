/**
 * Home Page Tests
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../Home';

// Mock the hooks
jest.mock('../../hooks/useCryptoData', () => ({
  useCryptoData: jest.fn(),
  useDebouncedSearch: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

import { useCryptoData, useDebouncedSearch } from '../../hooks/useCryptoData';

const mockCoins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 50000,
    price_change_percentage_24h: 2.5,
    market_cap: 1000000000000,
    total_volume: 50000000000,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    current_price: 3000,
    price_change_percentage_24h: -1.2,
    market_cap: 500000000000,
    total_volume: 20000000000,
  },
];

describe('Home Page', () => {
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders loading state when data is loading', () => {
    useCryptoData.mockReturnValue({
      coins: [],
      loading: true,
      error: null,
      lastUpdated: null,
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      filteredCoins: [],
    });

    render(<Home />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders error state when there is an error', () => {
    useCryptoData.mockReturnValue({
      coins: [],
      loading: false,
      error: 'Network error',
      lastUpdated: null,
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      filteredCoins: [],
    });

    render(<Home />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  test('renders crypto list when data is loaded', () => {
    useCryptoData.mockReturnValue({
      coins: mockCoins,
      loading: false,
      error: null,
      lastUpdated: new Date(),
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      filteredCoins: mockCoins,
    });

    render(<Home />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
  });

  test('displays search results count when searching', () => {
    useCryptoData.mockReturnValue({
      coins: mockCoins,
      loading: false,
      error: null,
      lastUpdated: new Date(),
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: 'bit',
      setSearchQuery: jest.fn(),
      filteredCoins: [mockCoins[0]],
    });

    render(<Home />);

    expect(screen.getByText(/1 result for "bit"/i)).toBeInTheDocument();
  });

  test('displays empty state when no search results', () => {
    useCryptoData.mockReturnValue({
      coins: mockCoins,
      loading: false,
      error: null,
      lastUpdated: new Date(),
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: 'xyz',
      setSearchQuery: jest.fn(),
      filteredCoins: [],
    });

    render(<Home />);

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test('displays market overview stats', () => {
    useCryptoData.mockReturnValue({
      coins: mockCoins,
      loading: false,
      error: null,
      lastUpdated: new Date(),
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      filteredCoins: mockCoins,
    });

    render(<Home />);

    expect(screen.getByText(/market overview/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Total cryptos
    expect(screen.getByText('1')).toBeInTheDocument(); // Gaining
    expect(screen.getByText('1')).toBeInTheDocument(); // Losing
  });

  test('renders header component', () => {
    useCryptoData.mockReturnValue({
      coins: mockCoins,
      loading: false,
      error: null,
      lastUpdated: new Date(),
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      filteredCoins: mockCoins,
    });

    render(<Home />);

    expect(screen.getByText('Fortress Crypto')).toBeInTheDocument();
  });

  test('renders footer component', () => {
    useCryptoData.mockReturnValue({
      coins: mockCoins,
      loading: false,
      error: null,
      lastUpdated: new Date(),
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      filteredCoins: mockCoins,
    });

    render(<Home />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('opens modal when crypto card is clicked', async () => {
    useCryptoData.mockReturnValue({
      coins: mockCoins,
      loading: false,
      error: null,
      lastUpdated: new Date(),
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      filteredCoins: mockCoins,
    });

    render(<Home />);

    const viewButton = screen.getByRole('button', { name: /view bitcoin details/i });
    fireEvent.click(viewButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  test('closes modal when close button is clicked', async () => {
    useCryptoData.mockReturnValue({
      coins: mockCoins,
      loading: false,
      error: null,
      lastUpdated: new Date(),
      refetch: mockRefetch,
    });

    useDebouncedSearch.mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      filteredCoins: mockCoins,
    });

    render(<Home />);

    // Open modal
    const viewButton = screen.getByRole('button', { name: /view bitcoin details/i });
    fireEvent.click(viewButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Close modal
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

