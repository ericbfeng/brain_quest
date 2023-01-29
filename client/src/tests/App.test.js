import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders call API button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Call API/i);
  expect(linkElement).toBeInTheDocument();
});
