import { formatPrice, formatPriceChange } from '../services/api';

/**
 * CryptoCard Component
 * Displays individual cryptocurrency information
 * Responsive design with hover effects
 */
const CryptoCard = ({ coin, onView }) => {
  if (!coin) return null;

  const { 
    name, 
    symbol, 
    image, 
    current_price, 
    price_change_percentage_24h: change24h,
    market_cap,
    total_volume
  } = coin;

  const priceChange = formatPriceChange(change24h || 0);

  /**
   * Handle card click
   */
  const handleClick = () => {
    onView?.(coin);
  };

  /**
   * Handle view button click
   * @param {Event} e - Button click event
   */
  const handleViewClick = (e) => {
    e.stopPropagation();
    onView?.(coin);
  };

  return (
    <article
      onClick={handleClick}
      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-all duration-200 hover:shadow-lg hover:border-primary-blue/30 dark:hover:border-primary-blue/30 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${name} cryptocurrency details`}
    >
      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 lg:items-center">
        {/* Coin Info */}
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={`${name} logo`}
            className="w-10 h-10 rounded-full"
            loading="lazy"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {symbol}
            </span>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="font-mono text-lg font-semibold text-gray-900 dark:text-white">
            {formatPrice(current_price || 0)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Current Price
          </p>
        </div>

        {/* Price Change */}
        <div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${priceChange.bgClass} ${priceChange.colorClass}`}
          >
            {priceChange.text}
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            24h Change
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            onClick={handleViewClick}
            className="btn-primary text-sm"
            aria-label={`View ${name} details`}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Tablet Grid Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Coin Info & Price */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={image}
                alt={`${name} logo`}
                className="w-8 h-8 rounded-full"
                loading="lazy"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  {symbol}
                </span>
              </div>
            </div>
            <p className="font-mono text-base font-semibold text-gray-900 dark:text-white">
              {formatPrice(current_price || 0)}
            </p>
          </div>

          {/* Change & Action */}
          <div className="flex flex-col items-end space-y-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${priceChange.bgClass} ${priceChange.colorClass}`}
            >
              {priceChange.text}
            </span>
            <button
              onClick={handleViewClick}
              className="btn-primary text-xs px-3 py-1.5"
              aria-label={`View ${name} details`}
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="md:hidden">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={image}
            alt={`${name} logo`}
            className="w-10 h-10 rounded-full"
            loading="lazy"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {symbol}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
            <span className="font-mono font-semibold text-gray-900 dark:text-white">
              {formatPrice(current_price || 0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">24h Change</span>
            <span
              className={`font-medium ${priceChange.colorClass}`}
            >
              {priceChange.text}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Market Cap</span>
            <span className="font-mono text-sm text-gray-900 dark:text-white">
              ${(market_cap || 0).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Volume (24h)</span>
            <span className="font-mono text-sm text-gray-900 dark:text-white">
              ${(total_volume || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={handleViewClick}
          className="w-full mt-4 btn-primary"
          aria-label={`View ${name} details`}
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default CryptoCard;

