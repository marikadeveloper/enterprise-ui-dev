// @vitest-environment happy-dom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={5} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('5');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  render(<Counter initialCount={5} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('5');

  const resetButton = screen.getByRole('button', { name: 'Reset' });
  await userEvent.click(resetButton);

  expect(currentCount).toHaveTextContent('0');
});
