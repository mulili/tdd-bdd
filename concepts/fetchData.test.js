import { fetchData, fetch } from './fetchData';

/* 
  异步代码测试时：
    测试用例默认不会等待异步代码响应完成；
    也就是说会跳过异步代码的执行；
    测试代码中，如果测试内容为空（异步代码被跳过），那测试结果为true；
    这种情况，可以给第二个函数参数传入一个函数，将它在异步代码结果测试后调用；
    这样，异步代码就必须被执行，避免了被直接跳过而出现“假true”
*/
describe('async callback', () => {
  const result = { success: true };
  test('test callback', done => {
    expect.assertions(1);
    fetchData(data => {
      expect(data).toEqual(result);
      done();
    });
  });
});

describe('test promise', () => {
  const result = { success: true };
  /* 
    then 和 catch 的测试代码必须被返回；
    否则返回的promise被resolve或reject之前，测试就已经被视为完成了；
  */
  test('test promise then', () => {
    return fetch().then(response => {
      expect(response.data).toEqual(result);
    });
  });

  test('test promise catch', () => {
    /* 
      如果期待一个promise的结果是reject，被catch捕获；
      需要确保添加expect.assertions来验证一定数量的断言被调用；
      否砸一个fulfilled状态的promise 不会让测试失败
    */
    // expect.assertions(1);
    return fetch().catch(error => {
      expect(error.message).toContain('404');
    });
  });
  /*
    测试Promise更简洁的的方法
   */
  test('use resolves to test promise', () => {
    return expect(fetch()).resolves.toMatchObject({ data: result });
  });

  test.skip('use rejects to test promise', () => {
    return expect(fetch()).rejects.toThrowError();
  });

  /*
  async ,await
   */
  test('use resolves to test promise', async () => {
    await expect(fetch()).resolves.toMatchObject({ data: result });
  });

  test.skip('use rejects to test promise', async () => {
    await expect(fetch()).rejects.toThrowError();
  });

  test('use async,await to test success', async () => {
    const response = await fetch();
    expect(response.data).toEqual(result);
  });

  test.skip('use async,await to test fail', async () => {
    expect.assertions(1);
    try {
      await fetch();
    } catch (err) {
      expect(err.toString()).toContain('404');
    }
  });
});
