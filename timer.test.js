import timer from './timer';

jest.useFakeTimers();

describe('Mock timer', () => {
  test('timer test', () => {
    const fn = jest.fn();
    timer(fn);
    
    jest.advanceTimersByTime(3000);
    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(3000);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
