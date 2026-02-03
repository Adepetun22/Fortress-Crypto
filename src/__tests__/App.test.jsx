/**
 * App Component Tests
 */

import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the hooks to prevent actual API calls
jest.mock('../hooks/useCryptoData', () => ({
  useCryptoData: jest.fn().mockReturnValue({
    coins: [],
    loading: false,
    error: null,
    lastUpdated: null,
    refetch: jest.fn(),
  }),
  useDebouncedSearch: jest.fn().mockReturnValue({
    searchQuery: '',
    setSearchQuery: jest.fn(),
    filteredCoins: [],
  }),
}));

describe('App', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});

