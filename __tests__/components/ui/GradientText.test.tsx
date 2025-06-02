// __tests__/GradientText.test.tsx
import { render, screen } from '@testing-library/react';
import { GradientText } from '@/components/ui/GradientText';

describe('GradientText', () => {
  it('renders with children text', () => {
    render(<GradientText>Test Text</GradientText>);
    expect(screen.getByRole('text')).toHaveTextContent('Test Text');
  });
});
