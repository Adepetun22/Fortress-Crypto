/**
 * Custom Hooks Tests
 * Tests for useCryptoData, useCryptoSearch, and useDebouncedSearch hooks
 */

import { renderHook, act } from '@testing-library/react';
import { useCryptoData, useCryptoSearch, useDebouncedSearch } from '../useCryptoData';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchTopCryptos: jest.fn(),
}));

import { fetchTopCryptos } from '../../services/api';

describe('useCryptoData Hook', () => {
  const mockCryptoData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      current_price: 50000,
      market_cap: 1000000000000,
      price_change_percentage_24h: 2.5,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      current_price: 3000,
      market_cap: 500000000000,
      price_change_percentage_24h: -1.2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('initializes with loading state', () => {
    fetchTopCryptos.mockImplementation(() => new Promise(() => {})); // Pending promise

    const { result } = renderHook(() => useCryptoData());

    expect(result.current.loading).toBe(true);
    expect(result.current.coins).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('fetches and stores data on mount', async () => {
    fetchTopCryptos.mockResolvedValueOnce(mockCryptoData);

    const { result, waitForNextUpdate } = renderHook(() => useCryptoData());

    // Initial state should be loading
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.coins).toEqual(mockCryptoData);
    expect(result.current.error).toBeNull();
    expect(result.current.lastUpdated).toBeInstanceOf(Date);
  });

  test('handles API errors correctly', async () => {
    const errorMessage = 'Network error';
    fetchTopCryptos.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useCryptoData());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.coins).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  test('refetch function re-fetches data', async () => {
    fetchTopCryptos.mockResolvedValueOnce(mockCryptoData);

    const { result, waitForNextUpdate } = renderHook(() => useCryptoData());
    await waitForNextUpdate();

    // Update mock for second call
    const newData = [mockCryptoData[0]];
    fetchTopCryptos.mockResolvedValueOnce(newData);

    await act(async () => {
      result.current.refetch();
    });

    expect(result.current.coins).toEqual(newData);
  });

  test('sets lastUpdated timestamp', async () => {
    fetchTopCryptos.mockResolvedValueOnce(mockCryptoData);

    const { result, waitForNextUpdate } = renderHook(() => useCryptoData());
    await waitForNextUpdate();

    expect(result.current.lastUpdated).not.toBeNull();
    expect(result.current.lastUpdated).toBeInstanceOf(Date);
  });
});

describe('useCryptoSearch Hook', () => {
  const mockCoins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with empty search query', () => {
    const { result } = renderHook(() => useCryptoSearch(mockCoins));

    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredCoins).toEqual(mockCoins);
  });

  test('filters coins by name', () => {
    const { result, rerender } = renderHook(
      ({ coins }) => useCryptoSearch(coins),
      { initialProps: { coins: mockCoins } }
    );

    // Simulate search
    act(() => {
      result.current.setSearchQuery('ethereum');
    });

    expect(result.current.searchQuery).toBe('ethereum');
    expect(result.current.filteredCoins).toHaveLength(1);
    expect(result.current.filteredCoins[0].id).toBe('ethereum');
  });

  test('filters coins by symbol', () => {
    const { result, rerender } = renderHook(
      ({ coins }) => useCryptoSearch(coins),
      { initialProps: { coins: mockCoins } }
    );

    act(() => {
      result.current.setSearchQuery('BCH');
    });

    expect(result.current.searchQuery).toBe('BCH');
    expect(result.current.filteredCoins).toHaveLength(1);
    expect(result.current.filteredCoins[0].symbol).toBe('BCH');
  });

  test('filters case-insensitively', () => {
    const { result } = renderHook(() => useCryptoSearch(mockCoins));

    act(() => {
      result.current.setSearchQuery('BITCOIN');
    });

    expect(result.current.filteredCoins).toHaveLength(2);
  });

  test('handles partial matches', () => {
    const { result } = renderHook(() => useCryptoSearch(mockCoins));

    act(() => {
      result.current.setSearchQuery('bit');
    });

    expect(result.current.filteredCoins).toHaveLength(2);
  });

  test('returns all coins when search is empty', () => {
    const { result } = renderHook(() => useCryptoSearch(mockCoins));

    act(() => {
      result.current.setSearchQuery('bit');
    });
    expect(result.current.filteredCoins).toHaveLength(2);

    act(() => {
      result.current.setSearchQuery('');
    });
    expect(result.current.filteredCoins).toEqual(mockCoins);
  });

  test('handles whitespace in search query', () => {
    const { result } = renderHook(() => useCryptoSearch(mockCoins));

    act(() => {
      result.current.setSearchQuery('  bitcoin  ');
    });

    expect(result.current.filteredCoins).toHaveLength(2);
  });

  test('returns empty array when no matches found', () => {
    const { result } = renderHook(() => useCryptoSearch(mockCoins));

    act(() => {
      result.current.setSearchQuery('xyz');
    });

    expect(result.current.filteredCoins).toHaveLength(0);
  });

  test('updates filteredCoins when source coins change', () => {
    const { result, rerender } = renderHook(
      ({ coins }) => useCryptoSearch(coins),
      { initialProps: { coins: mockCoins } }
    );

    act(() => {
      result.current.setSearchQuery('bit');
    });

    expect(result.current.filteredCoins).toHaveLength(2);

    // Update coins
    const newCoins = [...mockCoins, { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' }];
    rerender({ coins: newCoins });

    expect(result.current.filteredCoins).toHaveLength(2);
  });
});

