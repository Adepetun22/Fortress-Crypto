/**
 * Footer Component
 * Displays data attribution and copyright
 */
const Footer = ({ lastUpdated }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Copyright */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-primary-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Fortress Crypto
            </span>
          </div>

          {/* Data Attribution */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Data provided by</span>
            <a
              href="https://www.coingecko.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:text-primary-dark transition-colors font-medium"
              aria-label="CoinGecko - Cryptocurrency data source"
            >
              CoinGecko API
            </a>
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            Cryptocurrency prices are highly volatile. The information provided is for educational purposes only and should not be considered financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

