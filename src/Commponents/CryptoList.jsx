import CryptoCard from './CryptoCard';

/**
 * CryptoList Component
 * Displays a list of cryptocurrency cards
 * Handles empty states and responsive layout
 */
const CryptoList = ({ coins, onView, isLoading, error }) => {
  /**
   * Render empty state
   */
  const renderEmptyState = () => (
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
        No cryptocurrencies found
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Try adjusting your search criteria
      </p>
    </div>
  );

  /**
   * Render list of crypto cards
   */
  const renderCryptoCards = () => {
    if (!coins || coins.length === 0) {
      return renderEmptyState();
    }

    return (
      <div className="space-y-4">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 lg:px-6 lg:py-3 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Cryptocurrency
          </span>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Price
          </span>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            24h Change
          </span>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
            Actions
          </span>
        </div>

        {/* Crypto Cards */}
        <div className="space-y-3 lg:space-y-0" role="list" aria-label="Cryptocurrency list">
          {coins.map((coin) => (
            <CryptoCard
              key={coin.id}
              coin={coin}
              onView={onView}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-labelledby="crypto-list-heading"
    >
      <h2 
        id="crypto-list-heading" 
        className="sr-only"
      >
        Cryptocurrency List
      </h2>
      
      {renderCryptoCards()}
    </section>
  );
};

export default CryptoList;