describe('useDebouncedSearch Hook', () => {
  const mockCoins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('initializes with empty search query', () => {
    const { result } = renderHook(() => useDebouncedSearch(mockCoins));

    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredCoins).toEqual(mockCoins);
  });

  test('filters coins after debounce delay', async () => {
    const { result } = renderHook(() => useDebouncedSearch(mockCoins));

    act(() => {
      result.current.setSearchQuery('ethereum');
    });

    // Immediately, should still show all coins (debounce not complete)
    expect(result.current.filteredCoins).toEqual(mockCoins);

    // Advance timers past the debounce delay
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Now should be filtered
    expect(result.current.filteredCoins).toHaveLength(1);
    expect(result.current.filteredCoins[0].id).toBe('ethereum');
  });

  test('updates search query immediately', () => {
    const { result } = renderHook(() => useDebouncedSearch(mockCoins));

    act(() => {
      result.current.setSearchQuery('bitcoin');
    });

    expect(result.current.searchQuery).toBe('bitcoin');
  });

  test('clears filter when search query is empty after debounce', async () => {
    const { result } = renderHook(() => useDebouncedSearch(mockCoins));

    act(() => {
      result.current.setSearchQuery('eth');
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.filteredCoins).toHaveLength(1);

    act(() => {
      result.current.setSearchQuery('');
    });

    expect(result.current.searchQuery).toBe('');

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.filteredCoins).toEqual(mockCoins);
  });

  test('uses custom delay', async () => {
    const { result } = renderHook(() => useDebouncedSearch(mockCoins, 500));

    act(() => {
      result.current.setSearchQuery('eth');
    });

    // Advance timers but not past the delay
    act(() => {
      jest.advanceTimersByTime(400);
    });

    // Should still show all coins
    expect(result.current.filteredCoins).toEqual(mockCoins);

    // Advance past the custom delay
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Now should be filtered
    expect(result.current.filteredCoins).toHaveLength(1);
  });

  test('cancels previous timer when query changes', async () => {
    const { result } = renderHook(() => useDebouncedSearch(mockCoins));

    // First query
    act(() => {
      result.current.setSearchQuery('bit');
    });

    // Change query before debounce completes
    act(() => {
      result.current.setSearchQuery('bitcoin');
    });

    // Advance past the debounce delay
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    // Should filter for "bitcoin", not "bit"
    expect(result.current.filteredCoins).toHaveLength(1);
    expect(result.current.filteredCoins[0].name).toBe('Bitcoin');
  });
});

