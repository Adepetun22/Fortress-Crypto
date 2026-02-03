/**
 * Header Component Tests
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  const mockOnSearch = jest.fn();
  const mockOnRefresh = jest.fn();
  const mockOnToggleDarkMode = jest.fn();

  const defaultProps = {
    onSearch: mockOnSearch,
    onRefresh: mockOnRefresh,
    isLoading: false,
    lastUpdated: new Date(),
    darkMode: false,
    onToggleDarkMode: mockOnToggleDarkMode,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders app title', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText('Fortress Crypto')).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByPlaceholderText(/search cryptocurrencies/i)).toBeInTheDocument();
  });

  test('calls onSearch when typing in search input', () => {
    render(<Header {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search cryptocurrencies/i);
    fireEvent.change(searchInput, { target: { value: 'bitcoin' } });

    expect(mockOnSearch).toHaveBeenCalledWith('bitcoin');
  });

  test('clears search when clear button is clicked', () => {
    render(<Header {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search cryptocurrencies/i);
    fireEvent.change(searchInput, { target: { value: 'bitcoin' } });

    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  test('calls onToggleDarkMode when dark mode button is clicked', () => {
    render(<Header {...defaultProps} />);

    const darkModeButton = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(darkModeButton);

    expect(mockOnToggleDarkMode).toHaveBeenCalledTimes(1);
  });

  test('shows sun icon when in dark mode', () => {
    render(<Header {...defaultProps} darkMode={true} />);

    expect(screen.getByLabelText(/switch to light mode/i)).toBeInTheDocument();
  });

  test('shows moon icon when in light mode', () => {
    render(<Header {...defaultProps} darkMode={false} />);

    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
  });

  test('displays last updated time', () => {
    const lastUpdated = new Date('2024-01-01T12:00:00');
    render(<Header {...defaultProps} lastUpdated={lastUpdated} />);

    // Mobile layout shows last updated
    const lastUpdatedText = screen.getByText(/last updated/i);
    expect(lastUpdatedText).toBeInTheDocument();
  });

  test('renders refresh button', () => {
    render(<Header {...defaultProps} />);

    const refreshButton = screen.getByRole('button', { name: /refresh data/i });
    expect(refreshButton).toBeInTheDocument();
  });

  test('has correct accessibility attributes', () => {
    render(<Header {...defaultProps} />);

    const searchInput = screen.getByLabelText(/search cryptocurrencies/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders logo icon', () => {
    render(<Header {...defaultProps} />);

    const logo = screen.getByRole('img', { name: /fortress crypto logo/i });
    expect(logo).toBeInTheDocument();
  });
});

