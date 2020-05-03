import fn from './fn';
import Util from './util';

jest.mock('./util');
/* 
  调用jest.mock()之后，如果发现引入的是一个类；
  会将类和类中的方法，都进行mock，也就是jest.fn()；
  这样就可以追踪类和类中的方法的调用情况了；
*/

/* 
  单元测试的关注点是本单元内部的逻辑；
  外部的引入的逻辑相当于是黑箱，并不关注，由外部相对的单元测试来覆盖；
  可以对外部引入的逻辑进行mock，以避免真实执行降低单元测试的运行性能；
*/
describe('Mock Class', () => {
  beforeEach(() => {
    fn();
  });

  test('Util has been called 1 times', () => {
    expect(Util).toHaveBeenCalledTimes(1);
  });

  test('Util.a has been called  1 times', () => {
    expect(Util.mock.instances[0].a).toHaveBeenCalledTimes(1);
  });

  test('Util.b has been called  1 times', () => {
    expect(Util.mock.instances[0].b).toHaveBeenCalledTimes(1);
  });
});
