import { render, screen } from '@testing-library/react';
import TestComponent from './TestComponent';

test('renders TestComponent component', () => {
  render(<TestComponent />);
  expect(screen.getByRole('heading', { name: /Test Component/i })).toBeInTheDocument();
});
