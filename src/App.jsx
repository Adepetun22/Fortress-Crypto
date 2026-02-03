import { useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const cryptoAssets = [
    { name: 'Bitcoin', symbol: 'BTC', price: 43250.00, change: 2.5, color: 'crypto-bitcoin' },
    { name: 'Ethereum', symbol: 'ETH', price: 2280.50, change: -1.2, color: 'crypto-ethereum' },
    { name: 'Cardano', symbol: 'ADA', price: 0.55, change: 0.8, color: 'crypto-cardano' },
    { name: 'Solana', symbol: 'SOL', price: 98.75, change: -3.4, color: 'crypto-solana' },
  ]

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-background-secondary shadow-sm border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
              <span className="text-primary-blue">Fortress</span> Crypto
            </h1>
            <button 
              onClick={handleRefresh}
              className="btn-secondary"
              aria-label="Refresh data"
            >
              <svg 
                className={`w-5 h-5 text-text-secondary dark:text-text-secondary-dark ${isLoading ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
            Welcome to Fortress Crypto
          </h2>
          <p className="text-text-secondary dark:text-text-secondary-dark">
            Your secure gateway to cryptocurrency monitoring
          </p>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Balance', value: '$12,450.00', trend: '+5.2%' },
            { label: '24h Volume', value: '$1.2M', trend: '+12.3%' },
            { label: 'Active Trades', value: '24', trend: '-2.1%' },
            { label: 'Portfolio Value', value: '$45,680', trend: '+3.8%' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-background-secondary rounded-lg p-6 shadow-sm border border-border-light dark:border-border-dark"
            >
              <p className="text-sm font-medium text-text-muted dark:text-text-muted-dark mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
                {stat.value}
              </p>
              <span className={`text-sm font-medium ${
                stat.trend.startsWith('+') 
                  ? 'text-secondary-success' 
                  : 'text-secondary-error'
              }`}>
                {stat.trend}
              </span>
            </div>
          ))}
        </section>

        {/* Crypto Assets List */}
        <section className="bg-white dark:bg-background-secondary rounded-lg shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
          <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
              Top Assets
            </h3>
          </div>
          <div className="divide-y divide-border-light dark:divide-border-dark">
            {cryptoAssets.map((asset) => (
              <div 
                key={asset.symbol}
                className="list-item px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${asset.color}`}>
                    {asset.symbol[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary dark:text-text-primary-dark">
                      {asset.name}
                    </p>
                    <p className="text-sm text-text-muted dark:text-text-muted-dark">
                      {asset.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-primary dark:text-text-primary-dark font-mono-numbers">
                    ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <span className={`text-sm font-medium ${
                    asset.change >= 0 
                      ? 'text-secondary-success' 
                      : 'text-secondary-error'
                  }`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mt-8 flex flex-wrap gap-4">
          <button className="btn-primary">
            View All Assets
          </button>
          <button className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            Add New Asset
          </button>
        </section>

        {/* Color Palette Demo */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
            Design System Colors
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Primary Blue', class: 'bg-primary-blue' },
              { name: 'Primary Dark', class: 'bg-primary-dark' },
              { name: 'Success', class: 'bg-secondary-success' },
              { name: 'Warning', class: 'bg-secondary-warning' },
              { name: 'Error', class: 'bg-secondary-error' },
              { name: 'Bitcoin', class: 'bg-crypto-bitcoin' },
              { name: 'Ethereum', class: 'bg-crypto-ethereum' },
              { name: 'Cardano', class: 'bg-crypto-cardano' },
              { name: 'Solana', class: 'bg-crypto-solana' },
            ].map((color) => (
              <div key={color.name} className="space-y-2">
                <div className={`${color.class} h-16 rounded-lg shadow-sm`}></div>
                <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                  {color.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Demo */}
        <section className="mt-8 p-6 bg-white dark:bg-background-secondary rounded-lg border border-border-light dark:border-border-dark">
          <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
            Typography
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-muted dark:text-text-muted-dark mb-1">Primary Font (Inter)</p>
              <p className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted dark:text-text-muted-dark mb-1">Monospace Numbers</p>
              <p className="text-2xl font-mono font-bold text-text-primary dark:text-text-primary-dark font-mono-numbers">
                $12,450.00 BTC 0.0045 ETH
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-secondary border-t border-border-light dark:border-border-dark mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-text-muted dark:text-text-muted-dark">
            Fortress Crypto © 2024. All rights reserved.
          </p>
          <p className="text-center text-xs text-text-muted dark:text-text-muted-dark mt-2">
            Accessibility: Color contrast ratios meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

