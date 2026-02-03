import { useState, useEffect } from 'react';
import Header from '../Commponents/Header';
import CryptoList from '../Commponents/CryptoList';
import CryptoCard from '../Commponents/CryptoCard';
import Loading from '../Commponents/Loading';
import Error from '../Commponents/Error';
import Footer from '../Commponents/Footer';
import Modal from '../Commponents/Modal';
import { useCryptoData, useDebouncedSearch } from '../hooks/useCryptoData';

/**
 * Home Page Component
 * Main dashboard page for cryptocurrency tracking
 */
const Home = () => {
  const {
    coins,
    loading,
    error,
    lastUpdated,
    refetch,
  } = useCryptoData();

  const {
    searchQuery,
    setSearchQuery,
    filteredCoins,
  } = useDebouncedSearch(coins, 300);

  const [selectedCoin, setSelectedCoin] = useState(null);

  /**
   * Handle search input change
   * @param {string} value - Search query
   */
  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  /**
   * Handle refresh button click
   */
  const handleRefresh = () => {
    refetch();
  };

  /**
   * Handle view coin details
   * @param {Object} coin - Cryptocurrency object
   */
  const handleViewCoin = (coin) => {
    setSelectedCoin(coin);
  };

  /**
   * Handle modal close
   */
  const handleCloseModal = () => {
    setSelectedCoin(null);
  };

  /**
   * Prevent body scroll when modal is open
   */
  useEffect(() => {
    if (selectedCoin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCoin]);

  /**
   * Render loading state
   */
  if (loading) {
    return <Loading />;
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          isLoading={loading}
          lastUpdated={lastUpdated}
        />
        <Error
          message={error}
          onRetry={handleRefresh}
        />
        <Footer lastUpdated={null} />
      </div>
    );
  }

  /**
   * Render main content
   */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        isLoading={loading}
        lastUpdated={lastUpdated}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredCoins.length} result{filteredCoins.length !== 1 ? 's' : ''} for "
              <span className="font-medium text-gray-900 dark:text-white">
                {searchQuery}
              </span>
              "
            </p>
          </div>
        )}

        {/* Crypto List */}
        <CryptoList
          coins={filteredCoins}
          onView={handleViewCoin}
          isLoading={loading}
          error={error}
        />

        {/* Empty State for Search */}
        {!loading && !error && filteredCoins.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No results found
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try searching for a different cryptocurrency
            </p>
          </div>
        )}

        {/* Stats Section */}
        {!loading && !error && filteredCoins.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Market Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-blue">
                    {filteredCoins.length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Cryptocurrencies
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-500">
                    {filteredCoins.filter((c) => (c.price_change_percentage_24h || 0) >= 0).length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Gaining (24h)
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-500">
                    {filteredCoins.filter((c) => (c.price_change_percentage_24h || 0) < 0).length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Losing (24h)
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer lastUpdated={lastUpdated} />

      {/* Modal */}
      {selectedCoin && (
        <Modal
          coin={selectedCoin}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;

