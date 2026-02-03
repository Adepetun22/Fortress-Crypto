/**
 * API Service Tests
 * Tests for utility functions and API calls
 */

import {
  formatPrice,
  formatPriceChange,
  formatLargeNumber,
  fetchTopCryptos,
  fetchCryptoDetails,
  searchCryptos,
} from '../../services/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Service - formatPrice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('formats prices >= 1 correctly', () => {
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(1)).toBe('$1.00');
    expect(formatPrice(100)).toBe('$100.00');
    expect(formatPrice(1234.56)).toBe('$1,234.56');
    expect(formatPrice(50000)).toBe('$50,000.00');
    expect(formatPrice(1000000)).toBe('$1,000,000.00');
  });

  test('formats small prices < 1 with more decimal places', () => {
    expect(formatPrice(0.5)).toBe('$0.500000');
    expect(formatPrice(0.123456)).toBe('$0.123456');
    expect(formatPrice(0.001)).toBe('$0.001000');
    expect(formatPrice(0.999999)).toBe('$0.999999');
  });

  test('handles zero and undefined values', () => {
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(null)).toBe('$0.00');
    expect(formatPrice(undefined)).toBe('$0.00');
  });

  test('formats large numbers correctly', () => {
    expect(formatPrice(1000000)).toBe('$1,000,000.00');
    expect(formatPrice(1234567890)).toBe('$1,234,567,890.00');
  });
});

describe('API Service - formatPriceChange', () => {
  test('formats positive price changes correctly', () => {
    const positive1 = formatPriceChange(5.5);
    expect(positive1.text).toBe('+5.50%');
    expect(positive1.isPositive).toBe(true);
    expect(positive1.colorClass).toBe('text-emerald-500');
    expect(positive1.bgClass).toBe('bg-emerald-50 dark:bg-emerald-900/20');
  });

  test('formats negative price changes correctly', () => {
    const negative = formatPriceChange(-3.25);
    expect(negative.text).toBe('-3.25%');
    expect(negative.isPositive).toBe(false);
    expect(negative.colorClass).toBe('text-red-500');
    expect(negative.bgClass).toBe('bg-red-50 dark:bg-red-900/20');
  });

  test('formats zero price change correctly', () => {
    const zero = formatPriceChange(0);
    expect(zero.text).toBe('+0.00%');
    expect(zero.isPositive).toBe(true);
    expect(zero.colorClass).toBe('text-emerald-500');
  });

  test('formats decimal values with proper precision', () => {
    const decimal = formatPriceChange(12.345);
    expect(decimal.text).toBe('+12.35%');
  });

  test('handles negative decimals', () => {
    const negativeDecimal = formatPriceChange(-0.5);
    expect(negativeDecimal.text).toBe('-0.50%');
  });

  test('handles large values', () => {
    const largePositive = formatPriceChange(100.99);
    expect(largePositive.text).toBe('+100.99%');
    expect(largePositive.isPositive).toBe(true);
  });
});

describe('API Service - formatLargeNumber', () => {
  test('formats trillions correctly', () => {
    expect(formatLargeNumber(1e12)).toBe('$1.00T');
    expect(formatLargeNumber(2.5e12)).toBe('$2.50T');
    expect(formatLargeNumber(10.99e12)).toBe('$10.99T');
  });

  test('formats billions correctly', () => {
    expect(formatLargeNumber(1e9)).toBe('$1.00B');
    expect(formatLargeNumber(5000000000)).toBe('$5.00B');
    expect(formatLargeNumber(1234567890)).toBe('$1234.57B');
  });

  test('formats millions correctly', () => {
    expect(formatLargeNumber(1e6)).toBe('$1.00M');
    expect(formatLargeNumber(50000000)).toBe('$50.00M');
    expect(formatLargeNumber(123456789)).toBe('$123.46M');
  });

  test('formats smaller numbers using formatPrice', () => {
    expect(formatLargeNumber(100000)).toBe('$100,000.00');
    expect(formatLargeNumber(5000)).toBe('$5,000.00');
    expect(formatLargeNumber(0)).toBe('$0.00');
  });

  test('handles edge cases', () => {
    expect(formatLargeNumber(null)).toBe('$0.00');
    expect(formatLargeNumber(undefined)).toBe('$0.00');
  });
});

describe('API Service - fetchTopCryptos', () => {
  const mockCryptoData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      current_price: 50000,
      market_cap: 1000000000000,
      total_volume: 50000000000,
      price_change_percentage_24h: 2.5,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      current_price: 3000,
      market_cap: 500000000000,
      total_volume: 20000000000,
      price_change_percentage_24h: -1.2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches top cryptocurrencies successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCryptoData,
    });

    const result = await fetchTopCryptos(1, 20);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCryptoData);
  });

  test('throws error on failed response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchTopCryptos(1, 20)).rejects.toThrow('HTTP error! status: 500');
  });

  test('throws error on network failure', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchTopCryptos(1, 20)).rejects.toThrow('Network error');
  });

  test('uses default parameters', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await fetchTopCryptos();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('page=1'),
      expect.stringContaining('per_page=20')
    );
  });

  test('uses custom parameters', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await fetchTopCryptos(2, 50);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('page=2'),
      expect.stringContaining('per_page=50')
    );
  });
});

describe('API Service - fetchCryptoDetails', () => {
  const mockDetailData = {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    current_price: 50000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches single cryptocurrency details successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDetailData,
    });

    const result = await fetchCryptoDetails('bitcoin');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockDetailData);
  });

  test('throws error on failed response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchCryptoDetails('bitcoin')).rejects.toThrow('HTTP error! status: 404');
  });

  test('uses correct coin ID in API call', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await fetchCryptoDetails('ethereum');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/coins/ethereum')
    );
  });
});

describe('API Service - searchCryptos', () => {
  const mockSearchResults = {
    coins: [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
      { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('searches cryptocurrencies successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResults,
    });

    const result = await searchCryptos('bitcoin');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSearchResults.coins);
  });

  test('returns empty array on failed response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(searchCryptos('bitcoin')).rejects.toThrow('HTTP error! status: 500');
  });

  test('returns empty array when no coins found', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ coins: [] }),
    });

    const result = await searchCryptos('nonexistent');
    expect(result).toEqual([]);
  });

  test('encodes search query properly', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ coins: [] }),
    });

    await searchCryptos('bitcoin cash');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('query=bitcoin%20cash')
    );
  });
});

