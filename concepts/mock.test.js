/* 
  用Mock的同步代码来测试异步代码
  因为我们只关心是否调用及调用结果，并不关心异步的过程
*/

import { getData } from './mock';
// 👇的语句在执行时，jest会去寻找__mocks__文件夹下的同名文件
jest.mock('./mock');
/* 
  当一个文件被Mock引入后，后续的测试内容都是针对该mock文件的
  如果需要引入部分真实文件中的逻辑，可以使用👇jest.requireActual方法
*/

const { getNumber } = jest.requireActual('./mock');
/* 
  如果需要引入部分Mock文件中的逻辑，可以使用👇jest.requireMock方法
  const { getData } = jest.requireMock('./mock');
*/

describe('Mock and Actual Module', () => {
  test('getData test ', () => {
    expect(getData()).toEqual({ value: 2 });
  });
  test('getNumber test', () => {
    expect(getNumber()).toEqual(123);
  });
});
