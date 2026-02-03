/**
 * Loading Component
 * Displays a centered loading spinner with overlay
 * Fully responsive across all breakpoints
 */
const Loading = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Loading cryptocurrency data"
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          
          {/* Inner Spinning Ring */}
          <div className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-transparent border-t-primary-blue animate-spin"></div>
          
          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-primary-blue rounded-full"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Loading...
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Fetching cryptocurrency data
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      {/* Screen Reader Announcement */}
      <span className="sr-only">Loading cryptocurrency data, please wait...</span>
    </div>
  );
};

export default Loading;

