import { runCallBack, getData } from './demo';
import axios from 'axios';
jest.mock('axios');

describe('Mock', () => {
  describe('Mock function', () => {
    let fn = null;
    beforeEach(() => {
      // mock 函数，捕获函数的调用情况及返回值
      fn = jest.fn();
    });
    afterEach(() => {
      console.log(fn.mock);
    });
    test('toHaveBeenCalled', () => {
      runCallBack(fn);
      expect(fn).toHaveBeenCalled();
    });

    test('toHaveBeenCalledTimes', () => {
      fn.mockReturnValueOnce('hello').mockReturnValueOnce('world');
      runCallBack(fn);
      runCallBack(fn);
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn.mock.results[1].value).toEqual('world');
    });

    test('toHaveBeenCalledWith', () => {
      runCallBack(fn);
      expect(fn).toHaveBeenCalledWith(23);
    });

    test('mockImplementation', () => {
      fn.mockImplementationOnce(() => {
        console.log('mockImplementationOnce');
        return 123;
      });
      runCallBack(fn);
      expect(fn.mock.results[0].value).toEqual(123);

      fn.mockReturnThis();
      runCallBack(fn);
      expect(fn.mock.results[1].value).toBeUndefined();
    });
  });
  describe('Mock api', () => {
    /* 
      前端不应该且也不能在测试中调用实际的API；
      前端只需要测试是否发送了ajax请求；
      至于返回值是否正确，应该由后台的测试来覆盖；
     */

    test('test getData ', async () => {
      axios.get.mockResolvedValue({ data: 'hello' });
      expect(await getData()).toEqual('hello');
    });
    test('test getData ', async () => {
      axios.get.mockResolvedValueOnce({ data: 'hello' });
      axios.get.mockResolvedValueOnce({ data: 'world' });
      expect(await getData()).toEqual('hello');
      expect(await getData()).toEqual('world');
    });
  });
});

describe.only.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});
