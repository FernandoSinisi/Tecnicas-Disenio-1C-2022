import { render, screen } from '@testing-library/react';
import App from './App';

test('renders undo button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Undo/i);
  expect(linkElement).toBeInTheDocument();
});
