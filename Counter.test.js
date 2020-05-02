import Counter from './Counter';
/*  
  jest 的钩子函数
  作用域：  
    外部describe的钩子函数对内部describe的钩子函数生效；
    如果外部describe和内部的describe都有相同的钩子函数：
      那这两个钩子函数都会生效，从外向内执行；
*/
describe('test Counter class', () => {
  // 在所有测试用例结束之前调用，为做全局（测试组）准备
  beforeAll(() => {
    console.log('beforeAll');
  });

  // 在所有测试用例结束之后调用，为做全局（测试组）准备
  afterAll(() => {
    console.log('afterAll');
  });

  let counter = null;
  // 在每一个测试用例执行之前调用，为每一个测试用例做准备
  beforeEach(() => {
    console.log('beforeEach');
    counter = new Counter();
  });

  // 在每一个测试用例执行之后调用，为每一个测试用例做清理
  afterEach(() => {
    console.log('afterEach');
  });

  describe('test add method', () => {
    beforeAll(() => {
      console.log('before all add method');
    });
    afterAll(() => {
      console.log('after all  add method');
    });
    beforeEach(() => {
      console.log('before each add method');
    });
    afterEach(() => {
      console.log('after each  add method');
    });
    test('test addOne', () => {
      console.log('test addOne');
      counter.addOne();
      expect(counter.number).toEqual(1);
    });

    test('test addTwo', () => {
      console.log('test addTwo');
      counter.addTwo();
      expect(counter.number).toEqual(2);
    });
  });

  describe('test minus method', () => {
    test('test minusOne', () => {
      console.log('test minusOne');
      counter.minusOne();
      expect(counter.number).toEqual(-1);
    });

    test('test minusTwo', () => {
      console.log('test minusTwo');
      counter.minusTwo();
      expect(counter.number).toEqual(-2);
    });
  });
});
