/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ==========================================
      // 1. COLOR PALETTE
      // ==========================================
      
      colors: {
        // Primary Colors (Brand Identity)
        primary: {
          blue: '#2563EB',  // Main buttons, active states, headers
          dark: '#1E40AF',  // Hover states, accents
        },
        
        // Secondary Colors (Support & Data Visualization)
        secondary: {
          success: '#10B981',  // Positive price changes, status indicators
          warning: '#F59E0B',  // Neutral/moderate changes
          error: '#EF4444',    // Negative price changes, error states
        },
        
        // Data Visualization Colors (for potential future charts)
        crypto: {
          bitcoin: '#F7931A',
          ethereum: '#627EEA',
          cardano: '#0033AD',
          solana: '#000000',
        },
        
        // Neutral Colors (UI Foundation)
        background: {
          light: '#FFFFFF',
          dark: '#111827',
          'light-secondary': '#F9FAFB',
          'dark-secondary': '#1F2937',
        },
        text: {
          primary: '#111827',
          'primary-dark': '#F9FAFB',
          secondary: '#6B7280',
          'secondary-dark': '#D1D5DB',
          muted: '#9CA3AF',
          'muted-dark': '#6B7280',
        },
        border: {
          light: '#E5E7EB',
          dark: '#374151',
        },
      },
      
      // ==========================================
      // 2. TYPOGRAPHY
      // ==========================================
      
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['SF Mono', 'Roboto Mono', 'monospace'],
      },
      
      // ==========================================
      // 3. LAYOUT & SPACING
      // ==========================================
      
      // Base unit: 4px (0.25rem) - Already built into Tailwind
      
      // ==========================================
      // 4. RESPONSIVE BREAKPOINTS
      // ==========================================
      
      screens: {
        sm: '440px',   // mobile-first
        md: '750px',   // tablet
        lg: '1024px',  // small desktop
        xl: '1440px',  // large desktop
      },
      
      // ==========================================
      // 5. COMPONENT STYLES
      // ==========================================
      
      // Primary Button
      button: {
        primary: {
          base: 'bg-primary-blue text-white px-4 py-2 transition-all duration-200',
          hover: 'hover:bg-primary-dark hover:shadow-md',
          active: 'active:scale-95',
          disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
        },
        secondary: {
          base: 'w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300',
          hover: 'hover:rotate-180',
        },
      },
      
      // List Items
      listItem: {
        base: 'transition-all duration-200 ease-in-out',
        hover: 'hover:bg-gray-50 dark:hover:bg-gray-800',
      },
    },
  },
  plugins: [],
}

