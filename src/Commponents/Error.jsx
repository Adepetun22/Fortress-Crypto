/**
 * Error Component
 * Displays error state with retry button
 * Fully responsive across all breakpoints
 */
const Error = ({ message, onRetry }) => {
  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm">
        {/* Error Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h3>

        {/* Error Message */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {message || 'We encountered an error while fetching data. Please try again.'}
        </p>

        {/* Error Details (if available) */}
        {message && (
          <div className="w-full max-w-md p-4 mb-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all">
              {message}
            </p>
          </div>
        )}

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="btn-primary flex items-center space-x-2"
          aria-label="Retry fetching data"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Try Again</span>
        </button>

        {/* Additional Help */}
        <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
          If the problem persists, please check your connection or try again later.
        </p>
      </div>
    </div>
  );
};

export default Error;

