import { expect, test, vi } from 'vitest';
import { log } from './log';

test('it spies on the multiply method', () => {
  const mock = vi.fn(); // empty function

  mock();

  vi.spyOn(console, 'log').mockImplementation(() => {});

  log('log', 1, 2, 3);

  expect(mock).toHaveBeenCalled();
  expect(console.log).toHaveBeenCalledWith(1, 2, 3);
});
