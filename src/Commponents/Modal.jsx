import { useEffect, useRef } from 'react';
import { formatPrice, formatLargeNumber } from '../services/api';

/**
 * Modal Component
 * Displays detailed cryptocurrency information
 * Fully accessible with keyboard navigation
 */
const Modal = ({ coin, onClose }) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  /**
   * Handle escape key press
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  /**
   * Trap focus within modal
   */
  const handleTabKey = (e) => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  /**
   * Focus trap and keyboard handlers
   */
  useEffect(() => {
    const element = modalRef.current;
    if (!element) return;

    element.addEventListener('keydown', handleKeyDown);
    element.addEventListener('keydown', handleTabKey);

    // Store current focused element
    previousActiveElement.current = document.activeElement;

    // Focus modal
    element.focus();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      element.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = '';

      // Restore focus
      previousActiveElement.current?.focus();
    };
  }, []);

  /**
   * Handle backdrop click
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!coin) return null;

  const {
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h: change24h,
    market_cap,
    total_volume,
    circulating_supply,
    total_supply,
    high_24h,
    low_24h,
    price_change_24h,
  } = coin;

  const priceChange = change24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
      >
        {/* Modal Header */}
        <div className="relative px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Coin Info */}
          <div className="flex items-center space-x-4">
            <img
              src={image}
              alt={`${name} logo`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2
                id="modal-title"
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                {name}
              </h2>
              <span className="text-lg text-gray-500 dark:text-gray-400 uppercase">
                {symbol}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4 space-y-4">
          {/* Current Price */}
          <div className="text-center py-4">
            <p className="text-4xl font-bold font-mono text-gray-900 dark:text-white">
              {formatPrice(current_price || 0)}
            </p>
            <p
              className={`text-lg font-medium mt-2 ${
                isPositive ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              {isPositive ? '+' : ''}
              {priceChange.toFixed(2)}% (24h)
            </p>
          </div>

          {/* Price Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* 24h High */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                24h High
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                {formatPrice(high_24h || 0)}
              </p>
            </div>

            {/* 24h Low */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                24h Low
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                {formatPrice(low_24h || 0)}
              </p>
            </div>

            {/* Price Change */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Price Change (24h)
              </p>
              <p
                className={`text-lg font-semibold font-mono ${
                  (price_change_24h || 0) >= 0
                    ? 'text-emerald-500'
                    : 'text-red-500'
                }`}
              >
                {(price_change_24h || 0) >= 0 ? '+' : ''}
                {formatPrice(price_change_24h || 0)}
              </p>
            </div>

            {/* Volume */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Volume (24h)
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                {formatLargeNumber(total_volume || 0)}
              </p>
            </div>
          </div>

          {/* Market Stats */}
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Market Cap
              </span>
              <span className="font-semibold text-gray-900 dark:text-white font-mono">
                {formatLargeNumber(market_cap || 0)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Circulating Supply
              </span>
              <span className="font-semibold text-gray-900 dark:text-white font-mono">
                {circulating_supply
                  ? `${(circulating_supply / 1e6).toFixed(2)}M`
                  : 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Supply
              </span>
              <span className="font-semibold text-gray-900 dark:text-white font-mono">
                {total_supply
                  ? `${(total_supply / 1e6).toFixed(2)}M`
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <button
            onClick={onClose}
            className="w-full btn-primary"
            aria-label="Close cryptocurrency details"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

