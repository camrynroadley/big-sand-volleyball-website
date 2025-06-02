import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/ui/Footer';

describe('Footer', () => {
  it('renders footer content correctly', () => {
    render(<Footer />);

    // Check for footer landmark
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // Check for organization name
    expect(screen.getByText('Big Sand Volleyball Winnipeg')).toBeInTheDocument();

    // Check for email address in an <address> tag
    const email = screen.getByText('bigsandvolleyballwinnipeg@gmail.com');
    expect(email).toBeInTheDocument();
    expect(email.tagName.toLowerCase()).toBe('address');
  });
});
