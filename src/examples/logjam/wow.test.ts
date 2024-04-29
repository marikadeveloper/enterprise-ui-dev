import { expect, test, vi } from 'vitest';

test('it spies on the multiply method', () => {
  const mock = vi.fn(); // empty function

  mock();

  expect(mock).toHaveBeenCalled();
});
