import { useState, useEffect, useCallback } from 'react';
import { fetchTopCryptos } from '../services/api';

/**
 * Custom hook for fetching cryptocurrency data
 * Handles loading states, errors, and data management
 */
export const useCryptoData = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTopCryptos(1, 20);
      setCoins(data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    coins,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
  };
};

/**
 * Custom hook for search functionality
 * Filters coins based on search query
 */
export const useCryptoSearch = (coins) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCoins, setFilteredCoins] = useState(coins);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCoins(coins);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      );
      setFilteredCoins(filtered);
    }
  }, [coins, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredCoins,
  };
};

/**
 * Custom hook for debounced search
 * Delays filtering until user stops typing
 */
export const useDebouncedSearch = (coins, delay = 300) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCoins, setFilteredCoins] = useState(coins);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Update debounced query after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchQuery, delay]);

  // Filter coins based on debounced query
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setFilteredCoins(coins);
    } else {
      const query = debouncedQuery.toLowerCase().trim();
      const filtered = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      );
      setFilteredCoins(filtered);
    }
  }, [coins, debouncedQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredCoins,
  };
};

