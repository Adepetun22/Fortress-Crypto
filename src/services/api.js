/**
 * CoinGecko API Service
 * Handles all cryptocurrency data fetching
 */

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-tBJB6QPF1RS58iTahAuQT2CT';

/**
 * Fetch top cryptocurrencies by market cap
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Number of results per page
 * @returns {Promise<Array>} Array of cryptocurrency data
 */
export const fetchTopCryptos = async (page = 1, perPage = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};

/**
 * Fetch single cryptocurrency details
 * @param {string} coinId - CoinGecko coin ID
 * @returns {Promise<Object>} Cryptocurrency details
 */
export const fetchCryptoDetails = async (coinId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false&api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${coinId} details:`, error);
    throw error;
  }
};

/**
 * Search for cryptocurrencies
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of search results
 */
export const searchCryptos = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    throw error;
  }
};

/**
 * Format price to USD string
 * @param {number} price - Price in USD
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    price = 0;
  }
  
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    // For small prices, always show up to 6 decimal places
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(price);
    return formatted;
  }
};

/**
 * Calculate price change percentage
 * @param {number} change24h - 24h price change percentage
 * @returns {Object} Formatted change with color class
 */
export const formatPriceChange = (change24h) => {
  const isPositive = change24h >= 0;
  const formattedChange = `${isPositive ? '+' : ''}${change24h.toFixed(2)}%`;
  
  return {
    text: formattedChange,
    isPositive,
    colorClass: isPositive ? 'text-emerald-500' : 'text-red-500',
    bgClass: isPositive ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20',
  };
};

/**
 * Format large numbers (market cap, volume)
 * @param {number} num - Number to format
 * @returns {string} Formatted string
 */
export const formatLargeNumber = (num) => {
  if (num >= 1e12) {
    return `$${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  } else {
    return formatPrice(num);
  }
};

