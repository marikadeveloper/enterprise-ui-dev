import { render } from 'test/utilities';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import TimeZone from '.';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2021-01-01T00:00:00Z'));
});

test('it should render successfully', () => {
  render(<TimeZone />);
});

test('should match the snapshot', async () => {
  const { container } = render(<TimeZone getTodos />);
  expect(container).toMatchSnapshot();
});

afterEach(() => {
  vi.useRealTimers();
});
