import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

// Mock react-redux useSelector hook
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

// Mock LogoutButton to isolate Navbar tests
vi.mock('../../auth/components/LogoutButton', () => ({
  default: ({ onClick, className }) => (
    <button onClick={onClick} className={className} data-testid="logout-button">
      Logout
    </button>
  ),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the logo brand name "SNITCH"', () => {
    useSelector.mockReturnValue({ user: null });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoElement = screen.getByText('SNITCH');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement.closest('a')).toHaveAttribute('href', '/');
  });

  it('should display "Login" button when user is unauthenticated', () => {
    useSelector.mockReturnValue({ user: null });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Desktop Login button
    const loginButtons = screen.getAllByText('Login');
    expect(loginButtons.length).toBeGreaterThan(0);
  });

  it('should display username and profile options when user is authenticated', () => {
    useSelector.mockReturnValue({
      user: {
        fullname: 'Alex Editorial',
        role: 'buyer',
      },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Should display user fullname
    const profileTrigger = screen.getByText('Alex Editorial');
    expect(profileTrigger).toBeInTheDocument();

    // Dropdown should be hidden initially
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();

    // Click profile name to open dropdown
    fireEvent.click(profileTrigger);

    // Dropdown should now be visible
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('should display "My Products" link for seller role', () => {
    useSelector.mockReturnValue({
      user: {
        fullname: 'Luxury Seller',
        role: 'seller',
      },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const myProductsLink = screen.getByText('My Products');
    expect(myProductsLink).toBeInTheDocument();
    expect(myProductsLink).toHaveAttribute('href', '/profile?tab=my-products');
  });

  it('should not display "My Products" link for buyer role', () => {
    useSelector.mockReturnValue({
      user: {
        fullname: 'Regular Buyer',
        role: 'buyer',
      },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.queryByText('My Products')).not.toBeInTheDocument();
  });
});
